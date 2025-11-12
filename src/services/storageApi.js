// src/services/storageApi.js
import { supabase } from './supabase';

// O nome do Balde que você criou no Passo 2
const BUCKET_NAME = 'product-images';

export const StorageApi = {

  /**
   * Faz upload de um arquivo para o Supabase Storage.
   * @param {File} file - O objeto do arquivo (ex: event.target.files[0])
   * @param {string} filePath - O caminho/nome do arquivo no bucket (ex: 'public/produto-1.png')
   * @returns {string} A URL pública do arquivo
   */
  async uploadImage(file, filePath) {
    try {
      // 1. Faz o upload do arquivo
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600', // Cache de 1 hora
          upsert: true, // Sobrescreve se já existir
        });

      if (uploadError) {
        throw uploadError;
      }

      // 2. Pega a URL pública do arquivo que acabamos de enviar
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(uploadData.path); // 'uploadData.path' é o filePath

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