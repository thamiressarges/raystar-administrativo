import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

import {
  Container,
  Form,
  Options,
  Background,
  Toggle,
  ForgotPasswordButton,
} from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ForgotPasswordModal } from "../../components/ForgotPasswordModal";

import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../services/supabase";

export function SignIn() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/order");
    }
  }, [user, navigate]);

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      await login(loginEmail, loginPassword);
      toast.success("Login feito com sucesso!");
      navigate("/order");
    } catch (error) {
      console.error("Erro ao logar:", error.message);
      let msg = "Erro ao fazer login.";

      if (error.message.includes("Invalid login credentials")) {
        msg = "E-mail ou senha incorretos!";
      } else if (error.message.includes("aguardando aprovação")) {
        msg = error.message;
      } else if (error.message.includes("inativa")) {
        msg = error.message;
      }
      toast.error(msg);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();

    if (!signUpName || !signUpEmail || !signUpPassword) {
      return toast.warn("Preencha nome, e-mail e senha.");
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: { 
          data: { 
            name: signUpName 
          } 
        },
      });

      if (authError) throw authError;
      
      if (!data.user) {
        throw new Error("Erro inesperado: Usuário não retornado pelo Auth.");
      }

      toast.success("Solicitação enviada! Aguarde a aprovação do administrador.");
      
      setSignUpName("");
      setSignUpEmail("");
      setSignUpPassword("");
      setIsLoginView(true);

    } catch (error) {
      console.error("Erro ao cadastrar:", error.message);
      let msg = error.message;
      if (msg.includes("User already registered")) msg = "Este e-mail já está cadastrado.";
      toast.error(msg);
    }
  }

  return (
    <Container>
      {isForgotModalOpen && (
        <ForgotPasswordModal onClose={() => setIsForgotModalOpen(false)} />
      )}

      <Form>
        <h1>RayStar</h1>

        <Toggle>
          <button
            className={isLoginView ? "active" : ""}
            onClick={() => setIsLoginView(true)}
            type="button"
          >
            Entrar
          </button>
          <button
            className={!isLoginView ? "active" : ""}
            onClick={() => setIsLoginView(false)}
            type="button"
          >
            Criar Conta
          </button>
        </Toggle>

        {isLoginView && (
          <>
            <h2>Entrar</h2>
            <Input
              placeholder="E-mail"
              type="email"
              icon={FiMail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              placeholder="Senha"
              type="password"
              icon={FiLock}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Options>
              <ForgotPasswordButton
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
              >
                Esqueceu a sua senha?
              </ForgotPasswordButton>
            </Options>
            <Button title="Entrar" type="submit" onClick={handleSignIn} />
          </>
        )}

        {!isLoginView && (
          <>
            <h2>Solicitar Acesso</h2>
            <Input
              placeholder="Nome Completo"
              type="text"
              icon={FiUser}
              onChange={(e) => setSignUpName(e.target.value)}
              value={signUpName}
            />
            <Input
              placeholder="E-mail"
              type="email"
              icon={FiMail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              value={signUpEmail}
            />
            <Input
              placeholder="Senha"
              type="password"
              icon={FiLock}
              onChange={(e) => setSignUpPassword(e.target.value)}
              value={signUpPassword}
            />
            <Button title="Solicitar" type="submit" onClick={handleSignUp} />
          </>
        )}
      </Form>
      <Background />
    </Container>
  );
}