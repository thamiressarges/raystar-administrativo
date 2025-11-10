import { useState, useEffect } from "react";
import { Container, Form, Options, Background } from "./styles";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

import { toast } from "react-toastify";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  // redireciona automaticamente se já estiver logado
  useEffect(() => {
    if (user) {
      navigate("/order");
    }
  }, [user, navigate]);

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logado com sucesso:", userCredential.user);

      toast.success("Login feito com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "colored",
      });

      navigate("/order");
    } catch (error) {
      console.error("Erro ao logar:", error.code, error.message);

      let errorMessage = "Erro ao fazer login. Verifique suas credenciais.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "E-mail inválido!";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "Usuário não encontrado!";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Senha incorreta!";
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        theme: "colored",
      });
    }
  }

  return (
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
