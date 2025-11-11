import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiBox } from "react-icons/fi"; 
import { toast } from 'react-toastify'; 

import { CategoryModal } from "../../components/CategoryModel"; 
import { CategoryApi } from "../../services/categoryApi"; 
import { Loading } from '../../components/Loading';

import {
    Container,
    Search as SearchArea,
    Content,
    PaginationWrapper,
    SearchAndActionButton,
    AddButton,
    EmptyState 
} from "./styles"; 

import {Header} from '../../components/Header';
import { SearchInput } from '../../components/SearchInput';
import {Table} from '../../components/Table';
import {Pagination} from '../../components/Pagination';
import {Brand} from '../../components/Brand';
import {Menu} from '../../components/Menu';

import { useMenu } from '../../contexts/MenuContext';

export function Category(){
    const { isMenuOpen } = useMenu();
    const navigate = useNavigate();

    // ESTADOS
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allCategories, setAllCategories] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const storeId = "main"; 
    const [currentPage, setCurrentPage] = useState(1); 
    const ITEMS_PER_PAGE = 10;
    const [searchTerm, setSearchTerm] = useState("");
    //Guarda a pesquisa real que vai para a API
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const categoryHeaders = ["Categoria", "Quantidade"];
    const categoryDataKeys = ["name", "quantity"]; 

    const handleNewCategory = () => setIsModalOpen(true);
    
    // 2. Funçaõ para buscar os dados
    async function loadCategories(search = "") { 
        try {
            setLoading(true); 
            const list = await CategoryApi.list({ 
                storeId, 
                limit: 50, 
                searchTerm: search 
            }); 
            
            const tableData = list.map(c => ({
                id: c.id,
                name: c.name,
                quantity: c.quantity ?? 0, 
                ...c 
            }));

            setAllCategories(tableData);
            setCurrentPage(1); 
        } catch (e) {
             console.error("Erro ao buscar categorias:", e);
             toast.error("Erro ao buscar categorias: " + e.message);
        } finally {
            setLoading(false); 
        }
    }
    
    const handleCreateCategory = async (payload) => {
        try {
            setLoading(true); 
            await CategoryApi.create(payload); 
            toast.success(`Categoria "${payload.name}" criada com sucesso!`);
            loadCategories();
        } catch (e) {
            console.error("Erro ao criar categoria:", e);
            toast.error("Erro ao criar categoria: " + e.message);
            setLoading(false); 
        } 
    };

    const handleDetailsClick = (category) => {
        navigate(`/categoryDetails/${category.id}`); 
    };

    // 4. Lógica para evitar chamadas a api a cada tecla
    useEffect(() => {
        // Cria um timer
        const timerId = setTimeout(() => {
            // Só atualiza o termo de busca da API 500ms depois que o usuário parar de digitar
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        // Limpa o timer se o usuário digitar de novo
        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    // 5. Roda a busca quando o 'debouncedSearchTerm' mudar
    useEffect(() => {
        loadCategories(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    // Lógica de Paginação 
    const totalPages = Math.ceil(allCategories.length / ITEMS_PER_PAGE);
    const categoriesForThisPage = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return allCategories.slice(startIndex, endIndex);
    }, [allCategories, currentPage, ITEMS_PER_PAGE]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Variável para saber se o usuário está pesquisando
    const isSearching = searchTerm.length > 0;

    return(
        <Container $isopen={isMenuOpen}>
            {loading && <Loading />}

            <Brand />
            <Header />
            <Menu />

            <SearchArea>
                <SearchAndActionButton>
                    <SearchInput 
                        placeholder="Pesquise por nome"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <AddButton onClick={handleNewCategory} disabled={loading}>
                        <FiPlus size={24} />
                    </AddButton>
                </SearchAndActionButton>
            </SearchArea>

            <Content>
                
                {/* Se a lista (filtrada) estiver vazia E não estiver carregando... */}
                {categoriesForThisPage.length === 0 && !loading ? (
                    // Se estiver vazia porque o usuário pesquisou
                    isSearching ? (
                        <EmptyState>
                            <p>Nenhuma categoria encontrada com o nome "{searchTerm}"</p>
                        </EmptyState>
                    ) : (
                    // Se estiver vazia por que não tem cadastro
                        <EmptyState>
                            <p>Nenhuma categoria cadastrada</p>
                        </EmptyState>
                    )
                ) : (
                    // Caso contrário, mostra a tabela
                    <>
                        <Table 
                            data={categoriesForThisPage} 
                            headers={categoryHeaders}
                            dataKeys={categoryDataKeys}
                            onDetailsClick={handleDetailsClick} 
                            loading={loading}
                        />

                        {/* Só mostra a paginação se tiver itens */}
                        {categoriesForThisPage.length > 0 && (
                            <PaginationWrapper>
                                <Pagination
                                    totalPages={totalPages || 1}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </PaginationWrapper>
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