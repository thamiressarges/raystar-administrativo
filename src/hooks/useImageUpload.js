import { useState } from 'react';
import { toast } from 'react-toastify';
import { StorageApi } from '../services/storageApi';

export function useImageUpload(initialUrls = []) {
    const [previews, setPreviews] = useState(initialUrls);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        
        setUploading(true);
        try {
            const uploadedUrls = [];
            for (const file of files) {
                const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
                const path = `products/${Date.now()}-${cleanName}`;
                
                const url = await StorageApi.uploadImage(file, path);
                uploadedUrls.push(url);
            }
            
            setPreviews(prev => [...prev, ...uploadedUrls]);
            toast.success(`${files.length} imagem(ns) enviada(s)!`);
        } catch (err) {
            console.error(err);
            toast.error("Erro ao fazer upload da imagem.");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (urlToRemove) => {
        setPreviews(prev => prev.filter(url => url !== urlToRemove));
    };

    return {
        previews,
        uploading,
        handleImageUpload,
        removeImage
    };
}