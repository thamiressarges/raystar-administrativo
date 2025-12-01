import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

import { useAuth } from "../../contexts/AuthContext";
import { useAuthForms } from "../../hooks/useAuthForms";

import { Container, Form, Options, Background, Toggle, ForgotPasswordButton, ErrorText } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ForgotPasswordModal } from "../../components/ForgotPasswordModal";

export function SignIn() {
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    isLoginView,
    toggleView,
    loading,
    loginRegister,
    loginErrors,
    signUpRegister,
    signUpErrors,
    submitLogin,
    submitSignUp
  } = useAuthForms();

  useEffect(() => {
    if (user) {
      navigate("/order");
    }
  }, [user, navigate]);

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
            onClick={() => toggleView(true)}
            type="button"
          >
            Entrar
          </button>
          <button
            className={!isLoginView ? "active" : ""}
            onClick={() => toggleView(false)}
            type="button"
          >
            Criar Conta
          </button>
        </Toggle>

        {isLoginView ? (
          // --- FORMULÁRIO DE LOGIN ---
          <div style={{ width: '100%' }} onKeyDown={(e) => e.key === 'Enter' && submitLogin()}>
            <h2>Entrar</h2>
            
            <div style={{ marginBottom: 12 }}>
                <Input
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    {...loginRegister("email")}
                />
                {loginErrors.email && <ErrorText>{loginErrors.email.message}</ErrorText>}
            </div>

            <div style={{ marginBottom: 12 }}>
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    {...loginRegister("password")}
                />
                {loginErrors.password && <ErrorText>{loginErrors.password.message}</ErrorText>}
            </div>

            <Options>
              <ForgotPasswordButton
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
              >
                Esqueceu a sua senha?
              </ForgotPasswordButton>
            </Options>
            
            <Button 
                title={loading ? "Entrando..." : "Entrar"} 
                onClick={submitLogin}
                disabled={loading} 
            />
          </div>
        ) : (
          // --- FORMULÁRIO DE CADASTRO ---
          <div style={{ width: '100%' }} onKeyDown={(e) => e.key === 'Enter' && submitSignUp()}>
            <h2>Solicitar Acesso</h2>
            
            <div style={{ marginBottom: 12 }}>
                <Input
                    placeholder="Nome Completo"
                    type="text"
                    icon={FiUser}
                    {...signUpRegister("name")}
                />
                {signUpErrors.name && <ErrorText>{signUpErrors.name.message}</ErrorText>}
            </div>

            <div style={{ marginBottom: 12 }}>
                <Input
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    {...signUpRegister("email")}
                />
                {signUpErrors.email && <ErrorText>{signUpErrors.email.message}</ErrorText>}
            </div>

            <div style={{ marginBottom: 12 }}>
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    {...signUpRegister("password")}
                />
                {signUpErrors.password && <ErrorText>{signUpErrors.password.message}</ErrorText>}
            </div>

            <Button 
                title={loading ? "Enviando..." : "Solicitar"} 
                onClick={submitSignUp}
                disabled={loading}
            />
          </div>
        )}
      </Form>
      <Background />
    </Container>
  );
}