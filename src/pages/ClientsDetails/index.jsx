import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { toast } from 'react-toastify'; 

import {
  Container,
  HeaderBar,     
  BackLink,      
  Title,         
  Card,
  CardTitle,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  ActionsRow,    
  DangerButton,
  ErrorMessage
} from "./styles"; 

import { Loading } from "../../components/Loading"; 
import { ConfirmModal } from "../../components/ConfirmModal"; 
import { formatBirthDate, formatPhone, formatCPF } from "../../utils/format";

import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiTrash2,
  FiChevronLeft
} from "react-icons/fi";

export function ClientsDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClientDetails = useCallback(async () => {
    if (!id) {
      setError("ID do cliente não fornecido.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*') 
        .eq('uid', id)
        .single(); 

      if (error) {
        throw error;
      }

      if (data) {
        setClient(data);
      } else {
        setError("Cliente não encontrado.");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClientDetails();
  }, [fetchClientDetails]);

  const confirmDeleteClient = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ is_deleted: true, status: 'deleted' })
        .eq('uid', id);
      
      if (error) throw error;

      toast.success("Cliente deletado com sucesso!");
      navigate("/clients"); 

    } catch (err) {
      toast.error(`Erro ao deletar: ${err.message}`);
      setIsLoading(false);
    }
  };
  
  const handleDeleteClient = () => {
    if (!client) return;

    const message = `Tem certeza que deseja deletar o cliente ${client.name}? Esta ação é irreversível.`;

    toast.warn(
        ({ closeToast }) => (
            <ConfirmModal
                closeToast={closeToast}
                onConfirm={confirmDeleteClient}
                message={message}
                confirmText="Sim, Deletar"
            />
        ),
        {
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            theme: "light",
        }
    );
  };

  if (isLoading && !client) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container> 
        <HeaderBar> 
          <BackLink onClick={() => navigate("/clients")}>
            <FiChevronLeft /> Voltar
          </BackLink>
          <Title>Erro</Title>
        </HeaderBar>
        <Card>
          <ErrorMessage>Falha ao carregar cliente: {error}</ErrorMessage>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      {(isLoading && client) && <Loading />}

      <HeaderBar>
        <BackLink onClick={() => navigate("/clients")}>
          <FiChevronLeft /> Voltar
        </BackLink>
        <Title>Detalhes do Cliente</Title>
      </HeaderBar>
      
      <Card>
        <CardTitle>
          <FiUser size={20} />
          <h3>Dados Pessoais</h3>
        </CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Nome Completo</InfoLabel>
            <InfoValue>{client.name || 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>CPF</InfoLabel>
            <InfoValue>{formatCPF(client.cpf) || 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Data de Nascimento</InfoLabel>
            <InfoValue>{formatBirthDate(client.birth_date)}</InfoValue>
          </InfoItem>
        </InfoGrid>
        
        <ActionsRow>
          <DangerButton onClick={handleDeleteClient}>
            <FiTrash2 /> Excluir Cliente
          </DangerButton>
        </ActionsRow>
      </Card>

      <Card>
        <CardTitle>
          <FiPhone size={20} />
          <h3>Contato</h3>
        </CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Telefone</InfoLabel>
            <InfoValue>{formatPhone(client.phones?.main || client.phones?.[0]) || 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>E-mail</InfoLabel>
            <InfoValue>{client.email || 'N/A'}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Card>

      <Card>
        <CardTitle>
          <FiMapPin size={20} />
          <h3>Endereço</h3>
        </CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>CEP</InfoLabel>
            <InfoValue>{client.address?.cep || 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Rua/Avenida</InfoLabel>
            <InfoValue>{client.address?.street || 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Número</InfoLabel>
            <InfoValue>{client.address?.number || 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Bairro</InfoLabel>
            <InfoValue>{client.address?.neighborhood || 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Cidade</InfoLabel>
            <InfoValue>{client.address?.city || 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Estado</InfoLabel>
            <InfoValue>{client.address?.state || 'N/A'}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Card>

    </Container>
  );
}