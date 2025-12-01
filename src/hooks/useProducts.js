import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { ProductApi } from '../services/productApi';
import { useDebounce } from './useDebounce';

export function useProducts() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);
                const list = await ProductApi.list({ 
                    searchTerm: debouncedSearchTerm, 
                    limit: 200 
                });
                setAllProducts(list);
                setCurrentPage(1);
            } catch (e) {
                toast.error("Erro ao buscar produtos: " + e.message);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, [debouncedSearchTerm]);

    const productsForThisPage = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return allProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [allProducts, currentPage]);

    const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

    return {
        products: productsForThisPage,
        loading,
        currentPage,
        setCurrentPage,
        totalPages,
        searchTerm,
        setSearchTerm,
        hasProducts: allProducts.length > 0
    };
}