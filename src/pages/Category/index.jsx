import { useState } from 'react';
import {
    Container,
    Search as SearchArea,
    Content,
    PaginationWrapper
} from './styles';
import {Header} from '../../components/Header';
import { SearchInput } from '../../components/SearchInput';
import {MenuItem} from '../../components/MenuItem';
import {Table} from '../../components/Table';
import {Pagination} from '../../components/Pagination';


import {Brand} from '../../components/Brand';
import {Menu} from '../../components/Menu';

import { useMenu } from '../../contexts/MenuContext';

export function Category(){
    const { isMenuOpen } = useMenu();

    const categoryHeaders = ["Categoria", "Quantidade"];
    const categoryDataKeys = ["category", "quantity"];

    const data = [
        { category: "Acessórios", quantity: 50 },
        { category: "Roupas", quantity: 45 },
        { category: "Sapatos", quantity: 15 },
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

    return(
        <Container $isopen={isMenuOpen}>
            <Brand />
            <Header />
            <Menu />

            <SearchArea>
                <SearchInput placeholder="Pesquise por nome"/>
            </SearchArea>

            <Content>
                <Table 
                    data={data} 
                    headers={categoryHeaders}
                    dataKeys={categoryDataKeys}
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
