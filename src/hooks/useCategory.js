import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CategoryApi } from '../services/categoryApi';
import { useDebounce } from './useDebounce';

export function useCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);

    const loadCategories = useCallback(async () => {
        try {
            setLoading(true);
            const data = await CategoryApi.list({ searchTerm: debouncedSearch });
            setCategories(data);
        } catch (error) {
            toast.error("Erro ao carregar categorias.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch]);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    const createCategory = async (data) => {
        try {
            setLoading(true);
            await CategoryApi.create(data);
            toast.success("Categoria criada!");
            loadCategories();
            return true;
        } catch (error) {
            toast.error("Erro ao criar: " + error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (id, data) => {
        try {
            setLoading(true);
            await CategoryApi.update({ id, ...data });
            toast.success("Atualizado com sucesso!");
            loadCategories();
            return true;
        } catch (error) {
            toast.error("Erro ao atualizar.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await CategoryApi.delete(id);
            toast.success("Categoria removida.");
            loadCategories();
        } catch (error) {
            toast.error("Erro ao deletar.");
        }
    };

    return {
        categories,
        loading,
        searchTerm,
        setSearchTerm,
        createCategory,
        updateCategory,
        deleteCategory,
        refresh: loadCategories
    };
}