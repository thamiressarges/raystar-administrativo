import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    FiEdit2, FiTrash2, FiSave, FiX, FiPlus, FiChevronLeft, FiStar
} from "react-icons/fi";

import { Header } from "../../components/Header";
import { Brand } from "../../components/Brand";
import { Menu } from "../../components/Menu";
import { Loading } from '../../components/Loading';
import { ConfirmModal } from '../../components/ConfirmModal';
import { useMenu } from "../../contexts/MenuContext";

import { ProductApi } from '../../services/productApi';
import { StorageApi } from '../../services/storageApi';

import * as S from "./styles";

export function ProductsDetails() {
    const navigate = useNavigate();
    const { id: productId } = useParams();
    const { isMenuOpen } = useMenu();
    const fileInputRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);

    // Estados 
    const [product, setProduct] = useState(null);
    const [variations, setVariations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [activeImage, setActiveImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);

    // Estados de edição
    const [editedName, setEditedName] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedIsAvailable, setEditedIsAvailable] = useState(true);
    const [editedPrice, setEditedPrice] = useState(0); 
    const [editedPhotos, setEditedPhotos] = useState([]);
    const [editedVariations, setEditedVariations] = useState([]);

    async function loadDetails() {
        if (!productId) {
            toast.error("ID do produto inválido.");
            navigate("/products");
            return;
        }
        try {
            setLoadingPage(true);
            const data = await ProductApi.getDetails({ productId });

            if (!data.product || !data.product.id) {
                throw new Error("Produto não encontrado.");
            }

            setProduct(data.product);
            setVariations(data.variations);
            setReviews(data.reviews);
            const photos = data.product.photos || [];
            setActiveImage(photos.length > 0 ? photos[0] : "https://i.imgur.com/gBwB3t3.jpeg");

            setEditedName(data.product.title);
            setEditedDescription(data.product.description);
            setEditedIsAvailable(data.product.is_available);
            setEditedPrice(data.product.price || 0); 
            setEditedPhotos(photos);
            setEditedVariations(data.variations);

        } catch (err) {
            console.error("Erro ao carregar detalhes:", err);
            toast.error("Erro ao carregar produto: " + err.message);
            navigate("/products");
        } finally {
            setLoadingPage(false);
        }
    }

    useEffect(() => {
        loadDetails();
    }, [productId]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedName(product.title);
        setEditedDescription(product.description);
        setEditedIsAvailable(product.is_available);
        setEditedPrice(product.price || 0);
        setEditedPhotos(product.photos || []);
        setEditedVariations(variations);
    };

    const handleCancel = () => {
        setIsEditing(false);
        if(product) {
            setEditedName(product.title);
            setEditedDescription(product.description);
            setEditedIsAvailable(product.is_available);
            setEditedPrice(product.price || 0);
            setEditedPhotos(product.photos || []);
            setEditedVariations(variations);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const productUpdates = {
                title: editedName,
                description: editedDescription,
                is_available: editedIsAvailable,
                photos: editedPhotos,
                price: editedPrice === '' ? 0 : editedPrice 
            };

            await ProductApi.update({
                productId: product.id,
                updates: productUpdates
            });

            const variationsToSave = editedVariations.map(v => ({
                ...v,
                quantity: v.quantity === '' ? 0 : v.quantity,
                price: v.price === '' ? 0 : v.price
            }));
            
            await ProductApi.syncVariations({
                productId: product.id,
                variations: variationsToSave 
            });

            setIsEditing(false);
            setLoading(false);
            toast.success("Produto e variações salvos!");

            await loadDetails();

        } catch (err) {
            console.error("Erro ao salvar:", err);
            toast.error("Erro ao salvar produto: " + err.message);
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            await ProductApi.delete({ productId: product.id });
            toast.success("Produto excluído com sucesso!");
            navigate("/products");
        } catch (err) {
            console.error("Erro ao excluir:", err);
            toast.error("Erro ao excluir produto: " + err.message);
            setLoading(false);
        }
    };

    const handleDelete = () => {
        toast.warn(
            ({ closeToast }) => (
                <ConfirmModal
                    closeToast={closeToast}
                    onConfirm={confirmDelete}
                    message={`Excluir o produto "${product.title}"?`}
                    confirmText="Excluir"
                />
            ),
            { autoClose: false, closeOnClick: false, theme: "light", style: { background: "#fff", color: "#333" } }
        );
    };

    const handleTriggerFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        toast.info("Fazendo upload da imagem...");
        setLoading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${productId}-${new Date().getTime()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const publicUrl = await StorageApi.uploadImage(file, filePath);

            setEditedPhotos(prevPhotos => [...prevPhotos, publicUrl]);
            setActiveImage(publicUrl);

            toast.success("Imagem adicionada!");
        } catch (err) {
            console.error("Erro no upload:", err);
            toast.error("Erro ao enviar imagem: " + err.message);
        } finally {
            setLoading(false);
            event.target.value = null;
        }
    };

    const handleImageDelete = (urlToDelete) => {
        if (!urlToDelete) return;

        const newPhotos = editedPhotos.filter(url => url !== urlToDelete);
        setEditedPhotos(newPhotos);
        const newActive = newPhotos.length > 0 ? newPhotos[0] : "https://i.imgur.com/gBwB3t3.jpeg";
        setActiveImage(newActive);

        toast.info("Imagem removida (será salvo ao clicar em 'Salvar')");
    };

    const handleVariationChange = (id, field, value) => {
        // Permite que o valor seja um string vazio '' temporariamente
        const typedValue = (field === 'quantity' || field === 'price')
            ? (value === '' ? '' : parseFloat(value)) 
            : value;

        setEditedVariations(prev =>
            prev.map(v => (v.id === id ? { ...v, [field]: typedValue } : v))
        );
    };

    const handleAddVariationRow = () => {
        const newVariation = {
            id: `new-${Date.now()}`,
            name: '',
            code: '',
            quantity: '',
            price: '',
            product_id: productId
        };
        setEditedVariations(prev => [...prev, newVariation]);
    };

    const handleDeleteVariationRow = (idToDelete) => {
        setEditedVariations(prev => prev.filter(v => v.id !== idToDelete));
        toast.info("Variação removida (será salvo ao clicar em 'Salvar')");
    };

    if (loadingPage || !product) {
        return (
            <S.Container $isopen={isMenuOpen}>
                {(loading || loadingPage) && <Loading />}
                <Brand />
                <Header />
                <Menu />
                <S.PageWrapper>
                </S.PageWrapper>
            </S.Container>
        );
    }

    return (
        <S.Container $isopen={isMenuOpen}>
            {(loading || loadingPage) && <Loading />}

            <input
                type="file"
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: 'none' }}
            />

            <Brand />
            <Header />
            <Menu />

            <S.PageWrapper>
                <S.HeaderBar>
                    <S.Title>
                        <FiChevronLeft
                            onClick={() => navigate("/products")}
                            style={{ cursor: 'pointer' }}
                        />
                        {isEditing ? "Editando Produto" : product.title}
                    </S.Title>

                    {isEditing ? (
                        <S.HeaderButtons>
                            <S.CancelButton onClick={handleCancel}>
                                <FiX /> Cancelar
                            </S.CancelButton>
                            <S.SaveButton onClick={handleSave}>
                                <FiSave /> Salvar
                            </S.SaveButton>
                        </S.HeaderButtons>
                    ) : (
                        <S.HeaderButtons>
                            <S.EditButton onClick={handleEdit}>
                                <FiEdit2 /> Editar
                            </S.EditButton>
                            <S.DeleteButton onClick={handleDelete}>
                                <FiTrash2 /> Excluir
                            </S.DeleteButton>
                        </S.HeaderButtons>
                    )}
                </S.HeaderBar>

                <S.ProductOverview>
                    <S.ImageGalleryWrapper>
                        <S.MainImageWrapper>
                            {isEditing && editedPhotos.includes(activeImage) && (
                                <S.DeleteImageButton
                                    onClick={() => handleImageDelete(activeImage)}
                                    title="Remover imagem ativa"
                                >
                                    <FiTrash2 size={18} />
                                </S.DeleteImageButton>
                            )}
                            <img src={activeImage} alt="Produto" />
                        </S.MainImageWrapper>
                        <S.ThumbnailList>
                            {editedPhotos.map((imgUrl, index) => (
                                <S.Thumbnail
                                    key={index}
                                    onClick={() => setActiveImage(imgUrl)}
                                    className={activeImage === imgUrl ? 'active' : ''}
                                >
                                    <img src={imgUrl} alt="Thumbnail" />
                                </S.Thumbnail>
                            ))}
                            {isEditing && (
                                <S.AddThumbnailButton onClick={handleTriggerFileUpload}>
                                    <FiPlus size={24} />
                                </S.AddThumbnailButton>
                            )}
                        </S.ThumbnailList>
                    </S.ImageGalleryWrapper>

                    <S.InfoProductWrapper>
                        {isEditing ? (
                            <S.InfoInput
                                type="text"
                                value={editedName}
                                onChange={e => setEditedName(e.target.value)}
                            />
                        ) : null}

                        <S.InfoGroup>
                            <S.ReviewStars>
                                <FiStar fill="#F59E0B" />
                                <FiStar fill="#F59E0B" />
                                <FiStar fill="#F59E0B" />
                                <FiStar fill="#F59E0B" />
                                <FiStar fill="#E5E7EB" />
                                <span>4.7 ({reviews.length} avaliações)</span>
                            </S.ReviewStars>
                        </S.InfoGroup>

                        <S.InfoGroup>
                            {isEditing ? (
                                <>
                                    <label>Preço Base (R$)</label>
                                    <S.TableInput
                                        type="number"
                                        step="0.01"
                                        value={editedPrice}
                                        onChange={e => setEditedPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    />
                                </>
                            ) : (
                                <>
                                    <label>Preço Base</label>
                                    <S.DescriptionText style={{ fontSize: '24px', fontWeight: '700', color: '#111' }}>
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(product.price || 0)}
                                    </S.DescriptionText>
                                </>
                            )}
                        </S.InfoGroup>

                        <S.InfoGroup>
                            {isEditing ? (
                                <>
                                    <label>Descrição</label>
                                    <S.DescriptionTextarea
                                        value={editedDescription}
                                        onChange={e => setEditedDescription(e.target.value)}
                                    />
                                </>
                            ) : (
                                <S.DescriptionText>{product.description}</S.DescriptionText>
                            )}
                        </S.InfoGroup>

                        <S.InfoGroup>
                            <S.AvailabilityRow>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={editedIsAvailable}
                                        disabled={!isEditing}
                                        onChange={e => setEditedIsAvailable(e.target.checked)}
                                    />
                                    Disponível
                                </label>
                            </S.AvailabilityRow>
                        </S.InfoGroup>

                    </S.InfoProductWrapper>
                </S.ProductOverview>

                <S.Section>
                    <S.SectionHeader>
                        <h2>Variações do Produto</h2>
                        {isEditing && (
                            <S.AddVariationButton onClick={handleAddVariationRow}>
                                <FiPlus /> Adicionar Variação
                            </S.AddVariationButton>
                        )}
                    </S.SectionHeader>

                    <S.VariationsTable>
                        <thead>
                            <tr>
                                <th>Tamanho</th>
                                <th>Cor</th>
                                <th>Estoque</th>
                                <th>Preço</th>
                                {isEditing && <th>Ações</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {editedVariations.map(v => (
                                <tr key={v.id}>
                                    <td>
                                        {isEditing ? (
                                            <S.TableInput
                                                value={v.name}
                                                onChange={e => handleVariationChange(v.id, 'name', e.target.value)}
                                            />
                                        ) : (
                                            v.name
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <S.TableInput
                                                value={v.code}
                                                onChange={e => handleVariationChange(v.id, 'code', e.target.value)}
                                            />
                                        ) : (
                                            v.code
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <S.TableInput
                                                type="number"
                                                value={v.quantity} 
                                                onChange={e => handleVariationChange(v.id, 'quantity', e.target.value)}
                                            />
                                        ) : (
                                            v.quantity
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <S.TableInput
                                                type="number"
                                                step="0.01"
                                                value={v.price} // O value agora pode ser ''
                                                onChange={e => handleVariationChange(v.id, 'price', e.target.value)}
                                            />
                                        ) : (
                                            `R$ ${v.price.toFixed(2)}`
                                        )}
                                    </td>
                                    {isEditing && (
                                        <td>
                                            <S.DeleteVariationButton onClick={() => handleDeleteVariationRow(v.id)}>
                                                <FiTrash2 size={18} />
                                            </S.DeleteVariationButton>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </S.VariationsTable>
                </S.Section>
                <S.Section>
                    <h2>Avaliações dos Clientes</h2>
                    <S.ReviewList>
                        {reviews.length > 0 ? reviews.map(r => (
                            <S.ReviewItem key={r.id}>
                                <S.ReviewHeader>
                                    <h3>{r.client_name || "Anônimo"}</h3>
                                    <span>{new Date(r.created_at).toLocaleDateString('pt-BR')}</span>
                                    <S.ReviewStars>
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar key={i} fill={i < r.rating ? '#F59E0B' : '#E5E7EB'} />
                                        ))}
                                    </S.ReviewStars>
                                </S.ReviewHeader>
                                <p>{r.text}</p>
                            </S.ReviewItem>
                        )) : (
                            <p>Nenhuma avaliação ainda.</p>
                        )}
                    </S.ReviewList>
                </S.Section>

            </S.PageWrapper>
        </S.Container>
    );
}