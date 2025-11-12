import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { 
    FiSave, FiChevronLeft, FiPlus, FiImage, FiTrash2, FiX 
} from "react-icons/fi";

import { Header } from "../../components/Header";
import { Brand } from "../../components/Brand";
import { Menu } from "../../components/Menu";
import { Loading } from '../../components/Loading'; 
import { useMenu } from "../../contexts/MenuContext";
import { AddVariationModal } from '../../components/AddVariationModal';

import { CategoryApi } from '../../services/categoryApi';
import { ProductApi } from '../../services/productApi';
import { StorageApi } from '../../services/storageApi';

// 4. IMPORTAR OS NOVOS ESTILOS
import * as S from "./styles"; 

export function NewProduct() {
    const navigate = useNavigate();
    const { isMenuOpen } = useMenu();
    
    const fileInputRef = useRef(null);

    // Estados
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [price, setPrice] = useState(0);
    
    const [variations, setVariations] = useState([]); 
    const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
    
    const [loading, setLoading] = useState(false); 
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); 

    const [images, setImages] = useState([]); 

    useEffect(() => {
        async function loadCategories() {
            try {
                const list = await CategoryApi.list({ limit: 200 }); 
                setCategories(list);
            } catch (err) {
                toast.error("Erro ao carregar as categorias.");
            }
        }
        loadCategories();
    }, []); 


    // Chamado quando o usuário seleciona os arquivos
    const handleImageSelect = (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        // Cria o preview
        const newImages = files.map(file => ({
            id: `temp-${Math.random()}`, 
            file: file,
            previewUrl: URL.createObjectURL(file)
        }));

        setImages(prev => [...prev, ...newImages]);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleDeleteImage = (id) => {
        const imageToRemove = images.find(img => img.id === id);
        if (imageToRemove) {
            URL.revokeObjectURL(imageToRemove.previewUrl);
        }
        setImages(prev => prev.filter(img => img.id !== id));
    };

    // função para salvar
    const handleSave = async () => {
    // Validação
    if (!name || !description || !selectedCategory) {
        return toast.warn("Preencha Nome, Descrição e Categoria.");
    }
    if (variations.length === 0) {
        return toast.warn("Adicione pelo menos uma variação ao produto.");
    }
    if (images.length === 0) {
        return toast.warn("Adicione pelo menos uma imagem ao produto.");
    }

    setLoading(true);
    try {
        const uploadedImageUrls = [];
        
        for (const image of images) {
            // Limpando o nome de arquivos
            const sanitizedFileName = image.file.name
                .normalize("NFD")                       // remove acentos
                .replace(/[\u0300-\u036f]/g, "")        // remove marcas de acentuação
                .replace(/[^a-zA-Z0-9._-]/g, "_")       // mantém apenas letras, números, ., _, -
                .toLowerCase();                         // deixa tudo minúsculo

            const filePath = `public/${Date.now()}-${sanitizedFileName}`;
            
            const publicUrl = await StorageApi.uploadImage(image.file, filePath);
            uploadedImageUrls.push(publicUrl);
        }

        await ProductApi.create({
            name: name,
            description: description,
            price: price,
            isAvailable: isAvailable,
            categoryId: selectedCategory, 
            variations: variations,
            photos: uploadedImageUrls
        });

        toast.success("Produto salvo com sucesso!");
        navigate("/products"); 

    } catch (err) {
        console.error("Erro ao salvar produto:", err);
        toast.error("Erro ao salvar produto: " + err.message);
        setLoading(false); 
    }
};


    // Funções para lidar com as variações
    const handleAddVariation = (newVariationPayload) => {
        setVariations(prev => [...prev, newVariationPayload]);
    };
    const handleDeleteVariation = (id) => {
        setVariations(prev => prev.filter(v => v.id !== id));
    };

    return (
        <S.Container $isopen={isMenuOpen}>
            {(loading) && <Loading />}

            <input 
                type="file"
                accept="image/png, image/jpeg"
                multiple
                ref={fileInputRef}
                onChange={handleImageSelect}
                style={{ display: 'none' }}
            />

            <Brand />
            <Header />
            <Menu />

            <S.PageWrapper>
                <S.HeaderBar>
                    <S.Title>
                        <S.BackLink onClick={() => navigate("/products")}>
                            <FiChevronLeft />
                        </S.BackLink>
                        Adicionar Novo Produto
                    </S.Title>
                    <S.SaveButton onClick={handleSave} disabled={loading}>
                        <FiSave /> Salvar Produto
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

                                <p style={{textAlign: 'center', color: '#6B7280', fontSize: '14px', margin: 0}}>
                                    Clique no + para adicionar imagens do produto
                                </p>
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

                            <S.CheckboxWrapper>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={isAvailable}
                                        onChange={e => setIsAvailable(e.target.checked)}
                                    />
                                    Produto disponível
                                </label>
                                <span>Estoque total: 0 unidades</span>
                            </S.CheckboxWrapper>

                            <S.FormGroup>
                                <label>Preço *</label>
                                <S.Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Ex: 199.90"
                                    value={price}
                                    onChange={e => setPrice(parseFloat(e.target.value) || 0)}
                                />
                            </S.FormGroup>

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

                <S.Section>
                    <S.SectionHeader>
                        <h2>Variações do Produto</h2>
                        <S.AddVariationButton onClick={() => setIsVariationModalOpen(true)}>
                            <FiPlus /> Adicionar Variação
                        </S.AddVariationButton>
                    </S.SectionHeader>
                    <p>Adicione os tamanhos, cores e preços disponíveis</p>

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
                                            {v.preco.toLocaleString('pt-BR', { 
                                                style: 'currency', 
                                                currency: 'BRL' 
                                            })}
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
                </S.Section>

            </S.PageWrapper>

            <AddVariationModal
                isOpen={isVariationModalOpen}
                onClose={() => setIsVariationModalOpen(false)}
                onSubmit={handleAddVariation}
            />
        </S.Container>
    );
}