import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { FiChevronLeft, FiSave } from "react-icons/fi";

import { ProductForm } from '../../components/ProductForm';
import { CategoryApi } from '../../services/categoryApi';
import { ProductApi } from '../../services/productApi';
import { PageContainer, PageHeader, PageTitle, BackButton } from '../../styles/commonStyles';
import { HeaderActions, SaveButtonHeader } from './styles';

export function NewProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        CategoryApi.list({ limit: 100 }).then(setCategories).catch(console.error);
    }, []);

    const handleCreate = async (formData) => {
        setIsSubmitting(true);
        try {
            await ProductApi.create({
                name: formData.name,        
                description: formData.description,
                price: formData.price,
                isAvailable: formData.isAvailable, 
                categoryId: formData.categoryId,  
                quantity: formData.hasVariations ? 0 : formData.simpleStock,
                photos: formData.photos,
                variations: formData.hasVariations ? formData.variations : []
            });
            toast.success("Produto criado com sucesso!");
            navigate("/products");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar produto: " + error.message);
        } finally {
            setIsSubmitting(false);
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

                <HeaderActions>
                    <SaveButtonHeader type="submit" form="product-form" disabled={isSubmitting}>
                        <FiSave />
                        {isSubmitting ? "Salvando..." : "Salvar"}
                    </SaveButtonHeader>
                </HeaderActions>
            </PageHeader>

            <ProductForm 
                formId="product-form"
                categories={categories} 
                onSubmit={handleCreate} 
                onCancel={() => navigate("/products")} 
            />
        </PageContainer>
    );
}