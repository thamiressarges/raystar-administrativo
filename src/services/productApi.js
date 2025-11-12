// src/services/productApi.js (ARQUIVO COMPLETO E CORRIGIDO)
import { supabase } from './supabase';

const STORE_ID = "00000000-0000-0000-0000-000000000001";

export const ProductApi = {

    // (Função de Listar - sem alterações)
    async list({ limit = 50, searchTerm = "" }) {
        let query = supabase
            .from('products')
            .select(`
                id, 
                title, 
                is_available,
                categories ( name ) 
            `)
            .eq('store_id', STORE_ID)
            .limit(limit)
            .order('title', { ascending: true });

        if (searchTerm) {
            query = query.ilike('title', `%${searchTerm}%`);
        }
        const { data, error } = await query;
        if (error) throw new Error(error.message);

        const products = data.map(product => ({
            id: product.id,
            product: product.title,
            category: product.categories ? product.categories.name : 'Sem Categoria',
            availability: product.is_available ? 'Sim' : 'Não',
            ...product
        }));
        return products;
    },

    // (Função de Criar - sem alterações)
    async create({
        name,
        description,
        price,
        isAvailable,
        categoryId,
        variations,
        photos
    }) {

        // CHAMA A RPC CORRIGIDA (com 7 argumentos)
        const { data, error } = await supabase.rpc('rpc_create_product_with_variations', {
            name_in: name,
            description_in: description,
            price_in: price, // <-- CORRETO
            is_available_in: isAvailable,
            category_id_in: categoryId,
            variations_in: variations,
            photos_in: photos
        });

        if (error) {
            console.error("Erro ao criar produto:", error);
            throw error;
        }
        return data;
    },

    // (Função de Detalhes - Versão Simples e Correta)
    async getDetails({ productId }) {
        // Apenas chama a RPC. A RPC agora retorna os dados formatados!
        const { data, error } = await supabase.rpc('rpc_get_product_details', {
            product_id_in: productId
        });

        if (error) throw new Error(error.message);

        // Retorna os dados DIRETAMENTE
        return data;
    },

    // (Função de Update - sem alterações)
    async update({ productId, updates }) {
        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', productId)
            .select()
            .single();
        if (error) throw new Error(error.message);
        return data;
    },

    // (Função de Delete - sem alterações)
    async delete({ productId }) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', productId);
        if (error) throw new Error(error.message);
        return true;
    },

    // ***************************************************************
    // **** ⬇️⬇️ NOVA FUNÇÃO ADICIONADA AQUI ⬇️⬇️ ****
    // ***************************************************************

    /**
     * Sincroniza (Insere, Atualiza, Deleta) as variações de um produto.
     * @param {string} productId - O ID do produto
     * @param {Array} variations - A lista COMPLETA de 'editedVariations'
     */
    async syncVariations({ productId, variations }) {
        const { error } = await supabase.rpc('rpc_sync_variations', {
            product_id_in: productId,
            variations_in: variations
        });

        if (error) {
            console.error("Erro ao sincronizar variações:", error);
            throw error;
        }
        
        return true;
    }
};