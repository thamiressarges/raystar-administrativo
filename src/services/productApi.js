import { supabase } from './supabase';

export const ProductApi = {

    async list({ limit = 200, searchTerm = "" }) {
        let query = supabase
            .from('products')
            .select(`
                id,
                title,
                is_available,
                quantity,
                categories(name),
                photos
            `)
            .order('title', { ascending: true });

        if (searchTerm) {
            query = query.ilike('title', `%${searchTerm}%`);
        }

        const { data, error } = await query;
        if (error) throw new Error(error.message);

        return data.map(product => ({
            id: product.id,
            title: product.title,
            category_name: product.categories?.name || 'Sem Categoria',
            is_available: product.is_available, 
            quantity: product.quantity ?? 0,
            photo: product.photos?.[0] || null
        }));
    },

    async create(productData) {
        const { data: prod, error: prodError } = await supabase
            .from('products')
            .insert({
                title: productData.name,
                description: productData.description,
                price: productData.price,
                is_available: productData.isAvailable,
                category_id: productData.categoryId,
                photos: productData.photos,
                quantity: productData.quantity
            })
            .select()
            .single();

        if (prodError) throw prodError;

        if (productData.variations && productData.variations.length > 0) {
            const varsToInsert = productData.variations.map(v => ({
                product_id: prod.id,
                tamanho: v.tamanho,
                cor: v.cor,
                stock: Number(v.quantity),
                price: Number(v.price)
            }));

            const { error: varError } = await supabase
                .from('variations')
                .insert(varsToInsert);

            if (varError) throw varError;
        }

        return prod;
    },


    async getDetails({ productId }) {
        const { data: product, error: prodError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        if (prodError) throw new Error(prodError.message);

        const { data: variations, error: varError } = await supabase
            .from('variations')
            .select('*')
            .eq('product_id', productId);

        if (varError) throw new Error(varError.message);

        const { data: reviews, error: revError } = await supabase
            .from('reviews')
            .select('*')
            .eq('product_id', productId);

        return {
            product,
            variations: variations.map(v => ({
                ...v,
                quantity: v.stock
            })),
            reviews: reviews || []
        };
    },

    async update({ productId, updates }) {
        const { error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', productId);

        if (error) {
            console.error("ERRO AO ATUALIZAR:", error);
            throw new Error(error.message);
        }
        return true;
    },

    async delete({ productId }) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', productId);

        if (error) throw new Error(error.message);
        return true;
    },

    async syncVariations({ productId, variations }) {
        const { error: delError } = await supabase
            .from('variations')
            .delete()
            .eq('product_id', productId);
        
        if (delError) throw delError;

        if (variations && variations.length > 0) {
            const varsToInsert = variations.map(v => ({
                product_id: productId,
                tamanho: v.tamanho,
                cor: v.cor,
                stock: Number(v.quantity),
                price: Number(v.price)
            }));

            const { error: insError } = await supabase
                .from('variations')
                .insert(varsToInsert);
            
            if (insError) throw insError;
        }

        return true;
    }
};