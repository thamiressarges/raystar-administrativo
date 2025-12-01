import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiBox } from "react-icons/fi";
import { toast } from 'react-toastify';

import {
    Container,
    Search as SearchArea,
    Content,
    PaginationContainer,
    SearchAndActionButton,
    AddButton,
    EmptyState
} from './styles';

import { Header } from '../../components/Header';
import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Brand } from '../../components/Brand';
import { Menu } from '../../components/Menu';
import { Pagination } from '../../components/Pagination';
import { Loading } from '../../components/Loading';
import { useMenu } from '../../contexts/MenuContext';

import { ProductApi } from '../../services/productApi';

export function Products() {
    const { isMenuOpen } = useMenu();
    const navigate = useNavigate();

    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const ITEMS_PER_PAGE = 10;

    const productHeaders = ["Produto", "Categoria", "Disponibilidade"];
    const productDataKeys = ["product", "category", "availability"];

    async function loadProducts(search = "") {
        try {
            setLoading(true);
            const list = await ProductApi.list({ searchTerm: search, limit: 200 });
            setAllProducts(list);
            setCurrentPage(1);
        } catch (e) {
            toast.error("Erro ao buscar produtos: " + e.message);
        } finally {
            setLoading(false);
        }
    }

    const handleNewProduct = () => navigate('/products/new');
    const handleDetailsClick = (item) => navigate(`/productDetails/${item.id}`);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(timerId);
    }, [searchTerm]);

    useEffect(() => {
        loadProducts(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    const productsForThisPage = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return allProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [allProducts, currentPage]);

    const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

    return (
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
                    <AddButton onClick={handleNewProduct} disabled={loading}>
                        <FiPlus size={24} />
                    </AddButton>
                </SearchAndActionButton>
            </SearchArea>

            <Content>
                {productsForThisPage.length === 0 && !loading ? (
                    searchTerm ? (
                        <EmptyState>
                            <FiBox />
                            <p>Nenhum produto encontrado com o nome "{searchTerm}"</p>
                        </EmptyState>
                    ) : (
                        <EmptyState>
                            <FiBox />
                            <p>Nenhum produto cadastrado</p>
                        </EmptyState>
                    )
                ) : (
                    <>
                        <Table
                            data={productsForThisPage}
                            headers={productHeaders}
                            dataKeys={productDataKeys}
                            onDetailsClick={handleDetailsClick}
                            loading={loading}
                        />
                        {totalPages > 0 && (
                            <PaginationContainer>
                                <Pagination
                                    totalPages={totalPages || 1}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                />
                            </PaginationContainer>
                        )}
                    </>
                )}
            </Content>
        </Container>
    );
}