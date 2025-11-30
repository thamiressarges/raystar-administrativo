import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify'; 

import { Container, LogoutButton } from "./styles";
import { useAuth } from "../../contexts/AuthContext";

export function Header() {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/"); 
    } catch (error) {
      console.error("Erro ao sair:", error);
      toast.error("Não foi possível sair. Tente novamente.");
    }
  }

  return (
    <Container>
      <LogoutButton onClick={handleLogout} title="Sair do sistema">
        <FiLogOut />
      </LogoutButton>
    </Container>
  );
}