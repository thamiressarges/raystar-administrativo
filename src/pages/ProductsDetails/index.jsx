import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiEdit2, FiTrash2, FiSave, FiX, FiPlus, FiChevronLeft, FiStar
} from "react-icons/fi";

import { Loading } from '../../components/Loading';
import { ConfirmModal } from '../../components/ConfirmModal';

import { ProductApi } from '../../services/productApi';
import { StorageApi } from '../../services/storageApi';

import { Switch } from "../../components/Switch";
import { theme } from "../../styles/theme";

import * as S from "./styles";

export function ProductsDetails() {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const [product, setProduct] = useState(null);
  const [variations, setVariations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedIsAvailable, setEditedIsAvailable] = useState(true);
  const [editedPrice, setEditedPrice] = useState(null);
  const [editedPhotos, setEditedPhotos] = useState([]);
  const [editedVariations, setEditedVariations] = useState([]);

  const [hasVariations, setHasVariations] = useState(true);
  const [simpleProductStock, setSimpleProductStock] = useState(0);

  async function loadDetails() {
    try {
      setLoadingPage(true);
      const data = await ProductApi.getDetails({ productId });

      if (!data?.product?.id) throw new Error("Produto não encontrado.");

      setProduct(data.product);

      const serverVariations = data.variations || [];
      setVariations(serverVariations);
      setEditedVariations(serverVariations.map(v => ({ ...v })));

      setReviews(data.reviews || []);

      const photos = data.product.photos || [];
      setEditedPhotos(photos);
      setActiveImage(photos[0] ?? "https://i.imgur.com/gBwB3t3.jpeg");

      setEditedName(data.product.title);
      setEditedDescription(data.product.description);
      setEditedIsAvailable(Boolean(data.product.is_available));
      setEditedPrice(data.product.price ?? 0);
      setSimpleProductStock(data.product.quantity ?? 0);

      setHasVariations(serverVariations.length > 0);
    } catch (err) {
      toast.error("Erro ao carregar produto.");
      navigate("/products");
    } finally {
      setLoadingPage(false);
    }
  }

  useEffect(() => {
    loadDetails();
  }, [productId]);

  const handleEdit = () => {
    if (!product) return;

    setIsEditing(true);
    setEditedName(product.title);
    setEditedDescription(product.description);
    setEditedIsAvailable(Boolean(product.is_available));
    setEditedPrice(product.price ?? 0);
    setEditedPhotos(product.photos || []);
    setEditedVariations(variations.map(v => ({ ...v })));
    setSimpleProductStock(product.quantity ?? 0);
    setHasVariations(variations.length > 0);
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadDetails();
  };

  const handleSave = async () => {
    if (!product) return;
    setLoading(true);

    try {
        const priceValue = Number(editedPrice);
        if (isNaN(priceValue) || priceValue < 0) {
            toast.error("Preço base inválido. Por favor, insira um número válido e positivo.");
            setLoading(false);
            return;
        }

      const productUpdates = {
        title: editedName,
        description: editedDescription,
        is_available: editedIsAvailable,
        photos: editedPhotos,
        price: priceValue
      };

      if (!hasVariations) {
        productUpdates.quantity = Number(simpleProductStock) || 0;
      }

      await ProductApi.update({
        productId: product.id,
        updates: productUpdates
      });

      if (hasVariations) {
        const variationsToSave = editedVariations.map(v => ({
            ...v,
            quantity: Number(v.quantity ?? v.estoque ?? 0),
            price: Number(v.price ?? v.preco ?? 0),
            id: String(v.id).startsWith("new-") ? undefined : v.id
        }));

        await ProductApi.syncVariations({
            productId: product.id,
            variations: variationsToSave
        });

      } else {
        await ProductApi.syncVariations({
            productId: product.id,
            variations: [] 
        });

        await ProductApi.update({
            productId: product.id,
            updates: {
                quantity: Number(simpleProductStock) || 0
            }
        });
      }

      toast.success("Salvo!");
      setIsEditing(false);
      loadDetails();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    toast.warn(({ closeToast }) => (
      <ConfirmModal
        closeToast={closeToast}
        onConfirm={async () => {
          await ProductApi.delete({ productId: product.id });
          toast.success("Excluído!");
          navigate("/products");
        }}
        message={`Excluir "${product.title}"?`}
        confirmText="Excluir"
      />
    ), { autoClose: false });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${productId}-${Date.now()}.${ext}`;
      const filePath = `public/${fileName}`;

      const publicUrl = await StorageApi.uploadImage(file, filePath);
      setEditedPhotos(prev => [...prev, publicUrl]);
      setActiveImage(publicUrl);

      toast.success("Imagem adicionada!");
    } catch {
      toast.error("Erro ao enviar imagem.");
    } finally {
      setLoading(false);
      event.target.value = null;
    }
  };

  const handleAddVariationRow = () => {
    setEditedVariations(prev => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        tamanho: "",
        cor: "",
        quantity: "",
        price: "",
        product_id: productId
      }
    ]);
  };

  const handleVariationChange = (id, field, value) => {
    setEditedVariations(prev =>
      prev.map(v => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0) / reviews.length
    : 0;

  if (loadingPage || !product) {
    return <Loading />;
  }

  return (
    <S.Container>
      {loading && <Loading />}

      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

        <S.HeaderBar>
          <S.Title>
            <FiChevronLeft onClick={() => navigate("/products")} style={{ cursor: "pointer" }} />
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
                <FiEdit2 />
              </S.EditButton>
              <S.DeleteButton onClick={handleDelete}>
                <FiTrash2 />
              </S.DeleteButton>
            </S.HeaderButtons>
          )}
        </S.HeaderBar>

        <S.ProductOverview>
          <S.ImageGalleryWrapper>
            <S.MainImageWrapper>
              {isEditing && editedPhotos.includes(activeImage) && (
                <S.DeleteImageButton onClick={() =>
                  setEditedPhotos(prev => prev.filter(p => p !== activeImage))
                }>
                  <FiTrash2 size={18} />
                </S.DeleteImageButton>
              )}
              <img src={activeImage} alt="Produto" />
            </S.MainImageWrapper>

            <S.ThumbnailList>
              {editedPhotos.map((url, idx) => (
                <S.Thumbnail
                  key={idx}
                  className={activeImage === url ? "active" : ""}
                  onClick={() => setActiveImage(url)}
                >
                  <img src={url} alt="" />
                </S.Thumbnail>
              ))}

              {isEditing && (
                <S.AddThumbnailButton onClick={() => fileInputRef.current.click()}>
                  <FiPlus />
                </S.AddThumbnailButton>
              )}
            </S.ThumbnailList>
          </S.ImageGalleryWrapper>

          <S.InfoProductWrapper>
            {isEditing && (
              <S.InfoInput
                value={editedName}
                placeholder="Nome do produto"
                onChange={(e) => setEditedName(e.target.value)}
              />
            )}

            <S.InfoGroup>
              <S.ReviewStars>
                {[...Array(5)].map((_, i) => {
                  const isFilled = i < Math.round(averageRating);
                  return (
                    <FiStar
                      key={i}
                      fill={isFilled ? theme.COLORS.WARNING : theme.COLORS.WHITE}
                      color={isFilled ? theme.COLORS.WARNING : theme.COLORS.GRAY_400}
                    />
                  );
                })}
                <span>{reviews.length} avaliações</span>
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
                    onChange={(e) => setEditedPrice(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <label>Preço Base</label>
                  <S.DescriptionText style={{ fontSize: 24, fontWeight: 700 }}>
                    {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </S.DescriptionText>
                </>
              )}
            </S.InfoGroup>

            {!hasVariations && (
              <S.InfoGroup>
                {isEditing ? (
                  <>
                    <label>Estoque Total (Unid.)</label>
                    <S.TableInput
                      type="number"
                      value={simpleProductStock}
                      onChange={(e) => setSimpleProductStock(Number(e.target.value || 0))}
                    />
                  </>
                ) : (
                  <>
                    <label>Estoque Total</label>
                    <S.DescriptionText style={{ fontWeight: 600 }}>
                      {simpleProductStock} unidades
                    </S.DescriptionText>
                  </>
                )}
              </S.InfoGroup>
            )}

            <S.InfoGroup>
              {isEditing ? (
                <>
                  <label>Descrição</label>
                  <S.DescriptionTextarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                </>
              ) : (
                <S.DescriptionText>{product.description}</S.DescriptionText>
              )}
            </S.InfoGroup>

            <S.InfoGroup>
              <S.AvailabilityRow>
                <label>
                  <S.BlackCheckbox
                    checked={editedIsAvailable}
                    disabled={!isEditing}
                    onChange={(e) => setEditedIsAvailable(e.target.checked)}
                  />
                  Disponível para venda
                </label>
              </S.AvailabilityRow>
            </S.InfoGroup>
          </S.InfoProductWrapper>
        </S.ProductOverview>

        <S.Section>
          <S.SectionHeader>
            <h2>Variações do Produto</h2>

            {isEditing && (
              <Switch
                checked={hasVariations}
                onChange={(value) => setHasVariations(value)}
              />
            )}
          </S.SectionHeader>

          <S.VariationsTable>
            <thead>
                {hasVariations && isEditing && (
                    <tr>
                    <th>Tamanho</th>
                    <th>Cor</th>
                    <th>Estoque</th>
                    <th>Preço</th>
                    <th>Ações</th>
                    </tr>
                )}
                </thead>
            <tbody>
              {(!hasVariations || editedVariations.length === 0) && (
                <tr>
                  <td
                    colSpan={isEditing ? 5 : 4}
                    style={{
                      padding: "22px 0",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: theme.COLORS.GRAY_600
                    }}
                  >
                    Este produto não possui variações.
                  </td>
                </tr>
              )}

              {hasVariations && editedVariations.length > 0 && editedVariations.map(v => (
                <tr key={v.id}>
                  <td>
                    {isEditing ? (
                      <S.TableInput
                        value={v.tamanho || ""}
                        onChange={e => handleVariationChange(v.id, "tamanho", e.target.value)}
                      />
                    ) : v.tamanho}
                  </td>

                  <td>
                    {isEditing ? (
                      <S.TableInput
                        value={v.cor || ""}
                        onChange={e => handleVariationChange(v.id, "cor", e.target.value)}
                      />
                    ) : v.cor}
                  </td>

                  <td>
                    {isEditing ? (
                      <S.TableInput
                        type="number"
                        value={v.quantity ?? 0}
                        onChange={e => handleVariationChange(v.id, "quantity", e.target.value)}
                      />
                    ) : v.quantity}
                  </td>

                  <td>
                    {isEditing ? (
                      <S.TableInput
                        type="number"
                        step="0.01"
                        value={v.price ?? 0}
                        onChange={e => handleVariationChange(v.id, "price", e.target.value)}
                      />
                    ) : `R$ ${Number(v.price ?? 0).toFixed(2)}`}
                  </td>

                  {isEditing && (
                    <td>
                      <S.DeleteVariationButton
                        onClick={() =>
                          setEditedVariations(prev => prev.filter(item => item.id !== v.id))
                        }
                      >
                        <FiTrash2 size={18} />
                      </S.DeleteVariationButton>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </S.VariationsTable>

          {hasVariations && isEditing && (
            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
              <S.AddVariationButton onClick={handleAddVariationRow}>
                <FiPlus /> Adicionar Variação
              </S.AddVariationButton>
            </div>
          )}
        </S.Section>

        <S.Section>
          <h2>Avaliações dos Clientes</h2>
          <S.ReviewList>
            {reviews.length > 0 ? reviews.map(r => (
              <S.ReviewItem key={r.id}>
                <S.ReviewHeader>
                  <div>
                    <h3>{r.client_name || "Anônimo"}</h3>
                    <span>{new Date(r.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <S.ReviewStars>
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} fill={i < r.rating ? theme.COLORS.WARNING : theme.COLORS.GRAY_200} />
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

    </S.Container>
  );
}