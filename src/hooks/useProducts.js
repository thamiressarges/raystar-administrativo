import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { ProductApi } from '../services/productApi';
import { useDebounce } from './useDebounce';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const ITEMS_PER_PAGE = 10;

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const { data, count } = await ProductApi.list({ 
                searchTerm: debouncedSearchTerm, 
                page: currentPage,
                limit: ITEMS_PER_PAGE 
            });
            
            setProducts(data);
            setTotalCount(count);
        } catch (e) {
            toast.error("Erro ao buscar produtos: " + e.message);
        } finally {
            setLoading(false);
        }
    }, [currentPage, debouncedSearchTerm]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm]);

    return {
        products, 
        loading,
        currentPage,
        setCurrentPage,
        totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
        searchTerm,
        setSearchTerm,
        hasProducts: totalCount > 0
    };
}