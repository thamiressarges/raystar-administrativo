import { useState } from "react";
import { toast } from 'react-toastify'; 
import { validateVariationForm } from "../../utils/validators"; // Importando nosso validador

import { 
  Overlay, 
  ModalContent, 
  Title, 
  FormRow, 
  FormGroup, 
  Footer, 
  CancelButton, 
  SaveButton 
} from "./styles"; 

export function AddVariationModal({ isOpen, onClose, onSubmit }) {
    const [tamanho, setTamanho] = useState("");
    const [cor, setCor] = useState("");
    const [estoque, setEstoque] = useState("");
    const [preco, setPreco] = useState("");

    if (!isOpen) return null;

    const handleSave = (e) => {
        e.preventDefault(); 
        const formData = { tamanho, cor, estoque, preco };
        const { isValid, error } = validateVariationForm(formData);

        if (!isValid) {
            toast.warn(error);
            return;
        }

        try {
            const payload = { 
                id: `temp-${Date.now()}`,
                tamanho: tamanho.trim(), 
                cor: cor.trim(), 
                estoque: Number(estoque), 
                preco: Number(preco)
            };
            
            if (onSubmit) {
                onSubmit(payload); 
            }

            setTamanho("");
            setCor("");
            setEstoque("");
            setPreco("");
            onClose();
            
        } catch (error) {
            console.error("[AddVariationModal] Erro ao processar:", error);
            toast.error("Ocorreu um erro ao adicionar. Tente novamente.");
        }
    };

    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Title>Nova Variação</Title>

                <form onSubmit={handleSave}>
                    <FormRow>
                        <FormGroup>
                            <label htmlFor="tamanho">Tamanho</label>
                            <input 
                                id="tamanho"
                                type="text" 
                                placeholder="Ex: P, M, G, 42" 
                                value={tamanho} 
                                onChange={(e) => setTamanho(e.target.value)} 
                                autoComplete="off"
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="cor">Cor</label>
                            <input 
                                id="cor"
                                type="text" 
                                placeholder="Ex: Preto, Azul Marinho" 
                                value={cor} 
                                onChange={(e) => setCor(e.target.value)} 
                                autoComplete="off"
                            />
                        </FormGroup>

                        <FormGroup className="small"> 
                            <label htmlFor="estoque">Estoque</label>
                            <input 
                                id="estoque"
                                type="number" 
                                min="1" 
                                placeholder="0"
                                value={estoque} 
                                onChange={(e) => setEstoque(e.target.value)} 
                            />
                        </FormGroup>

                        <FormGroup className="small">
                            <label htmlFor="preco">Preço (R$)</label>
                            <input 
                                id="preco"
                                type="number" 
                                step="0.01" 
                                min="0.01"
                                placeholder="0,00" 
                                value={preco} 
                                onChange={(e) => setPreco(e.target.value)} 
                            />
                        </FormGroup>
                    </FormRow>

                    <Footer>
                        <CancelButton type="button" onClick={onClose}>
                            Cancelar
                        </CancelButton>
                        <SaveButton type="submit">
                            Adicionar
                        </SaveButton>
                    </Footer>
                </form>
            </ModalContent>
        </Overlay>
    );
}