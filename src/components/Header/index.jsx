import { Container } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/"); 
    } catch (error) {
      console.error("Erro ao sair:", error);
      alert("Não foi possível sair. Tente novamente.");
    }
  }

  return (
    <Container>
      <span onClick={() => navigate("/")}>Ver Loja</span>
      <span onClick={handleLogout}>Sair</span>
    </Container>
  );
}
