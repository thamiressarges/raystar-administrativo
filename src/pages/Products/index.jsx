import { useState } from 'react';
import { Container, Search as SearchArea, Content, PaginationWrapper} from './styles';
import { Header } from '../../components/Header';
import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Brand } from '../../components/Brand';
import { Menu } from '../../components/Menu';
import { useMenu } from '../../contexts/MenuContext';
import { Pagination } from '../../components/Pagination';

export function Product(){
    const { isMenuOpen } = useMenu();

    const productHeaders = ["Produto", "Categoria", "Disponibilidade"];
    const productDataKeys = ["product", "category", "availability"];

    const data = [
        { product: "Camisa polo", category: "Roupas", availability: "Sim"},
        { product: "Sandalia", category: "Sapato", availability: "Não"},
        { product: "Bermuda", category: "Roupas", availability: "Sim"},
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
                <Table data={data} headers={productHeaders} dataKeys={productDataKeys} />
            
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
