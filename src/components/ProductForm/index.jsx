import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash2, FiImage, FiX } from 'react-icons/fi';

import { productSchema } from '../../utils/schemas';
import { useImageUpload } from '../../hooks/useImageUpload';
import { Switch } from '../Switch';
import { Loading } from '../Loading';
import { AddVariationModal } from '../AddVariationModal'; 
import { formatCurrency } from '../../utils/format';

import {
    FormContainer,
    LayoutGrid,
    LeftColumn,
    RightColumn,
    Card,
    ImagePreviewArea,
    MainImagePlaceholder,
    ThumbnailsList,
    AddImageButton,
    ThumbnailItem,
    FormGroup,
    Label,
    Input,
    Select,
    Textarea,
    VariationsSection,
    VariationsHeader,
    EmptyVariationsBox,
    VariationsTable,
    AddVariationButton,
    RemoveButton
} from './styles';

export function ProductForm({ initialData, categories, onSubmit, onCancel, formId }) {
    const { 
        previews, 
        uploading, 
        handleImageUpload, 
        removeImage 
    } = useImageUpload(initialData?.photos || []);

    const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const { 
        register, 
        control, 
        handleSubmit, 
        watch,
        setValue,
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: initialData?.title || "",
            description: initialData?.description || "",
            price: initialData?.price || "",
            categoryId: initialData?.category_id || "",
            isAvailable: initialData?.is_available ?? true,
            hasVariations: initialData?.variations?.length > 0,
            simpleStock: initialData?.quantity || 0,
            variations: initialData?.variations?.map(v => ({
                tamanho: v.tamanho,
                cor: v.cor,
                quantity: v.stock || v.quantity,
                price: v.price
            })) || []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variations"
    });

    const hasVariations = watch("hasVariations");
    const variations = watch("variations");

    const submitHandler = (data) => {
        if (previews.length === 0) {
            return toast.warn("Adicione pelo menos uma imagem ao produto.");
        }
        onSubmit({ ...data, photos: previews });
    };

    const onError = (errors) => {
        console.error(errors);
        toast.warn("Verifique os campos obrigatórios.");
    };

    const handleAddVariation = (newVariation) => {
        append({
            tamanho: newVariation.tamanho,
            cor: newVariation.cor,
            quantity: newVariation.quantity,
            price: newVariation.price
        });
    };

    return (
        <>
            <FormContainer id={formId} onSubmit={handleSubmit(submitHandler, onError)}>
                {uploading && <Loading />}
                
                <LayoutGrid>
                    <LeftColumn>
                        <Card>
                            <h3 className="card-title">Imagens do Produto</h3>
                            
                            <ImagePreviewArea>
                                {previews.length > 0 ? (
                                    <img 
                                        src={previews[selectedImageIndex] || previews[0]} 
                                        alt="Preview Principal" 
                                    />
                                ) : (
                                    <MainImagePlaceholder>
                                        <FiImage size={48} />
                                        <span>Nenhuma imagem adicionada</span>
                                    </MainImagePlaceholder>
                                )}
                            </ImagePreviewArea>

                            <ThumbnailsList>
                                {previews.map((url, idx) => (
                                    <ThumbnailItem 
                                        key={idx} 
                                        $active={selectedImageIndex === idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                    >
                                        <img src={url} alt={`Thumb ${idx}`} />
                                        <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(url); }}>
                                            <FiX size={12}/>
                                        </button>
                                    </ThumbnailItem>
                                ))}
                                
                                <AddImageButton>
                                    <FiPlus size={24} />
                                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                                </AddImageButton>
                            </ThumbnailsList>
                            
                            <p className="hint">Clique no + para adicionar imagens do produto</p>
                        </Card>
                    </LeftColumn>

                    <RightColumn>
                        <Card>
                            <FormGroup>
                                <Label>Nome *</Label>
                                <Input placeholder="Ex: Camiseta Premium Oversized" {...register("name")} />
                                {errors.name && <span className="error">{errors.name.message}</span>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Categoria *</Label>
                                <Select {...register("categoryId")}>
                                    <option value="">Selecione uma categoria</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </Select>
                                {errors.categoryId && <span className="error">{errors.categoryId.message}</span>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Preço Base *</Label>
                                <Input type="number" step="0.01" placeholder="0.00" {...register("price")} />
                                {errors.price && <span className="error">{errors.price.message}</span>}
                            </FormGroup>

                            {!hasVariations && (
                                <FormGroup>
                                    <Label>Estoque Disponível *</Label>
                                    <Input 
                                        type="number" 
                                        placeholder="0" 
                                        {...register("simpleStock")} 
                                    />
                                    {errors.simpleStock && <span className="error">{errors.simpleStock.message}</span>}
                                </FormGroup>
                            )}

                            <div className="availability-row">
                                <label className="checkbox-label">
                                    <input type="checkbox" {...register("isAvailable")} />
                                    Produto disponível
                                </label>
                                
                                {!hasVariations && (
                                    <span className="stock-info">
                                        Estoque total: {watch("simpleStock") || 0} unidades
                                    </span>
                                )}
                            </div>

                            <FormGroup>
                                <Label>Descrição *</Label>
                                <Textarea 
                                    placeholder="Descreva as características..." 
                                    rows={5}
                                    {...register("description")} 
                                />
                            </FormGroup>
                        </Card>
                    </RightColumn>
                </LayoutGrid>

                <VariationsSection>
                    <Card>
                        <VariationsHeader>
                            <h3>Variações do Produto</h3>
                            <div className="toggle-wrapper">
                                <Controller
                                    name="hasVariations"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onChange={field.onChange} />
                                    )}
                                />
                            </div>
                        </VariationsHeader>

                        {!hasVariations ? (
                            <EmptyVariationsBox>
                                <p>Produto cadastrado com preço único. Para adicionar variações, ative a chave acima.</p>
                            </EmptyVariationsBox>
                        ) : (
                            <div style={{ marginTop: 20 }}>
                                {fields.length > 0 && (
                                    <VariationsTable>
                                        <thead>
                                            <tr>
                                                <th>Tamanho</th>
                                                <th>Cor</th>
                                                <th>Estoque</th>
                                                <th>Preço</th>
                                                <th style={{ width: 50 }}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fields.map((field, index) => (
                                                <tr key={field.id}>
                                                    <td>{field.tamanho}</td>
                                                    <td>{field.cor}</td>
                                                    <td>{field.quantity}</td>
                                                    <td>{field.price ? formatCurrency(field.price) : '—'}</td>
                                                    <td>
                                                        <RemoveButton type="button" onClick={() => remove(index)}>
                                                            <FiTrash2 />
                                                        </RemoveButton>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </VariationsTable>
                                )}

                                <AddVariationButton type="button" onClick={() => setIsVariationModalOpen(true)}>
                                    + Adicionar Variação
                                </AddVariationButton>
                            </div>
                        )}
                    </Card>
                </VariationsSection>
            </FormContainer>

            <AddVariationModal 
                isOpen={isVariationModalOpen} 
                onClose={() => setIsVariationModalOpen(false)}
                onSubmit={handleAddVariation}
            />
        </>
    );
}