import { useState, useEffect } from "react";
import { Container, Form, Options, Background, Toggle } from "./styles";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../services/supabase";
import { toast } from "react-toastify";

const ID_DA_LOJA_FIXO = "00000000-0000-0000-0000-000000000001";

export function SignIn() {
  const [isLoginView, setIsLoginView] = useState(true);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/order");
    }
  }, [user, navigate]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

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
        msg = "Sua conta está aguardando aprovação.";
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
      const { error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          data: {
            name: signUpName,
            store_id: ID_DA_LOJA_FIXO 
          }
        }
      });

      if (error) {
        throw error;
      }

      toast.success("Solicitação enviada! Confirme seu e-mail e aguarde a aprovação.");
      setIsLoginView(true);

    } catch (error) {
      console.error("Erro ao cadastrar:", error.message);
      let msg = error.message;
      if (msg.includes("User already registered")) {
        msg = "Este e-mail já está cadastrado.";
      }
      toast.error(msg);
    }
  }

  return (
    <Container>
      <Form>
        <h1>RayStar</h1>
        <Toggle>
          <button 
            className={isLoginView ? 'active' : ''}
            onClick={() => setIsLoginView(true)}
            type="button"
          >
            Entrar
          </button>
          <button 
            className={!isLoginView ? 'active' : ''}
            onClick={() => setIsLoginView(false)}
            type="button"
          >
            Criar Conta
          </button>
        </Toggle>

        {isLoginView && (
          <>
            <h2>Faça seu login</h2>
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
              <label>
                <input type="checkbox" /> Lembrar
              </label>
              <a href="#">Esqueceu a sua senha?</a>
            </Options>
            <Button title="Entrar" type="submit" onClick={handleSignIn} />
          </>
        )}

        {!isLoginView && (
          <>
            <h2>Solicitar Acesso de Admin</h2>
            <Input
              placeholder="Nome Completo"
              type="text"
              icon={FiUser}
              onChange={(e) => setSignUpName(e.target.value)}
            />
            <Input
              placeholder="E-mail"
              type="email"
              icon={FiMail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <Input
              placeholder="Senha"
              type="password"
              icon={FiLock}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />

            <Button title="Enviar Solicitação" type="submit" onClick={handleSignUp} />
          </>
        )}

      </Form>
      <Background />
    </Container>
  );
}