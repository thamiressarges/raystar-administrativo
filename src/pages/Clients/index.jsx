import { useNavigate } from 'react-router-dom';

import { useClients } from '../../hooks/useClients';
import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { Loading } from '../../components/Loading';

// Importando estilos locais (apenas o que é específico) e compartilhados
import { Container, SearchArea, EmptyState, PaginationWrapper } from './styles';
import { PageContainer } from '../../styles/commonStyles';

export function Clients() {
  const navigate = useNavigate();
  
  const { 
    clients, 
    isLoading, 
    totalPages, 
    currentPage, 
    setCurrentPage, 
    searchTerm, 
    setSearchTerm 
  } = useClients();

  const clientsHeaders = ["Nome", "Email", "Telefone"];
  const clientsDataKeys = ["name", "email", "phone"];

  const handleDetailsClick = (client) => {
    navigate(`/clientsDetails/${client.uid}`);
  };

  return (
    <Container>
      {isLoading && <Loading />}

      <SearchArea>
        <SearchInput
          placeholder="Pesquise por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchArea>

      <PageContainer>
        {!isLoading && clients.length === 0 ? (
           <EmptyState>
             <p>{searchTerm ? `Nenhum cliente encontrado para "${searchTerm}"` : "Nenhum cliente cadastrado"}</p>
           </EmptyState>
        ) : (
          <>
            <Table
              data={clients}
              headers={clientsHeaders}
              dataKeys={clientsDataKeys}
              onDetailsClick={handleDetailsClick}
            />

            {totalPages > 1 && (
                <PaginationWrapper>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
                </PaginationWrapper>
            )}
          </>
        )}
      </PageContainer>
    </Container>
  );
}