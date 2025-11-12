import { useState, useEffect } from "react";
import { Container, Form, Options, Background } from "./styles";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

// 1. REMOÇÃO: Não precisamos mais do Firebase aqui
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";

// 2. MODIFICAÇÃO: Pegamos a nova função 'login' do contexto
import { useAuth } from "../../contexts/AuthContext";

import { toast } from "react-toastify";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 3. MODIFICAÇÃO: Pegamos 'login' e 'user' do contexto
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // redireciona automaticamente se já estiver logado (NENHUMA MUDANÇA AQUI)
  useEffect(() => {
    if (user) {
      navigate("/order");
    }
  }, [user, navigate]);

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      // 4. MODIFICAÇÃO: Chamada de login MUITO mais limpa
      await login(email, password);

      // ***** SEU CÓDIGO DE TOAST COMPLETO *****
      toast.success("Login feito com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "colored",
      });
      // ***************************************

      navigate("/order");
    } catch (error) {
      // 5. MODIFICAÇÃO: Tratamento de erro genérico do Supabase
      console.error("Erro ao logar:", error.message);

      let errorMessage = "Erro ao fazer login. Verifique suas credenciais.";
      
      // Supabase é mais direto nos erros
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "E-mail ou senha incorretos!";
      } else if (error.message.includes("Email not confirmed")) {
         errorMessage = "Por favor, confirme seu e-mail.";
      }

      // ***** SEU CÓDIGO DE TOAST COMPLETO *****
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        theme: "colored",
      });
      // ***************************************
    }
  }

  return (
    // NENHUMA MUDANÇA NECESSÁRIA NO JSX (return)
    <Container>
      <Form onSubmit={handleSignIn}>
        <h1>RayStar</h1>
        <h2>Faça seu login</h2>

        <Input
          placeholder="E-mail"
          type="email"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Options>
          <label>
            <input type="checkbox" />
            Lembrar
          </label>

          <Link to="/forgotpassword">Esqueceu a sua senha?</Link>
        </Options>

        <Button title="Entrar" type="submit" />
      </Form>

      <Background />
    </Container>
  );
}