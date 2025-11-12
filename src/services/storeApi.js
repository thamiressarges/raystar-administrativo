import { supabase } from './supabase';

export const StoreApi = {
    async getStoreSettings() {
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

    async updateStoreSettings(storeId, updates) {
        const { data, error } = await supabase
            .from('stores')
            .update(updates)
            .eq('id', storeId)
            .select() 
            .single();

        if (error) {
            console.error("Erro ao salvar dados da loja:", error);
            throw new Error(error.message);
        }

        return data;
    }
};