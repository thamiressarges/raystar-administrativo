import { useState } from "react";
import { toast } from 'react-toastify'; 
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

    // Estados
    const [tamanho, setTamanho] = useState("");
    const [cor, setCor] = useState("");
    const [estoque, setEstoque] = useState(1);
    const [preco, setPreco] = useState("");

    if (!isOpen) return null;

    const handleSave = (e) => {
        e.preventDefault(); 
        
        // Validando os campos
        if (!tamanho || !cor || !estoque || !preco) {
            toast.warn("Preencha todos os campos da variação!");
            return;
        }

        // Montando o objeto da nova variação
        const payload = { 
            id: `temp-${Date.now()}`,
            tamanho, 
            cor, 
            estoque: Number(estoque), 
            preco: parseFloat(preco)
        };
        
        // Enviando os dados para a página pai
        if (onSubmit) {
            onSubmit(payload); 
        }

        // Limpaando os campos e fechando o modal
        setTamanho("");
        setCor("");
        setEstoque(1);
        setPreco("");
        onClose(); 
    };

    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Title>Adicionar Nova Variação</Title>

                <form onSubmit={handleSave}>
                    <FormRow>
                        <FormGroup>
                            <label>Tamanho *</label>
                            <input 
                                type="text" 
                                placeholder="Ex: P" 
                                value={tamanho} 
                                onChange={(e) => setTamanho(e.target.value)} 
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Cor *</label>
                            <input 
                                type="text" 
                                placeholder="Ex: Preto" 
                                value={cor} 
                                onChange={(e) => setCor(e.target.value)} 
                            />
                        </FormGroup>

                        <FormGroup className="small"> 
                            <label>Estoque *</label>
                            <input 
                                type="number" 
                                min="0"
                                value={estoque} 
                                onChange={(e) => setEstoque(e.target.value)} 
                            />
                        </FormGroup>

                        <FormGroup className="small">
                            <label>Preço *</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                min="0"
                                placeholder="Ex: 89.90" 
                                value={preco} 
                                onChange={(e) => setPreco(e.target.value)} 
                            />
                        </FormGroup>
                    </FormRow>

                    <Footer>
                        <CancelButton type="button" onClick={onClose}>Cancelar</CancelButton>
                        <SaveButton type="submit">Adicionar Variação</SaveButton>
                    </Footer>
                </form>
            </ModalContent>
        </Overlay>
    );
}