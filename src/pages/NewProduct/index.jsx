import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { 
    FiSave, FiChevronLeft, FiPlus, FiImage, FiTrash2, FiX 
} from "react-icons/fi";

import { Loading } from '../../components/Loading'; 
import { AddVariationModal } from '../../components/AddVariationModal';
import { Switch } from '../../components/Switch'; 

import { CategoryApi } from '../../services/categoryApi';
import { ProductApi } from '../../services/productApi';
import { StorageApi } from '../../services/storageApi';
import { formatCurrency } from '../../utils/format';

import * as S from "./styles"; 

export function NewProduct() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [price, setPrice] = useState(0); 
    const [images, setImages] = useState([]);

    const [hasVariations, setHasVariations] = useState(true); 
    const [variations, setVariations] = useState([]); 
    const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
    
    const [simpleProductStock, setSimpleProductStock] = useState(1); 

    const [loading, setLoading] = useState(false); 

    const totalStock = hasVariations
        ? variations.reduce((acc, variation) => acc + (variation.estoque || 0), 0)
        : simpleProductStock; 

    useEffect(() => {
        async function loadCategories() {
            try {
                const list = await CategoryApi.list({ limit: 200 }); 
                setCategories(list);
            } catch (err) {
                toast.error("Erro ao carregar as categorias: " + err);
            }
        }
        loadCategories();
    }, []); 

    const handleImageSelect = (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;
        if (images.length + files.length > 5) {
            toast.warn(`Máximo de 5 imagens. Apenas ${5 - images.length} serão adicionadas.`);
            files.splice(5 - images.length);
        }
        const newImages = files.map(file => ({
            id: `temp-${Math.random()}`, 
            file: file,
            previewUrl: URL.createObjectURL(file)
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const triggerFileInput = () => { fileInputRef.current.click(); };

    const handleDeleteImage = (id) => {
        const imageToRemove = images.find(img => img.id === id);
        if (imageToRemove) {
            URL.revokeObjectURL(imageToRemove.previewUrl);
        }
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const handleAddVariation = (newVariationPayload) => {
        const newVariation = {
            ...newVariationPayload,
            promotionPrice: null,
            promotion_price: null,
        }
        setVariations(prev => [...prev, newVariation]);
    };

    const handleDeleteVariation = (id) => {
        setVariations(prev => prev.filter(v => v.id !== id));
    };

    const handleSave = async () => {
        if (!name || !description || !selectedCategory) {
            return toast.warn("Preencha Nome, Descrição e Categoria.");
        }
        if (images.length === 0) {
            return toast.warn("Adicione pelo menos uma imagem ao produto.");
        }
        if (price <= 0) {
            return toast.warn("O Preço Base deve ser maior que zero.");
        }

        if (hasVariations && variations.length === 0) {
            return toast.warn("Adicione pelo menos uma variação, ou desative a opção 'Variações do Produto'.");
        }
        if (!hasVariations && simpleProductStock <= 0) {
            return toast.warn("Defina a quantidade de estoque disponível.");
        }
        
        setLoading(true);

        try {
            const uploadedImageUrls = [];
            
            for (const image of images) {
                const sanitizedFileName = image.file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();                      
                const filePath = `public/${Date.now()}-${sanitizedFileName}`;
                const publicUrl = await StorageApi.uploadImage(image.file, filePath);
                uploadedImageUrls.push(publicUrl);
            }

            let variationsPayload = [];

            if (hasVariations) {
                variationsPayload = variations.map(v => ({
                    ...v,
                    quantity: v.estoque, 
                    price: v.preco, 
                    promotion_price: null,
                }));
            } else {
                variationsPayload = [];
            }

            await ProductApi.create({
                name: name,
                description: description,
                price: price, 
                isAvailable: isAvailable,
                categoryId: selectedCategory, 
                photos: uploadedImageUrls,
                promotion_price: null,
                promotion_start_date: null,
                promotion_end_date: null,
                variations: variationsPayload, 
                quantity: hasVariations ? 0 : simpleProductStock, 
            });

            toast.success("Produto salvo com sucesso!");
            navigate("/products"); 

        } catch (err) {
            toast.error("Erro ao salvar produto: " + (err.message || err));
            setLoading(false); 
        }
    };

    return (
        <S.Container>
            {(loading) && <Loading />}

            <S.HiddenFileInput 
                type="file"
                accept="image/png, image/jpeg"
                multiple
                ref={fileInputRef}
                onChange={handleImageSelect}
            />

            <S.HeaderBar>
                <S.Title>
                    <S.BackLink onClick={() => navigate("/products")}>
                        <FiChevronLeft />
                    </S.BackLink>
                    Novo Produto
                </S.Title>
                <S.SaveButton onClick={handleSave} disabled={loading}>
                    <FiSave /> Salvar
                </S.SaveButton>
            </S.HeaderBar>

            <S.MainContentGrid>
                <S.LeftColumn>
                    <S.Section>
                        <h2>Imagens do Produto</h2>
                        <S.ImageUploadArea>
                            <S.ImagePlaceholder onClick={triggerFileInput}>
                                <FiImage />
                                <span>Nenhuma imagem adicionada</span>
                            </S.ImagePlaceholder>

                            <S.ThumbnailList>
                                {images.map(image => (
                                    <S.ThumbnailPreview key={image.id}>
                                        <img src={image.previewUrl} alt="Preview" />
                                        <S.DeleteImageButton onClick={() => handleDeleteImage(image.id)}>
                                            <FiX size={14} />
                                        </S.DeleteImageButton>
                                    </S.ThumbnailPreview>
                                ))}

                                <S.AddThumbnailButton onClick={triggerFileInput}>
                                    <FiPlus size={24} />
                                </S.AddThumbnailButton>
                            </S.ThumbnailList>

                            <S.UploadHint>
                                Clique no + para adicionar imagens do produto
                            </S.UploadHint>
                        </S.ImageUploadArea>
                    </S.Section>
                </S.LeftColumn>

                <S.RightColumn>
                    <S.Section>
                        <S.FormGroup>
                            <label>Nome *</label>
                            <S.Input 
                                type="text"
                                placeholder="Ex: Camiseta Premium Oversized"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </S.FormGroup>

                        <S.FormGroup>
                            <label>Categoria *</label>
                            <S.Select 
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </S.Select>
                        </S.FormGroup>
                        
                        <S.FormGroup>
                            <label>Preço Base * (Preço de Referência)</label>
                            <S.Input
                                type="number"
                                step="0.01"
                                placeholder="Ex: 199.90"
                                value={price}
                                onChange={e => setPrice(parseFloat(e.target.value) || 0)}
                            />
                        </S.FormGroup>
                        
                        {!hasVariations && (
                            <S.FormGroup>
                                <label>Estoque Disponível *</label>
                                <S.Input
                                    type="number"
                                    placeholder="Quantidade em estoque"
                                    value={simpleProductStock}
                                    onChange={e => setSimpleProductStock(parseInt(e.target.value) || 0)}
                                />
                            </S.FormGroup>
                        )}

                        <S.CheckboxWrapper>
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={isAvailable}
                                    onChange={e => setIsAvailable(e.target.checked)}
                                />
                                Produto disponível
                            </label>
                            
                            <span>Estoque total: {totalStock} unidades</span>
                        </S.CheckboxWrapper>
                        
                        <S.FormGroup>
                            <label>Descrição *</label>
                            <S.Textarea 
                                placeholder="Descreva as características..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </S.FormGroup>
                    </S.Section>
                </S.RightColumn>
            </S.MainContentGrid>
            
            <S.Section style={{marginTop: '24px'}}>
                <S.SectionHeader>
                    <h2>Variações do Produto</h2>
                    <S.SimpleSwitchWrapper>
                        <Switch 
                            checked={hasVariations}
                            onChange={setHasVariations}
                        />
                    </S.SimpleSwitchWrapper>
                </S.SectionHeader>

                {hasVariations ? (
                    <>
                        <S.VariationsControl>
                            <p>Adicione tamanhos, cores e preços individuais</p>
                            <S.AddVariationButton onClick={() => setIsVariationModalOpen(true)}>
                                <FiPlus /> Adicionar Variação
                            </S.AddVariationButton>
                        </S.VariationsControl>
                        
                        {variations.length === 0 ? (
                            <S.EmptyState>
                                Nenhuma variação adicionada
                                <br />
                                Clique em "Adicionar Variação" para começar
                            </S.EmptyState>
                        ) : (
                            <S.VariationsTable>
                                <thead>
                                    <tr>
                                        <th>Tamanho</th>
                                        <th>Cor</th>
                                        <th>Estoque</th>
                                        <th>Preço</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {variations.map(v => (
                                        <tr key={v.id}>
                                            <td>{v.tamanho}</td>
                                            <td>{v.cor}</td>
                                            <td>{v.estoque}</td>
                                            <td>
                                                {formatCurrency(v.preco)}
                                            </td>
                                            <td>
                                                <S.DeleteVariationButton onClick={() => handleDeleteVariation(v.id)}>
                                                    <FiTrash2 size={18} />
                                                </S.DeleteVariationButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </S.VariationsTable>
                        )}
                    </>
                ) : (
                        <S.SimpleProductWarning>
                        Produto cadastrado com preço único. Para adicionar variações, ative a chave acima.
                    </S.SimpleProductWarning>
                )}
            </S.Section>

            <AddVariationModal
                isOpen={isVariationModalOpen}
                onClose={() => setIsVariationModalOpen(false)}
                onSubmit={handleAddVariation}
            />
        </S.Container>
    );
}