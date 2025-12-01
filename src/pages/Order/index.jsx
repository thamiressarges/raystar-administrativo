import { useNavigate } from 'react-router-dom';
import { FiFilter } from "react-icons/fi";

import { useOrders } from '../../hooks/useOrders';
import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { Loading } from '../../components/Loading';
import { translateOrderStatus, formatDate } from '../../utils/format'; // Importando formatadores
import { PageContainer } from '../../styles/commonStyles';
import { Container, SearchArea, FilterButton, EmptyState, PaginationWrapper } from './styles';

export function Order() {
    const navigate = useNavigate();
    const { orders, loading, totalPages, currentPage, setCurrentPage } = useOrders();

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
                    <SearchInput placeholder="Pesquise por ID do pedido" />
                    <FilterButton>
                        <FiFilter size={22} />
                    </FilterButton>
                </div>
            </SearchArea>

            <PageContainer>
                {loading && <Loading />}

                {!loading && orders.length === 0 && (
                    <EmptyState>
                        <p>Nenhum pedido encontrado.</p>
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