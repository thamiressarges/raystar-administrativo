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

export function Clients() {

    const { isMenuOpen } = useMenu();

    const clientsHeaders = ["Nome", "Email", "Telefone", "CPF"];
    const clientsDataKeys = ["name", "email", "phone", "cpf"];

    const data = [
        { 
            name: "Cliente 1", 
            email: "cliente1@gmail.com", 
            phone: "(99) 99999-9999", 
            cpf: "111.111.111-11" 
        },
        { 
            name: "Cliente 2", 
            email: "cliente2@gmail.com", 
            phone: "(99) 99999-9999", 
            cpf: "222.222.222-22" 
        },
        { 
            name: "Cliente 3", 
            email: "cliente3@gmail.com", 
            phone: "(99) 99999-9999", 
            cpf: "333.333.333-33" 
        },
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
                    headers={clientsHeaders}
                    dataKeys={clientsDataKeys}
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
