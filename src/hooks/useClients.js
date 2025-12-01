import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { UserApi } from '../services/userApi';
import { useDebounce } from './useDebounce';

export function useClients() {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const ITEMS_PER_PAGE = 10;

    const fetchClients = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, count } = await UserApi.getClients({
                page: currentPage,
                limit: ITEMS_PER_PAGE,
                searchTerm: debouncedSearchTerm
            });

            setClients(data);
            setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
        } catch (err) {
            setError(err.message);
            toast.error("Erro ao buscar clientes.");
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, debouncedSearchTerm]);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    // Reseta para página 1 se mudar a busca
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm]);

    return {
        clients,
        isLoading,
        error,
        totalPages,
        currentPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        refresh: fetchClients
    };
}