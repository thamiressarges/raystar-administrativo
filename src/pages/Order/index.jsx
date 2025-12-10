import { useNavigate } from 'react-router-dom';
import { FiFilter } from "react-icons/fi";

import { useOrders } from '../../hooks/useOrders';
import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { Loading } from '../../components/Loading';
import { translateOrderStatus, formatDate } from '../../utils/format';
import { PageContainer } from '../../styles/commonStyles';

import { 
    Container, 
    SearchArea, 
    FilterWrapper,
    FilterButton,
    HiddenSelect,
    EmptyState, 
    PaginationWrapper 
} from './styles';

const statusOptions = [
    { value: "", label: "Todos" },
    { value: "aguardando_pagamento", label: "Aguardando Pagamento" },
    { value: "paid", label: "Pago / Aprovado" },
    { value: "preparing", label: "Em Preparação" },
    { value: "shipped", label: "Enviado" },
    { value: "out_for_delivery", label: "Saiu para Entrega" },
    { value: "delivered", label: "Entregue" },
    { value: "canceled", label: "Cancelado" },
];

export function Order() {
    const navigate = useNavigate();
    const { 
        orders, loading, totalPages, currentPage, setCurrentPage, 
        searchTerm, setSearchTerm, statusFilter, setStatusFilter 
    } = useOrders();

    const orderHeader = ["Id", "Status", "Data"];
    const orderDataKeys = ["displayId", "formattedStatus", "formattedDate"];

    const formattedOrders = orders.map(order => ({
        ...order,
        displayId: `PED-${order.id.substring(0, 8).toUpperCase()}`,
        formattedStatus: translateOrderStatus(order.status),
        formattedDate: formatDate(order.created_at)
    }));

    return (
        <Container>
            <SearchArea>
                <div className="search-wrapper">
                    <SearchInput 
                        placeholder="Pesquise por ID do pedido" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    <FilterWrapper>
                        <FilterButton title="Filtrar por Status">
                            <FiFilter size={22} />
                        </FilterButton>
                        <HiddenSelect 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            {statusOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </HiddenSelect>
                    </FilterWrapper>
                </div>
            </SearchArea>

            <PageContainer>
                {loading && <Loading />}

                {!loading && orders.length === 0 && (
                    <EmptyState>
                        <p>
                            {statusFilter || searchTerm 
                                ? "Nenhum pedido encontrado com esses filtros." 
                                : "Nenhum pedido encontrado."}
                        </p>
                    </EmptyState>
                )}

                {!loading && orders.length > 0 && (
                    <>
                        <Table 
                            data={formattedOrders}
                            headers={orderHeader}
                            dataKeys={orderDataKeys}
                            onDetailsClick={(item) => navigate(`/orderDetails/${item.id}`)}
                        />

                        {totalPages >= 1 && (
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