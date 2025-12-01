import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash2, FiImage, FiX, FiSave, FiAlertCircle } from 'react-icons/fi';

import { productSchema } from '../../utils/schemas';
import { useImageUpload } from '../../hooks/useImageUpload'; // Novo hook
import { Switch } from '../Switch';
import { Loading } from '../Loading';

import {
    FormContainer, MainGrid, LeftColumn, RightColumn, Section, FormGroup,
    Input, Select, Textarea, ImageUploadArea, ImagePreviewGrid, ImageBox,
    UploadButton, VariationsTable, ActionsBar, SaveButton, CancelButton,
    AddVariationButton, SwitchWrapper
} from './styles';

export function ProductForm({ initialData, categories, onSubmit, onCancel }) {
    const { 
        previews, 
        uploading, 
        handleImageUpload, 
        removeImage 
    } = useImageUpload(initialData?.photos || []);

    const { 
        register, 
        control, 
        handleSubmit, 
        watch,
        formState: { errors, isSubmitting } 
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

    const submitHandler = (data) => {
        if (previews.length === 0) {
            return toast.warn("Adicione pelo menos uma imagem ao produto.");
        }
        onSubmit({ ...data, photos: previews });
    };

    return (
        <FormContainer onSubmit={handleSubmit(submitHandler)}>
            {uploading && <Loading />}
            
            <MainGrid>
                <LeftColumn>
                    <Section>
                        <h2>Imagens do Produto</h2>
                        <ImageUploadArea>
                            <ImagePreviewGrid>
                                {previews.map((url, idx) => (
                                    <ImageBox key={idx}>
                                        <img src={url} alt={`Preview ${idx}`} />
                                        <button type="button" onClick={() => removeImage(url)}>
                                            <FiX />
                                        </button>
                                    </ImageBox>
                                ))}
                                <UploadButton>
                                    <FiImage size={24} />
                                    <span>Adicionar</span>
                                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                                </UploadButton>
                            </ImagePreviewGrid>
                        </ImageUploadArea>
                    </Section>
                </LeftColumn>

                <RightColumn>
                    <Section>
                        <h2>Informações Gerais</h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <FormGroup>
                                <label>Nome do Produto *</label>
                                <Input placeholder="Ex: Camiseta Básica" {...register("name")} />
                                {errors.name && <span className="error">{errors.name.message}</span>}
                            </FormGroup>

                            <FormGroup>
                                <label>Categoria *</label>
                                <Select {...register("categoryId")}>
                                    <option value="">Selecione...</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </Select>
                                {errors.categoryId && <span className="error">{errors.categoryId.message}</span>}
                            </FormGroup>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <FormGroup>
                                <label>Preço Base (R$) *</label>
                                <Input type="number" step="0.01" placeholder="0.00" {...register("price")} />
                                {errors.price && <span className="error">{errors.price.message}</span>}
                            </FormGroup>

                            <FormGroup>
                                <label>Disponibilidade</label>
                                <div style={{ marginTop: '10px' }}>
                                    <SwitchWrapper>
                                        <span>Produto visível na loja?</span>
                                        <Controller
                                            name="isAvailable"
                                            control={control}
                                            render={({ field }) => (
                                                <Switch checked={field.value} onChange={field.onChange} />
                                            )}
                                        />
                                    </SwitchWrapper>
                                </div>
                            </FormGroup>
                        </div>

                        <FormGroup>
                            <label>Descrição</label>
                            <Textarea placeholder="Detalhes do produto..." {...register("description")} />
                        </FormGroup>
                    </Section>

                    <Section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ border: 'none', padding: 0, margin: 0 }}>Estoque e Variações</h2>
                            <SwitchWrapper>
                                <span style={{ marginRight: 8 }}>Este produto tem variações?</span>
                                <Controller
                                    name="hasVariations"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onChange={field.onChange} />
                                    )}
                                />
                            </SwitchWrapper>
                        </div>

                        {!hasVariations ? (
                            <FormGroup>
                                <label>Quantidade em Estoque</label>
                                <Input 
                                    type="number" 
                                    placeholder="0" 
                                    style={{ maxWidth: '150px' }}
                                    {...register("simpleStock")} 
                                />
                                {errors.simpleStock && <span className="error">{errors.simpleStock.message}</span>}
                            </FormGroup>
                        ) : (
                            <>
                                {fields.length === 0 && (
                                    <div style={{ padding: '20px', textAlign: 'center', color: '#666', background: '#F9FAFB', borderRadius: '8px' }}>
                                        <FiAlertCircle size={24} style={{ marginBottom: 8, display: 'block', margin: '0 auto' }} />
                                        Nenhuma variação adicionada. Clique no botão abaixo.
                                    </div>
                                )}
                                
                                {fields.length > 0 && (
                                    <VariationsTable>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '25%' }}>Tamanho</th>
                                                <th style={{ width: '25%' }}>Cor</th>
                                                <th style={{ width: '20%' }}>Estoque</th>
                                                <th style={{ width: '20%' }}>Preço (Opcional)</th>
                                                <th style={{ width: '10%' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fields.map((field, index) => (
                                                <tr key={field.id}>
                                                    <td>
                                                        <Input placeholder="Ex: M" {...register(`variations.${index}.tamanho`)} />
                                                        {errors.variations?.[index]?.tamanho && <span className="error">Obrigatório</span>}
                                                    </td>
                                                    <td>
                                                        <Input placeholder="Ex: Azul" {...register(`variations.${index}.cor`)} />
                                                        {errors.variations?.[index]?.cor && <span className="error">Obrigatório</span>}
                                                    </td>
                                                    <td>
                                                        <Input type="number" placeholder="0" {...register(`variations.${index}.quantity`)} />
                                                    </td>
                                                    <td>
                                                        <Input type="number" step="0.01" placeholder="Igual base" {...register(`variations.${index}.price`)} />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <button 
                                                            type="button" 
                                                            onClick={() => remove(index)}
                                                            style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                                                        >
                                                            <FiTrash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </VariationsTable>
                                )}

                                <AddVariationButton 
                                    type="button" 
                                    onClick={() => append({ tamanho: "", cor: "", quantity: 0, price: "" })}
                                >
                                    <FiPlus /> Adicionar Variação
                                </AddVariationButton>
                            </>
                        )}
                    </Section>
                </RightColumn>
            </MainGrid>

            <ActionsBar>
                <CancelButton type="button" onClick={onCancel}>
                    Cancelar
                </CancelButton>
                <SaveButton type="submit" disabled={isSubmitting}>
                    <FiSave />
                    {isSubmitting ? "Salvando..." : "Salvar Produto"}
                </SaveButton>
            </ActionsBar>
        </FormContainer>
    );
}