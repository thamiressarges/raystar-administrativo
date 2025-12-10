import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi"; 

import { useCategory } from '../../hooks/useCategory';
import { CategoryModal } from "../../components/CategoryModel"; 
import { Loading } from '../../components/Loading';
import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/Pagination';

import {
    Container, Search as SearchArea, Content, PaginationContainer,
    SearchAndActionButton, AddButton, EmptyState 
} from "./styles"; 

export function Category() {
    const navigate = useNavigate();
    const { categories, loading, searchTerm, setSearchTerm, createCategory } = useCategory();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
    const ITEMS_PER_PAGE = 10;

    const tableHeaders = ["Categoria", "Quantidade"];
    const tableDataKeys = ["name", "quantity"]; 

    const paginatedCategories = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [categories, currentPage]);

    const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

    return(
        <Container>
            {loading && <Loading />}
            <SearchArea>
                <SearchAndActionButton>
                    <SearchInput 
                        placeholder="Pesquise por nome"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <AddButton onClick={() => setIsModalOpen(true)} disabled={loading}>
                        <FiPlus size={24} />
                    </AddButton>
                </SearchAndActionButton>
            </SearchArea>

            <Content>
                {!loading && categories.length === 0 ? (
                    <EmptyState>
                        <p>{searchTerm ? "Nada encontrado" : "Nenhuma categoria cadastrada."}</p>
                    </EmptyState>
                ) : (
                    <>
                        <Table 
                            data={paginatedCategories} 
                            headers={tableHeaders}
                            dataKeys={tableDataKeys}
                            onDetailsClick={(item) => navigate(`/categoryDetails/${item.id}`)} 
                            loading={loading}
                        />
                        {totalPages >= 1 && (
                            <PaginationContainer>
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                />
                            </PaginationContainer>
                        )}
                    </>
                )}
            </Content>

            <CategoryModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                type="create"
                onSubmit={createCategory} 
            />
        </Container>
    );
}