import { supabase } from './supabase';

export const ProductApi = {

    // LISTAR PRODUTOS (Mantive igual, pois lê da tabela products que está ok)
    async list({ limit = 200, searchTerm = "" }) {
        let query = supabase
            .from('products')
            .select(`
                id,
                title,
                is_available,
                quantity,
                categories(name)
            `)
            .order('title', { ascending: true });

        if (searchTerm) {
            query = query.ilike('title', `%${searchTerm}%`);
        }

        const { data, error } = await query;
        if (error) throw new Error(error.message);

        return data.map(product => ({
            id: product.id,
            product: product.title,
            category: product.categories?.name || 'Sem Categoria',
            availability: product.is_available ? 'Sim' : 'Não',
            quantity: product.quantity ?? 0,
        }));
    },

    // CRIAR PRODUTO
    async create(productData) {
        // 1. Cria o Produto
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

        // 2. Se tiver variações, insere na tabela NOVA
        if (productData.variations && productData.variations.length > 0) {
            const varsToInsert = productData.variations.map(v => ({
                product_id: prod.id,
                tamanho: v.tamanho,
                cor: v.cor,
                stock: Number(v.quantity), // Mapeia quantity -> stock
                price: Number(v.price)
            }));

            const { error: varError } = await supabase
                .from('variations')
                .insert(varsToInsert);

            if (varError) throw varError;
        }

        return prod;
    },

    // DETALHES DO PRODUTO (CORRIGIDO: Lê direto das tabelas novas)
    async getDetails({ productId }) {
        // 1. Busca o Produto
        const { data: product, error: prodError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        if (prodError) throw new Error(prodError.message);

        // 2. Busca as Variações na tabela CERTA (variations)
        const { data: variations, error: varError } = await supabase
            .from('variations')
            .select('*')
            .eq('product_id', productId);

        if (varError) throw new Error(varError.message);

        // 3. Busca Reviews
        const { data: reviews, error: revError } = await supabase
            .from('reviews')
            .select('*')
            .eq('product_id', productId);

        // 4. Retorna tudo formatado para o Front
        return {
            product,
            // Mapeia 'stock' do banco para 'quantity' pro seu Front antigo entender
            variations: variations.map(v => ({
                ...v,
                quantity: v.stock // O segredo: traduz stock -> quantity
            })),
            reviews: reviews || []
        };
    },

    // UPDATE (Simples update na tabela products)
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

    // DELETE
    async delete({ productId }) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', productId);

        if (error) throw new Error(error.message);
        return true;
    },

    // SYNC VARIAÇÕES (CORRIGIDO: Apaga e recria na tabela 'variations')
    async syncVariations({ productId, variations }) {
        // 1. Apaga as variações antigas desse produto
        const { error: delError } = await supabase
            .from('variations')
            .delete()
            .eq('product_id', productId);
        
        if (delError) throw delError;

        // 2. Se tiver novas, insere
        if (variations && variations.length > 0) {
            const varsToInsert = variations.map(v => ({
                product_id: productId,
                tamanho: v.tamanho,
                cor: v.cor,
                stock: Number(v.quantity), // Traduz quantity -> stock
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