import { supabase } from './supabase'; 

const STORE_ID = "00000000-0000-0000-0000-000000000001";

export const CategoryApi = {
    
    // ADMIN: Listar todas as categorias
    async list({ limit = 50, searchTerm = "" }) {
        
        // Inicia a query
        let query = supabase
            .from('categories')
            .select('id, name, availability, description, products(count)') 
            .eq('store_id', STORE_ID)
            .limit(limit)
            .order('name', { ascending: true });

        // Se o usuário digitou algo, adiciona o filtro de pesquisa
        if (searchTerm) {
            query = query.ilike('name', `%${searchTerm}%`); 
        }

        // Executa a query
        const { data, error } = await query;

        if (error) {
            console.error("Erro ao listar categorias:", error);
            throw new Error(error.message);
        }

        // Formata os dados
        const categories = data.map(category => ({
            ...category, 
            quantity: category.products[0]?.count || 0 
        }));
        
        return categories; 
    },

    // Criar
    async create({ name, description }) {
        const { data: newCategory, error } = await supabase
            .from('categories')
            .insert({
                store_id: STORE_ID,
                name: name,
                description: description,
                availability: 'active'
            })
            .select()
            .single();
        
        if (error) throw new Error(error.message);
        return newCategory;
    },

    // Atualizar
    async update({ categoryId, name, description, availability }) {
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (availability !== undefined) updates.availability = availability;
        updates.updated_at = new Date().toISOString();

        const { data, error } = await supabase
            .from('categories')
            .update(updates)
            .eq('id', categoryId)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    },

    // Detalhes
    async getDetails({ categoryId, storeId }) { 
        const { data, error } = await supabase.rpc('rpc_get_category_details', {
            category_id_in: categoryId,
            store_id_in: STORE_ID
        });

        if (error) throw new Error(error.message);

        return { 
            category: { ...(data.category || {}), id: categoryId, quantity: data.quantity }
        };
    },

    // Deletar
    async delete({ categoryId }) {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', categoryId);

        if (error) {
            console.error("Erro ao deletar categoria:", error);
            throw new Error(error.message); 
        }

        return true;
    }
};