import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter } from "react-icons/fi";

import {
    Container,
    SearchArea,
    Content,
    PaginationWrapper,
    FilterButton,
    EmptyState
} from './styles';

import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { Loading } from '../../components/Loading';

import { orderApi } from '../../services/orderApi';
import { translateOrderStatus } from '../../utils/format'; 

export function Order() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const itemsPerPage = 10; 

    const orderHeader = ["Id", "Status", "Data"];
    const orderDataKeys = ["displayId", "status", "formattedDate"];

    useEffect(() => {
        async function fetchOrders() {
            try {
                setLoading(true);
                const { data, count } = await orderApi.getOrders(currentPage, itemsPerPage);

                const formattedOrders = data.map(order => ({
                    id: order.id, 
                    displayId: `PED-${order.id.substring(0, 8).toUpperCase()}`, 
                    status: translateOrderStatus(order.status),
                    formattedDate: new Date(order.created_at).toLocaleDateString('pt-BR')
                }));

                setOrders(formattedOrders);
                setTotalCount(count);
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDetailsClick = (item) => {
        navigate(`/orderDetails/${item.id}`);
    };

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

            <Content>
                {loading && <Loading />}

                {!loading && orders.length === 0 && (
                    <EmptyState>
                        <p>Nenhum pedido encontrado.</p>
                    </EmptyState>
                )}

                {!loading && orders.length > 0 && (
                    <>
                        <Table 
                            data={orders}
                            headers={orderHeader}
                            dataKeys={orderDataKeys}
                            onDetailsClick={handleDetailsClick}
                        />

                        {totalPages >= 1 && (
                            <PaginationWrapper>
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </PaginationWrapper>
                        )}
                    </>
                )}
            </Content>
        </Container>
    );
}