import { useState } from 'react';

import {
    Container,
    Search as SearchArea,
    Content,
    PaginationWrapper
} from './styles';

import { Header } from '../../components/Header';
import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Brand } from '../../components/Brand';
import { Menu } from '../../components/Menu';
import { Pagination } from '../../components/Pagination';

import { useMenu } from '../../contexts/MenuContext';

export function Order() {

    const { isMenuOpen } = useMenu();

    const orderHeader = ["Cliente", "Preço", "Status", "Data"];
    const orderDataKeys = ["client", "price", "status", "date"];

    const data = [
        { client: "Cliente 1", price: "R$ 75,00", status: "Em processamento", date: "15/02/2025" },
        { client: "Cliente 2", price: "R$ 75,00", status: "Em processamento", date: "15/02/2025" },
        { client: "Cliente 3", price: "R$ 75,00", status: "Em processamento", date: "15/02/2025" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Por exemplo, 3 itens por página
    const totalPages = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container $isopen={isMenuOpen}>
            <Brand />
            <Header />
            <Menu />

            <SearchArea>
                <SearchInput placeholder="Pesquise por nome" />
            </SearchArea>

            <Content>
                <Table 
                    data={data}
                    headers={orderHeader}
                    dataKeys={orderDataKeys}
                />

                <PaginationWrapper>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </PaginationWrapper>
            </Content>
        </Container>
    );
}
