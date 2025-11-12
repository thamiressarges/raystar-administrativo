// src/services/categoryApi.js (ARQUIVO COMPLETO E CORRIGIDO)
import { supabase } from './supabase';

// ID da Loja (ajuste se for dinâmico)
const STORE_ID = "00000000-0000-0000-0000-000000000001";

// (Não precisamos mais importar a ProductApi aqui)

export const CategoryApi = {

    /**
     * Lista todas as categorias com contagem de produtos
     */
    async list({ searchTerm = "", limit = 50 }) {
        let query = supabase
            .from('categories')
            .select('id, name, products(count)')
            .eq('store_id', STORE_ID)
            .limit(limit);

        if (searchTerm) {
            query = query.ilike('name', `%${searchTerm}%`);
        }

        const { data, error } = await query;
        if (error) throw error;

        return data.map(c => ({
            id: c.id,
            name: c.name,
            quantity: c.products[0]?.count || 0,
        }));
    },

    /**
     * Busca os detalhes de UMA categoria e seus produtos
     */
    async getDetails({ categoryId }) {
        const { data, error } = await supabase.rpc('rpc_get_category_details', {
            category_id_in: categoryId
        });
        
        if (error) throw error;
        return data; 
    },

    /**
     * Cria uma nova categoria
     */
    async create(payload) {
        const { data, error } = await supabase
            .from('categories')
            .insert({
                name: payload.name,
                description: payload.description,
                availability: payload.availability,
                store_id: STORE_ID
            })
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Atualiza uma categoria
     */
    async update({ categoryId, name, description, availability }) {
        const { data, error } = await supabase
            .from('categories')
            .update({
                name,
                description,
                availability
            })
            .eq('id', categoryId)
            .eq('store_id', STORE_ID);

        if (error) throw error;
        return data;
    },

    /**
     * Deleta uma categoria
     * (O banco de dados agora cuida da cascata)
     */
    async delete({ categoryId }) {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', categoryId)
            .eq('store_id', STORE_ID);

        if (error) throw error;
        return true;
    },

    // **** REMOVIDO: A função 'removeProductFromCategory' foi deletada. ****
};