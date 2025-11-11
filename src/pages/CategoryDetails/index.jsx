import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'; 

import { CategoryApi } from "../../services/categoryApi"; 
import { CategoryModal } from "../../components/CategoryModel"; 
import { Loading } from '../../components/Loading'; 
import { ConfirmModal } from '../../components/ConfirmModal';

import {
  Container,
  PageWrapper,
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
  DeleteButton
} from "./styles";

import { Header } from "../../components/Header";
import { Brand } from "../../components/Brand";
import { Menu } from "../../components/Menu";
import { useMenu } from "../../contexts/MenuContext";

import { FiChevronLeft, FiEdit2, FiBox, FiTrash2 } from "react-icons/fi";


export function CategoryDetails() {
    const navigate = useNavigate();
    const { id: categoryId } = useParams(); 
    const { isMenuOpen } = useMenu();

    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [loadingPage, setLoadingPage] = useState(true); 
    const [isEditOpen, setIsEditOpen] = useState(false);

    const storeId = "main"; 

    // Função para carregar detalhes
    async function loadDetails() {
        if (!categoryId || categoryId === "undefined") {
            toast.error("ID da categoria inválido!");
            navigate("/category");
            return;
        }
        try {
            setLoadingPage(true); 
            const response = await CategoryApi.getDetails({ categoryId: categoryId, storeId }); 
            const data = response.category;
            if (!data) throw new Error("Categoria não encontrada.");
            setCategory(data);
        } catch (err) {
            console.error("Erro ao carregar detalhes:", err);
            toast.error("Erro ao carregar categoria: " + err.message);
            navigate("/category");
        } finally {
            setLoadingPage(false); 
        }
    }

    useEffect(() => {
        loadDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);

    
    // Função para editar 
    const handleEdit = async (payload) => {
        if (!category) return;
        try {
            setLoading(true); 
            await CategoryApi.update({ 
                categoryId: categoryId, 
                storeId, 
                ...payload 
            });
            setIsEditOpen(false); 
            await loadDetails(); 
            toast.success("Categoria atualizada com sucesso!"); 
        } catch (err) {
            console.error("Erro ao editar categoria:", err);
            toast.error("Erro ao editar categoria: " + err.message); 
        } finally {
             setLoading(false); 
        }
    };

    // Função que confirma a deleção
    const confirmDelete = async () => {
      if (!category) return;
      try {
          setLoading(true);
          await CategoryApi.delete({ categoryId: category.id });
          toast.success(`Categoria "${category.name}" deletada com sucesso!`);
          navigate("/category"); 
      } catch (err) {
          console.error("Erro ao deletar categoria:", err);
          toast.error("Erro ao deletar: " + err.message); 
          setLoading(false); 
      }
    };

    // Função que chama o toast de deleção
    const handleDelete = () => {
        if (!category) return;

        toast.warn(
          ({ closeToast }) => (
            <ConfirmToast 
              closeToast={closeToast} 
              onConfirm={confirmDelete}
              message={`Deletar a categoria "${category.name}"?`}
              confirmText="Deletar"
            />
          ), 
          {
            autoClose: false, 
            closeOnClick: false, 
            draggable: false, 
            theme: "light", 
            style: { background: "#fff", color: "#333" }
          }
        );
    };

    return (
        <Container $isopen={isMenuOpen}>
            {(loading || loadingPage) && <Loading />}

            <Brand />
            <Header />
            <Menu />

            <PageWrapper>
                {!loadingPage && category ? (
                    <>
                        <HeaderBar>
                            <BackLink onClick={() => navigate("/category")}>
                                <FiChevronLeft />
                            </BackLink>
                            <Title>{category.name}</Title> 
                        </HeaderBar>

                        <Section>
                            <SectionHeader>
                                <SectionTitle>Configurações</SectionTitle>
                            </SectionHeader>
                            <InfoRow>
                                <label>Disponibilidade</label>
                                <StatusText $isActive={category.availability === 'active'}>
                                  {category.availability === 'active' ? 'Ativado' : 'Desativado'}
                                </StatusText>
                            </InfoRow>

                            <InfoRow>
                                <label>Descrição</label>
                                <p>
                                  {category.description || 'Nenhuma descrição cadastrada.'}
                                </p>
                            </InfoRow>

                            <ActionsRow>
                                <EditButton onClick={() => setIsEditOpen(true)} disabled={loading}>
                                    <FiEdit2 /> Editar
                                </EditButton>
                                <DeleteButton onClick={handleDelete} disabled={loading}>
                                    <FiTrash2 /> Deletar
                                </DeleteButton>
                            </ActionsRow>
                        </Section>

                        <Section>
                            <SectionHeader>
                                <SectionTitle>Produtos ({category.quantity ?? 0})</SectionTitle>
                            </SectionHeader>
                            <ScrollArea>
                                <ProductsTable>
                                    <tbody>
                                        {category.produtos?.length > 0 ? (
                                            category.produtos.map((productId) => (
                                                <Tr key={productId}>
                                                    <Td style={{ width: 46 }}>
                                                        <FiBox size={20} />
                                                    </Td>
                                                    <Td>{productId}</Td> 
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td colSpan={2} style={{ padding: 16 }}>Nenhum produto vinculado.</Td>
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
            </PageWrapper>
        </Container>
    );
}