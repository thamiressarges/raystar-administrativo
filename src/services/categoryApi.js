import { supabase } from './supabase';

export const CategoryApi = {
    async list({ searchTerm = "", limit = 50 }) {
        let query = supabase
            .from('categories')
            .select('id, name, is_active, products(count)')
            .limit(limit);

        if (searchTerm) {
            query = query.ilike('name', `%${searchTerm}%`);
        }

        const { data, error } = await query;
        if (error) throw error;

        // Retornamos dados puros. A formatação visual fica no componente.
        return data.map(c => ({
            id: c.id,
            name: c.name,
            is_active: c.is_active, 
            quantity: c.products?.[0]?.count || 0
        }));
    },

    async getDetails({ categoryId }) {
        // Se você usar RPC ou query direta, mantenha o retorno simples
        const { data, error } = await supabase.from('categories').select('*').eq('id', categoryId).single();
        if (error) throw error;
        return data;
    },

    async create(payload) {
        const { error } = await supabase.from('categories').insert(payload);
        if (error) throw error;
    },

    async update({ id, ...updates }) {
        const { error } = await supabase.from('categories').update(updates).eq('id', id);
        if (error) throw error;
    },

    async delete(id) {
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) throw error;
    }
};