import { supabase } from './supabase';

export const ProductApi = {

    async list({ page = 1, limit = 10, searchTerm = "" }) {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from('products')
            .select(`
                id,
                title,
                is_available,
                quantity,
                categories(name),
                photos,
                variations(stock)
            `, { count: 'exact' }); 

        if (searchTerm) {
            query = query.ilike('title', `%${searchTerm}%`);
        }

        const { data, error, count } = await query
            .order('title', { ascending: true })
            .range(from, to);

        if (error) throw new Error(error.message);

        const formattedData = data.map(product => {
            let totalStock = product.quantity ?? 0;

            if (product.variations && product.variations.length > 0) {
                totalStock = product.variations.reduce((acc, v) => acc + (v.stock || 0), 0);
            }

            return {
                id: product.id,
                title: product.title,
                category_name: product.categories?.name || 'Sem Categoria',
                is_available: product.is_available, 
                quantity: totalStock,
                photo: product.photos?.[0] || null
            };
        });

        return { data: formattedData, count };
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
            .eq('product_id', productId)
            .eq('is_deleted', false);

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
        const { data: existingVars, error: fetchError } = await supabase
            .from('variations')
            .select('id')
            .eq('product_id', productId)
            .eq('is_deleted', false);

        if (fetchError) throw fetchError;

        const existingIds = existingVars.map(v => v.id);

        const toInsert = [];
        const toUpdate = [];
        const incomingIds = [];

        if (variations && variations.length > 0) {
            variations.forEach(v => {
                if (v.id && !String(v.id).startsWith('temp-')) {
                    incomingIds.push(v.id);
                    toUpdate.push({
                        id: v.id,
                        product_id: productId,
                        tamanho: v.tamanho,
                        cor: v.cor,
                        stock: Number(v.quantity),
                        price: Number(v.price),
                        is_deleted: false
                    });
                } else {
                    toInsert.push({
                        product_id: productId,
                        tamanho: v.tamanho,
                        cor: v.cor,
                        stock: Number(v.quantity),
                        price: Number(v.price),
                        is_deleted: false
                    });
                }
            });
        }

        const toDeleteIds = existingIds.filter(id => !incomingIds.includes(id));

        if (toDeleteIds.length > 0) {
            const { error: softDeleteError } = await supabase
                .from('variations')
                .update({ 
                    is_deleted: true, 
                    stock: 0 
                })
                .in('id', toDeleteIds);
            
            if (softDeleteError) throw softDeleteError;
        }

        if (toInsert.length > 0) {
            const { error: insError } = await supabase
                .from('variations')
                .insert(toInsert);
            if (insError) throw insError;
        }

        if (toUpdate.length > 0) {
            const { error: upError } = await supabase
                .from('variations')
                .upsert(toUpdate);
            if (upError) throw upError;
        }

        return true;
    }
};