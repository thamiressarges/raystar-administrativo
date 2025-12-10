import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; 
import { FiUser, FiPhone, FiMapPin, FiTrash2, FiChevronLeft } from "react-icons/fi";

import { UserApi } from "../../services/userApi";
import { Loading } from "../../components/Loading"; 
import { ConfirmModal } from "../../components/ConfirmModal"; 
import { formatBirthDate, formatPhone, formatCPF } from "../../utils/format";

import { PageContainer, PageHeader, PageTitle, BackButton } from "../../styles/commonStyles";

import {
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

export function ClientsDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadClient = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const data = await UserApi.getClientById(id);
      
      if (data) {
        setClient(data);
      } else {
        setError("Cliente não encontrado.");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Erro ao carregar detalhes.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadClient();
  }, [loadClient]);

  const confirmDeleteClient = async () => {
    try {
      setIsLoading(true);
      await UserApi.deleteClient(id);
      toast.success("Cliente deletado com sucesso!");
      navigate("/clients"); 
    } catch (err) {
      toast.error(`Erro ao deletar: ${err.message}`);
      setIsLoading(false);
    }
  };
  
  const handleDeleteClient = () => {
    if (!client) return;

    toast.warn(
        ({ closeToast }) => (
            <ConfirmModal
                closeToast={closeToast}
                onConfirm={confirmDeleteClient}
                message={`Tem certeza que deseja deletar o cliente ${client.name}?`}
                confirmText="Sim, Deletar"
            />
        ),
        { autoClose: false, closeOnClick: false }
    );
  };

  if (isLoading && !client) return <Loading />;

  if (error) {
    return (
      <PageContainer> 
        <PageHeader> 
          <PageTitle>
            <BackButton onClick={() => navigate("/clients")}>
                <FiChevronLeft />
            </BackButton>
            Erro
          </PageTitle>
        </PageHeader>
        <Card>
          <ErrorMessage>Falha ao carregar: {error}</ErrorMessage>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
            <BackButton onClick={() => navigate("/clients")}>
                <FiChevronLeft />
            </BackButton>
            Detalhes do Cliente
        </PageTitle>
      </PageHeader>
      
      <Card>
        <CardTitle>
          <FiUser size={20} />
          <h3>Dados Pessoais</h3>
        </CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Nome Completo</InfoLabel>
            <InfoValue>{client.name || '—'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>CPF</InfoLabel>
            <InfoValue>{formatCPF(client.cpf) || '—'}</InfoValue>
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
            <InfoValue>{formatPhone(client.phone || client.phones?.main || client.phones?.[0]) || '—'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>E-mail</InfoLabel>
            <InfoValue>{client.email || '—'}</InfoValue>
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
            <InfoValue>{client.address?.zip || client.address?.cep || '—'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Rua/Avenida</InfoLabel>
            <InfoValue>{client.address?.street || client.address?.rua || '—'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Número</InfoLabel>
            <InfoValue>{client.address?.number || client.address?.numero || '—'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Bairro</InfoLabel>
            <InfoValue>{client.address?.neighborhood || client.address?.bairro || '—'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Cidade</InfoLabel>
            <InfoValue>{client.address?.city || client.address?.cidade || '—'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Estado</InfoLabel>
            <InfoValue>{client.address?.state || client.address?.estado || '—'}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Card>

    </PageContainer>
  );
}