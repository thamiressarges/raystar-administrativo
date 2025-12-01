import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { FiChevronLeft, FiEdit2, FiBox, FiTrash2 } from "react-icons/fi";

import { CategoryApi } from "../../services/categoryApi";
import { CategoryModal } from "../../components/CategoryModel";
import { Loading } from '../../components/Loading';
import { ConfirmModal } from '../../components/ConfirmModal';

import {
    Container,
    PageContainer,
    HeaderBar,
    BackLink,
    Title,
    Section,
    SectionHeader,
    SectionTitle,
    InfoRow,
    StatusText,
    ScrollArea,
    ProductsTable,
    Tr,
    Td,
    ActionsRow,
    EditButton,
    DeleteButton,
} from "./styles";

export function CategoryDetails() {
    const navigate = useNavigate();
    const { id: categoryId } = useParams();

    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const loadDetails = useCallback(async () => {
        if (!categoryId || categoryId === "undefined") {
            toast.error("ID da categoria inválido!");
            navigate("/category");
            return;
        }
        try {
            setLoadingPage(true);
            const response = await CategoryApi.getDetails({ categoryId });
            const data = response.category || response; 
            
            if (!data || !data.id) throw new Error("Categoria não encontrada.");
            
            setCategory({
                ...data,
                quantity: data.products?.length || 0 
            });

        } catch (err) {
            console.error(err);
            toast.error("Erro ao carregar categoria.");
        } finally {
            setLoadingPage(false);
        }
    }, [categoryId, navigate]);

    useEffect(() => {
        loadDetails();
    }, [loadDetails]);

    const handleEdit = async (payload) => {
        if (!category) return;
        try {
            setLoading(true);
            await CategoryApi.update({
                categoryId: categoryId,
                ...payload
            });
            setIsEditOpen(false);
            await loadDetails();
            toast.success("Categoria atualizada com sucesso!");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao editar categoria.");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!category) return;
        
        try {
            setLoading(true);
            await CategoryApi.delete({ categoryId: category.id });
            toast.success(`Categoria deletada com sucesso!`);
            navigate("/category");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao deletar categoria.");
            setLoading(false);
        }
    };

    const handleDelete = () => {
        if (!category) return;

        const productCount = category.quantity || 0;
        const message = `Deletar "${category.name}"? Atenção: Isso pode afetar os ${productCount} produtos vinculados!`;

        toast.warn(
            ({ closeToast }) => (
                <ConfirmModal
                    closeToast={closeToast}
                    onConfirm={confirmDelete}
                    message={message}
                    confirmText="Sim, Deletar"
                />
            ),
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        );
    };

    return (
        <Container>
            {(loading || loadingPage) && <Loading />}

            <PageContainer>
                {!loadingPage && category ? (
                    <>
                        <HeaderBar>
                            <BackLink onClick={() => navigate("/category")}>
                                <FiChevronLeft /> Voltar
                            </BackLink>
                        </HeaderBar>
                        
                        <div style={{ marginBottom: 24 }}>
                            <Title>{category.name}</Title>
                        </div>

                        <Section>
                            <SectionHeader>
                                <SectionTitle>Configurações</SectionTitle>
                            </SectionHeader>
                            <InfoRow>
                                <label>Status atual:</label>
                               <StatusText $isActive={category.is_active}>
                                    {category.is_active ? 'Ativa' : 'Inativa'}
                                </StatusText>
                            </InfoRow>
                            <ActionsRow>
                                <EditButton onClick={() => setIsEditOpen(true)} disabled={loading}>
                                    <FiEdit2 /> Editar
                                </EditButton>
                                <DeleteButton onClick={handleDelete} disabled={loading}>
                                    <FiTrash2 /> Excluir
                                </DeleteButton>
                            </ActionsRow>
                        </Section>

                        <Section>
                            <SectionHeader>
                                <SectionTitle>Produtos Vinculados ({category.quantity})</SectionTitle>
                            </SectionHeader>
                            <ScrollArea>
                                <ProductsTable>
                                    <tbody>
                                        {category.products?.length > 0 ? (
                                            category.products.map((product) => (
                                                <Tr key={product.id}>
                                                    <Td style={{ width: 46 }}>
                                                        <FiBox size={20} color="#6B7280" />
                                                    </Td>
                                                    <Td>{product.title}</Td> 
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td colSpan={2} style={{ padding: 24, textAlign: "center", color: "#9CA3AF" }}>
                                                    Nenhum produto vinculado a esta categoria.
                                                </Td>
                                            </Tr>
                                        )}
                                    </tbody>
                                </ProductsTable>
                            </ScrollArea>
                        </Section>
                    </>
                ) : (
                    !loadingPage && <Title>Categoria não encontrada.</Title>
                )}

                {category && (
                    <CategoryModal
                        isOpen={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        type="edit"
                        data={category}
                        onSubmit={handleEdit}
                    />
                )}
            </PageContainer>
        </Container>
    );
}