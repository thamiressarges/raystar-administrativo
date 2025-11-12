// src/services/storeApi.js
import { supabase } from './supabase';

export const StoreApi = {

    /**
     * Busca os dados da PRIMEIRA (e única) loja do banco.
     */
    async getStoreSettings() {
        // .select() busca tudo
        // .limit(1) pega a primeira
        // .single() retorna como um objeto, não um array
        const { data, error } = await supabase
            .from('stores')
            .select() 
            .limit(1)
            .single(); 

        if (error) {
            console.error("Erro ao buscar dados da loja:", error);
            throw new Error(error.message);
        }

        return data;
    },

    /**
     * Atualiza os dados da loja.
     * @param {string} storeId - O ID (uuid) da loja a ser atualizada
     * @param {object} updates - Um objeto com os campos para atualizar
     */
    async updateStoreSettings(storeId, updates) {
        const { data, error } = await supabase
            .from('stores')
            .update(updates)
            .eq('id', storeId)
            .select() // Retorna os dados atualizados
            .single();

        if (error) {
            console.error("Erro ao salvar dados da loja:", error);
            throw new Error(error.message);
        }

        return data;
    }
};