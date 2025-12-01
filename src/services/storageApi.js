import { supabase } from './supabase';
import { STORAGE_BUCKETS } from '../utils/constants';

export const StorageApi = {

  async uploadImage(file, filePath) {
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKETS.PRODUCTS)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKETS.PRODUCTS)
        .getPublicUrl(uploadData.path); 

      if (!urlData.publicUrl) {
        throw new Error("Não foi possível obter a URL pública.");
      }
      
      return urlData.publicUrl;

    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      throw error;
    }
  }
};