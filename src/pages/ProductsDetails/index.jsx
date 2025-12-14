import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify'; 
import { FiChevronLeft, FiEdit2, FiTrash2, FiCheckSquare, FiSquare, FiStar, FiPlus, FiSave, FiImage } from "react-icons/fi";

import { CategoryApi } from '../../services/categoryApi';
import { ProductApi } from '../../services/productApi';
import { Loading } from '../../components/Loading';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Switch } from '../../components/Switch'; 
import { AddVariationModal } from '../../components/AddVariationModal'; 
import { formatCurrency } from '../../utils/format';
import { productSchema } from '../../utils/schemas'; 
import { useImageUpload } from '../../hooks/useImageUpload'; 
import { PageContainer, PageTitle, BackButton } from '../../styles/commonStyles';

import {
    HeaderBar,
    ActionButtons,
    EditButton,
    DeleteButton,
    MainCard,
    ImageSection,
    MainImage,
    ThumbnailList,
    Thumbnail,
    InfoSection,
    PriceTag,
    StockInfo,
    AvailabilityBadge,
    Section,
    SectionTitle,
    VariationsTable,
    EmptyState,
    FormGrid, 
    FormGroup,
    Label,
    Input,
    Select,
    TextArea,
    AddImageBox,
    BottomActions,
    CancelButton,
    SaveButton,
    DeleteImageButton,
    SectionHeaderFlex,
    SwitchRow,
    VariationHeaderContainer,
    VariationLabel,
    VariationsWrapper,
    ReviewContainer,
    ReviewItem,
    ReviewHeader,
    AddVariationBtn,
    RemoveVarButton
} from './styles';

export function ProductsDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [variationsData, setVariationsData] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);

    const { 
        register, 
        control, 
        handleSubmit, 
        reset,
        watch,
        setValue, 
        formState: { isSubmitting, errors } 
    } = useForm({
        resolver: zodResolver(productSchema),
    });

    const { 
        previews, 
        handleImageUpload, 
        removeImage,
        setPreviews 
    } = useImageUpload([]);

    useEffect(() => {
        async function load() {
            try {
                if (!id) return;

                const [cats, prodDetails] = await Promise.all([
                    CategoryApi.list({ limit: 100 }),
                    ProductApi.getDetails({ productId: id })
                ]);
                
                if (!prodDetails || !prodDetails.product) {
                    throw new Error("Produto não retornado pelo banco de dados.");
                }
                
                setCategories(cats);
                setProduct(prodDetails.product);
                
                const activeVariations = (prodDetails.variations || []).filter(v => !v.is_deleted);
                setVariationsData(activeVariations);
                
                setReviews(prodDetails.reviews || []);
                setPreviews(prodDetails.product.photos || []);

            } catch (err) {
                console.error(err);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id, navigate, setPreviews]);

    const handleStartEditing = () => {
        if (!product) return;
        
        reset({
            name: product.title,
            description: product.description,
            price: product.price,
            categoryId: product.category_id,
            isAvailable: product.is_available,
            hasVariations: variationsData.length > 0,
            simpleStock: product.quantity,
            variations: variationsData
        });
        setIsEditing(true);
    };

    const handleAddVariation = (newVariation) => {
        const updated = [...variationsData, newVariation];
        setVariationsData(updated);
        setValue("variations", updated, { shouldValidate: true });
    };

    const handleRemoveVariation = (indexToRemove) => {
        const updated = variationsData.filter((_, idx) => idx !== indexToRemove);
        setVariationsData(updated);
        setValue("variations", updated, { shouldValidate: true });
        
        if (updated.length === 0) {
            setValue("hasVariations", false);
        }
    };

    const onSubmit = async (data) => {
        try {
            await ProductApi.update({
                productId: id,
                updates: {
                    title: data.name,
                    description: data.description,
                    price: data.price,
                    is_available: data.isAvailable,
                    category_id: data.categoryId,
                    quantity: data.hasVariations ? 0 : data.simpleStock,
                    photos: previews, 
                }
            });

            if (data.hasVariations || variationsData.length > 0) {
                await ProductApi.syncVariations({
                    productId: id,
                    variations: data.hasVariations ? variationsData : [] 
                });
            }

            toast.success("Produto atualizado!");
            
            setProduct(prev => ({ 
                ...prev, 
                title: data.name, 
                description: data.description,
                price: data.price,
                is_available: data.isAvailable,
                category_id: data.categoryId,
                quantity: data.hasVariations ? 0 : data.simpleStock,
                photos: previews
            }));
            
            if (!data.hasVariations) {
                setVariationsData([]);
            }
            
            setIsEditing(false);

        } catch (error) {
            console.error(error);
            toast.error("Erro ao salvar: " + error.message);
        }
    };
    
    const onError = (errors) => {
        console.error("Erro de validação:", errors);
        const firstError = Object.values(errors)[0];
        if (firstError) {
            toast.warn(firstError.message || "Verifique os campos obrigatórios.");
        }
    };

    const handleDelete = () => {
        toast.warn(
            ({ closeToast }) => (
                <ConfirmModal
                    closeToast={closeToast}
                    onConfirm={async () => {
                        try {
                            await ProductApi.delete({ productId: id });
                            toast.success("Produto deletado!");
                            navigate("/products");
                        } catch (e) {
                            toast.error("Erro ao deletar.");
                        }
                    }}
                    message={`Tem certeza que deseja excluir "${product.title}"?`}
                    confirmText="Excluir"
                />
            ),
            { autoClose: false, closeOnClick: false }
        );
    };

    if (loading) return <Loading />;
    if (!product) return null;

    const categoryName = categories.find(c => c.id === product.category_id)?.name || "Sem categoria";
    const hasVariations = watch("hasVariations"); 

    return (
        <PageContainer>
            <HeaderBar>
                <PageTitle>
                    <BackButton onClick={() => isEditing ? setIsEditing(false) : navigate("/products")}>
                        <FiChevronLeft />
                    </BackButton>
                    {isEditing ? "Editando Produto" : product.title}
                </PageTitle>

                {!isEditing && (
                    <ActionButtons>
                        <EditButton onClick={handleStartEditing}>
                            <FiEdit2 />
                        </EditButton>
                        <DeleteButton onClick={handleDelete}>
                            <FiTrash2 />
                        </DeleteButton>
                    </ActionButtons>
                )}
            </HeaderBar>

            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <MainCard>
                    <ImageSection>
                        <MainImage>
                            {previews.length > 0 ? (
                                <img 
                                    src={previews[selectedImage] || previews[0]} 
                                    alt="Produto" 
                                    onError={(e) => {
                                        if (previews.length > 0) {
                                            e.target.src = previews[0];
                                            setSelectedImage(0);
                                        }
                                    }}
                                />
                            ) : (
                                <div className="placeholder"><FiImage size={40}/></div>
                            )}

                            {isEditing && previews.length > 0 && (
                                <DeleteImageButton
                                    type="button"
                                    onClick={() => {
                                        removeImage(previews[selectedImage] || previews[0]);
                                        setSelectedImage(0);
                                    }}
                                >
                                    <FiTrash2 size={16} />
                                </DeleteImageButton>
                            )}
                        </MainImage>

                        <ThumbnailList>
                            {previews.map((photo, index) => (
                                <Thumbnail 
                                    key={index} 
                                    $active={selectedImage === index}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={photo} alt={`Thumb ${index}`} />
                                </Thumbnail>
                            ))}

                            {isEditing && (
                                <AddImageBox>
                                    <FiPlus size={24} />
                                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                                </AddImageBox>
                            )}
                        </ThumbnailList>
                    </ImageSection>

                    <InfoSection>
                        {isEditing ? (
                            <>
                                <FormGrid>
                                    <FormGroup>
                                        <Label>Nome</Label>
                                        <Input {...register("name")} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Categoria</Label>
                                        <Select {...register("categoryId")}>
                                            <option value="">Selecione...</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </Select>
                                    </FormGroup>
                                </FormGrid>

                                <FormGrid>
                                    <FormGroup>
                                        <Label>Preço (R$)</Label>
                                        <Input type="number" step="0.01" {...register("price")} />
                                    </FormGroup>

                                    {!hasVariations && (
                                        <FormGroup>
                                            <Label>Estoque</Label>
                                            <Input type="number" {...register("simpleStock")} />
                                        </FormGroup>
                                    )}
                                </FormGrid>

                                <FormGroup>
                                    <Label>Descrição</Label>
                                    <TextArea rows={5} {...register("description")} />
                                </FormGroup>

                                <SwitchRow>
                                    <Label $noMargin>Disponível na loja?</Label>
                                    <Controller
                                        name="isAvailable"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch checked={field.value} onChange={field.onChange} />
                                        )}
                                    />
                                </SwitchRow>
                            </>
                        ) : (
                            <>
                                <div className="rating">
                                    {[1,2,3,4,5].map(n => <FiStar key={n} color="#E5E7EB" fill="#E5E7EB" />)}
                                    <span>{reviews.length} avaliações</span>
                                </div>

                                <div className="info-block">
                                    <label>Preço Base</label>
                                    <PriceTag>{formatCurrency(product.price)}</PriceTag>
                                </div>

                                <div className="info-block">
                                    <label>Estoque Total</label>
                                    <StockInfo>{product.quantity || 0} unidades</StockInfo>
                                </div>

                                <div className="info-block">
                                    <label>Categoria</label>
                                    <p>{categoryName}</p>
                                </div>
                                
                                <div className="info-block">
                                    <label>Descrição</label>
                                    <p className="description">{product.description || "Sem descrição."}</p>
                                </div>

                                <AvailabilityBadge $available={product.is_available}>
                                    {product.is_available ? <FiCheckSquare /> : <FiSquare />}
                                    {product.is_available ? "Disponível para venda" : "Indisponível"}
                                </AvailabilityBadge>
                            </>
                        )}
                    </InfoSection>
                </MainCard>

                <Section>
                    <SectionHeaderFlex>
                        <SectionTitle style={{ margin: 0, border: 'none', padding: 0 }}>Variações do Produto</SectionTitle>
                        {isEditing && (
                            <VariationHeaderContainer>
                                <VariationLabel>Tem variações?</VariationLabel>
                                <Controller
                                    name="hasVariations"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onChange={field.onChange} />
                                    )}
                                />
                            </VariationHeaderContainer>
                        )}
                    </SectionHeaderFlex>

                    {(variationsData.length > 0 || (isEditing && hasVariations)) && (
                        <VariationsWrapper>
                             {isEditing && hasVariations ? (
                                 <>
                                    {variationsData.length > 0 ? (
                                        <VariationsTable>
                                            <thead>
                                                <tr>
                                                    <th>Tamanho</th>
                                                    <th>Cor</th>
                                                    <th>Estoque</th>
                                                    <th>Preço</th>
                                                    {isEditing && <th style={{textAlign:'right'}}>Ações</th>}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {variationsData.map((v, idx) => (
                                                    <tr key={v.id || idx}>
                                                        <td>{v.tamanho}</td>
                                                        <td>{v.cor}</td>
                                                        <td>{v.stock ?? v.quantity}</td>
                                                        <td>{v.price ? formatCurrency(v.price) : '—'}</td>
                                                        {isEditing && (
                                                            <td className="actions">
                                                                <RemoveVarButton type="button" onClick={() => handleRemoveVariation(idx)}>
                                                                    <FiTrash2 size={16} />
                                                                </RemoveVarButton>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </VariationsTable>
                                    ) : (
                                        <EmptyState>Nenhuma variação adicionada.</EmptyState>
                                    )}
                                 </>
                             ) : (
                                 variationsData.length > 0 ? (
                                    <VariationsTable>
                                        <thead>
                                            <tr>
                                                <th>Tamanho</th>
                                                <th>Cor</th>
                                                <th>Estoque</th>
                                                <th>Preço</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {variationsData.map(v => (
                                                <tr key={v.id}>
                                                    <td>{v.tamanho}</td>
                                                    <td>{v.cor}</td>
                                                    <td>{v.stock ?? v.quantity}</td>
                                                    <td>{v.price ? formatCurrency(v.price) : '—'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </VariationsTable>
                                 ) : (
                                    <EmptyState>Este produto não possui variações.</EmptyState>
                                 )
                             )}

                            {isEditing && hasVariations && (
                                <AddVariationBtn type="button" onClick={() => setIsVariationModalOpen(true)}>
                                    <FiPlus /> Adicionar Variação
                                </AddVariationBtn>
                            )}
                        </VariationsWrapper>
                    )}
                </Section>

                {!isEditing && (
                    <Section>
                        <SectionTitle>Avaliações dos Clientes</SectionTitle>
                        {reviews.length > 0 ? (
                            <ReviewContainer>
                                {reviews.map(r => (
                                    <ReviewItem key={r.id}>
                                        <ReviewHeader>
                                            <strong>{r.user_name || "Cliente"}</strong>
                                            <div className="stars">
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <FiStar
                                                        key={index}
                                                        fill={index < (r.rating || 0) ? "#F59E0B" : "none"}
                                                        color={index < (r.rating || 0) ? "#F59E0B" : "#D1D5DB"}
                                                        size={14}
                                                    />
                                                ))}
                                            </div>
                                        </ReviewHeader>
                                        
                                        {/* Renderiza o Título se existir */}
                                        {r.title && <span className="review-title">{r.title}</span>}
                                        
                                        {/* Renderiza o Texto (campo 'text' no banco) */}
                                        <p>{r.text || r.comment || "—"}</p>
                                    </ReviewItem>
                                ))}
                            </ReviewContainer>
                        ) : (
                            <EmptyState>Nenhuma avaliação ainda.</EmptyState>
                        )}
                    </Section>
                )}

                {isEditing && (
                    <BottomActions>
                        <CancelButton type="button" onClick={() => setIsEditing(false)}>
                            Cancelar
                        </CancelButton>
                        <SaveButton type="submit" disabled={isSubmitting}>
                            <FiSave />
                            {isSubmitting ? "Salvar Produto" : "Salvar Produto"}
                        </SaveButton>
                    </BottomActions>
                )}
            </form>

            <AddVariationModal 
                isOpen={isVariationModalOpen} 
                onClose={() => setIsVariationModalOpen(false)}
                onSubmit={handleAddVariation}
            />
        </PageContainer>
    );
}