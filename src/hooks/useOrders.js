import { useState, useEffect, useCallback } from 'react';
import { orderApi } from '../services/orderApi';
import { useDebounce } from './useDebounce'; 

export function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); 

    const debouncedSearchTerm = useDebounce(searchTerm, 500); 
    const itemsPerPage = 10; 

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const { data, count } = await orderApi.getOrders(currentPage, itemsPerPage, debouncedSearchTerm);
            setOrders(data);
            setTotalCount(count);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, debouncedSearchTerm]); 

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm]);

    return {
        orders,
        loading,
        currentPage,
        setCurrentPage,
        totalPages: Math.ceil(totalCount / itemsPerPage),
        refresh: fetchOrders,
        searchTerm,     
        setSearchTerm   
    };
}