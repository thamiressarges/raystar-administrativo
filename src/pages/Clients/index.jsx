import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  SearchArea,
  Content,
  PaginationWrapper,
  EmptyState
} from './styles';

import { supabase } from '../../services/supabase'; 
import { useDebounce } from '../../hooks/useDebounce';
import { formatPhone } from '../../utils/format';

import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { Loading } from '../../components/Loading'; 

const ITEMS_PER_PAGE = 10;

export function Clients() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500); 

  const clientsHeaders = ["Nome", "Email", "Telefone"];
  const clientsDataKeys = ["name", "email", "phone"];

  const fetchClients = async (page, search = "") => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado.");

      const { data: adminData, error: adminError } = await supabase
        .from('users')
        .select('permissions')
        .eq('uid', user.id)
        .single();

      if (adminError) throw new Error("Falha ao buscar dados do administrador.");

      const userPermissions = adminData.permissions || [];
      const isAdmin = userPermissions.includes('admin') || userPermissions.includes('super_admin');

      if (!isAdmin) {
        throw new Error("Você não tem permissão para ver esta página.");
      }

      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from('users')
        .select('uid, name, email, phones, cpf', { count: 'exact' })
        .eq('is_deleted', false)
        .contains('permissions', '{client}');

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error, count } = await query.range(from, to);

      if (error) {
        throw new Error(`Falha ao buscar clientes: ${error.message}`);
      }

      const processedClients = data.map(client => ({
        ...client,
        phone: formatPhone(client.phones?.main || client.phones?.[0])
      }));

      setClients(processedClients);
      setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients(1, debouncedSearchTerm);
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchClients(pageNumber, debouncedSearchTerm);
  };

  const handleDetailsClick = (client) => {
    navigate(`/clientsDetails/${client.uid}`);
  };

  const renderContent = () => {
    if (isLoading) return <Loading />;

    if (error) return <p style={{padding: '40px', textAlign: 'center', color: '#EF4444'}}>{error}</p>;

    if (clients.length === 0) {
      return searchTerm ? (
        <EmptyState>
          <p>Nenhum cliente encontrado com o nome "{searchTerm}"</p>
        </EmptyState>
      ) : (
        <EmptyState>
          <p>Nenhum cliente cadastrado</p>
        </EmptyState>
      );
    }

    return (
      <>
        <Table
          data={clients}
          headers={clientsHeaders}
          dataKeys={clientsDataKeys}
          onDetailsClick={handleDetailsClick}
        />

        <PaginationWrapper>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </PaginationWrapper>
      </>
    );
  };

  return (
    <Container>
      <SearchArea>
        <SearchInput
          placeholder="Pesquise por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchArea>

      <Content>
        {renderContent()}
      </Content>
    </Container>
  );
}