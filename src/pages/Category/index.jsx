import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi"; 
import { toast } from 'react-toastify'; 

import { useDebounce } from '../../hooks/useDebounce';
import { CategoryApi } from "../../services/categoryApi"; 

import { CategoryModal } from "../../components/CategoryModel"; 
import { Loading } from '../../components/Loading';
import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/Pagination';

import {
    Container,
    Search as SearchArea,
    Content,
    PaginationContainer,
    SearchAndActionButton,
    AddButton,
    EmptyState 
} from "./styles"; 

export function Category() {
    const navigate = useNavigate();

    // Estados de UI
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Estados de Dados
    const [categories, setCategories] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const ITEMS_PER_PAGE = 10;

    // Estados de Busca
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const tableHeaders = ["Categoria", "Quantidade"];
    const tableDataKeys = ["name", "quantity"]; 

    const loadCategories = useCallback(async (search = "") => {
        try {
            setLoading(true); 
            const list = await CategoryApi.list({ 
                limit: 50, 
                searchTerm: search 
            }); 
            
            const formattedList = list.map(c => ({
                ...c,
                quantity: c.quantity ?? 0 
            }));

            setCategories(formattedList);
            setCurrentPage(1);
        } catch (error) {
             console.error(error);
             toast.error("Não foi possível carregar as categorias.");
        } finally {
            setLoading(false); 
        }
    }, []);

    useEffect(() => {
        loadCategories(debouncedSearchTerm);
    }, [debouncedSearchTerm, loadCategories]);

    const handleCreateCategory = async (payload) => {
        try {
            setLoading(true); 
            await CategoryApi.create(payload); 
            toast.success(`Categoria "${payload.name}" criada com sucesso!`);
            loadCategories(debouncedSearchTerm); // Recarrega mantendo a busca atual
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar categoria: " + error.message);
            setLoading(false); 
        } 
    };

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
                        <p>
                            {searchTerm 
                                ? `Nenhuma categoria encontrada para "${searchTerm}"` 
                                : "Nenhuma categoria cadastrada."}
                        </p>
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

                        {totalPages > 1 && (
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
                onSubmit={handleCreateCategory} 
            />
        </Container>
    );
}