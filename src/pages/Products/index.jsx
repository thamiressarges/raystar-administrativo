import { useNavigate } from 'react-router-dom';
import { FiPlus, FiBox } from "react-icons/fi";

import { useProducts } from '../../hooks/useProducts';
import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { Loading } from '../../components/Loading';

import { PageContainer } from '../../styles/commonStyles';
import {
    Container,
    SearchArea,
    SearchAndActionButton,
    AddButton,
    EmptyState
} from './styles';

export function Products() {
    const navigate = useNavigate();
    
    const { 
        products, 
        loading, 
        currentPage, 
        setCurrentPage, 
        totalPages, 
        searchTerm, 
        setSearchTerm,
        hasProducts 
    } = useProducts();

    const productHeaders = ["Produto", "Categoria", "Disponibilidade"];
    const productDataKeys = ["title", "categoryName", "is_available"];

    // Pequena formatação visual para a tabela
    const formattedProducts = products.map(p => ({
        ...p,
        is_available: p.is_available ? "Sim" : "Não"
    }));

    const handleNewProduct = () => navigate('/products/new');
    const handleDetailsClick = (item) => navigate(`/productDetails/${item.id}`);

    return (
        <Container>
            {loading && <Loading />}

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

            <PageContainer>
                {!hasProducts && !loading ? (
                    <EmptyState>
                        <FiBox />
                        <p>
                            {searchTerm 
                                ? `Nenhum produto encontrado com o nome "${searchTerm}"` 
                                : "Nenhum produto cadastrado"}
                        </p>
                    </EmptyState>
                ) : (
                    <>
                        <Table
                            data={formattedProducts}
                            headers={productHeaders}
                            dataKeys={productDataKeys}
                            onDetailsClick={handleDetailsClick}
                            loading={loading}
                        />
                        {totalPages > 0 && (
                            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        )}
                    </>
                )}
            </PageContainer>
        </Container>
    );
}