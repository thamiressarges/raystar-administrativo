import { useState, useEffect } from "react";
import { toast } from 'react-toastify'; 
import { 
    Overlay, 
    ModalContent, 
    Title, 
    Subtitle, 
    FormGroup, 
    Footer, 
    CancelButton, 
    SaveButton 
} from "./styles"; 

export function CategoryModal({ isOpen, onClose, type = "create", data = null, onSubmit }) {
    const [name, setName] = useState("");
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (isOpen) {
            if (type === "edit" && data) {
                setName(data.name || "");
                setIsActive(data.is_active ?? true);
            } else {
                setName("");
                setIsActive(true);
            }
        }
    }, [type, data, isOpen]); 

    if (!isOpen) return null;

    const handleSave = (e) => {
        e.preventDefault(); 
        
        const cleanName = name.trim();

        if (!cleanName) {
            toast.warn("Por favor, preencha o nome da categoria.");
            return;
        }
        
        const payload = { 
            name: cleanName,
            is_active: isActive,
        };

        onSubmit(payload);
        onClose(); 
    };

    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Title>{type === "edit" ? "Editar Categoria" : "Nova Categoria"}</Title>

                <Subtitle>
                    {type === "edit"
                        ? "Atualize as informações da categoria abaixo"
                        : "Preencha os dados para criar uma nova categoria"}
                </Subtitle>

                <form onSubmit={handleSave}>
                    <FormGroup>
                        <label htmlFor="categoryName">Nome *</label>
                        <input
                            id="categoryName"
                            type="text"
                            placeholder="Ex: Blusas, Acessórios..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                            autoFocus
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="categoryStatus">Status</label>
                        <select
                            id="categoryStatus"
                            value={isActive ? "active" : "inactive"}
                            onChange={(e) => setIsActive(e.target.value === "active")}
                        >
                            <option value="active">Ativa (Visível na loja)</option>
                            <option value="inactive">Inativa (Oculta)</option>
                        </select>
                    </FormGroup>

                    <Footer>
                        <CancelButton type="button" onClick={onClose}>
                            Cancelar
                        </CancelButton>
                        <SaveButton type="submit">
                            {type === "edit" ? "Salvar Alterações" : "Criar Categoria"}
                        </SaveButton>
                    </Footer>
                </form>
            </ModalContent>
        </Overlay>
    );
}