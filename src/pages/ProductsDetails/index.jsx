import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { FiChevronLeft } from "react-icons/fi";

import { ProductForm } from '../../components/ProductForm';
import { CategoryApi } from '../../services/categoryApi';
import { ProductApi } from '../../services/productApi';
import { Loading } from '../../components/Loading';
import { PageContainer, PageHeader, PageTitle, BackButton } from '../../styles/commonStyles';

export function ProductsDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [productData, setProductData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [cats, prodDetails] = await Promise.all([
                    CategoryApi.list({ limit: 100 }),
                    ProductApi.getDetails(id) // Corrigido para passar o ID direto conforme sua API espera
                ]);
                setCategories(cats);
                setProductData(prodDetails.product); 
                
                if (prodDetails.variations) {
                    prodDetails.product.variations = prodDetails.variations;
                }
            } catch (err) {
                console.error(err);
                toast.error("Erro ao carregar produto.");
                navigate("/products");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id, navigate]);

    const handleUpdate = async (formData) => {
        try {
            await ProductApi.update({
                id: id,
                updates: {
                    title: formData.name,
                    description: formData.description,
                    price: formData.price,
                    is_available: formData.isAvailable,
                    category_id: formData.categoryId,
                    quantity: formData.hasVariations ? 0 : formData.simpleStock,
                    photos: formData.photos,
                },
                variations: formData.hasVariations ? formData.variations : []
            });

            toast.success("Produto atualizado com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao salvar produto.");
        }
    };

    if(loading) return <Loading />;

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>
                    <BackButton onClick={() => navigate("/products")}>
                        <FiChevronLeft />
                    </BackButton>
                    Editar Produto
                </PageTitle>
            </PageHeader>

            {productData && (
                <ProductForm 
                    initialData={productData}
                    categories={categories} 
                    onSubmit={handleUpdate} 
                    onCancel={() => navigate("/products")} 
                />
            )}
        </PageContainer>
    );
}