import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { FiChevronLeft } from "react-icons/fi";

import { ProductForm } from '../../components/ProductForm';
import { CategoryApi } from '../../services/categoryApi';
import { ProductApi } from '../../services/productApi';
import { PageContainer, PageHeader, PageTitle, BackButton } from '../../styles/commonStyles';

export function NewProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryApi.list({ limit: 100 }).then(setCategories).catch(console.error);
    }, []);

    const handleCreate = async (formData) => {
        try {
            await ProductApi.create({
                title: formData.name,
                description: formData.description,
                price: formData.price,
                is_available: formData.isAvailable,
                category_id: formData.categoryId,
                quantity: formData.hasVariations ? 0 : formData.simpleStock,
                photos: formData.photos,
                variations: formData.hasVariations ? formData.variations : []
            });
            toast.success("Produto criado com sucesso!");
            navigate("/products");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar produto: " + error.message);
        }
    };

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>
                    <BackButton onClick={() => navigate("/products")}>
                        <FiChevronLeft />
                    </BackButton>
                    Novo Produto
                </PageTitle>
            </PageHeader>

            <ProductForm 
                categories={categories} 
                onSubmit={handleCreate} 
                onCancel={() => navigate("/products")} 
            />
        </PageContainer>
    );
}