import { useState, useEffect } from "react";
import { toast } from 'react-toastify'; 

import { Overlay, ModalContent, Title, Subtitle, FormGroup, Footer, CancelButton, SaveButton } from "./styles"; 

export function CategoryModal({ isOpen, onClose, type = "create", data = null, onSubmit }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [availability, setAvailability] = useState("active");
   
    useEffect(() => {
        if (type === "edit" && data) {
            setName(data.name || "");
            setDescription(data.description || "");
            setAvailability(data.availability || "active");
        } else {
            setName("");
            setDescription("");
            setAvailability("active");
        }
    }, [type, data, isOpen]); 

    if (!isOpen) return null;

    const handleSave = async (e) => {
        e.preventDefault(); 
        
        if (!name || !description) {
            toast.warn("Preencha o nome e a descrição!");
            return;
        }
        
        const payload = { 
            name, 
            description, 
            availability: availability,
        };

        if (onSubmit) {
            onSubmit(payload); 
        }

        onClose(); 
    };

    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Title>{type === "edit" ? "Editar Categoria" : "Nova Categoria"}</Title>
                <Subtitle>
                    {type === "edit"
                        ? "Altere as informações conforme necessário"
                        : "Preencha os dados para cadastrar uma nova categoria"}
                </Subtitle>

                <form onSubmit={handleSave}>
                <FormGroup>
                    <label>Nome *</label>
                    <input
                        type="text"
                        placeholder="Ex: Blusas"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Descrição *</label>
                    <textarea
                        placeholder="Descreva a categoria..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>
                
                {type === 'edit' && (
                    <FormGroup>
                        <label>Disponibilidade</label>
                        <select
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        >
                            <option value="active">Ativada</option>
                            <option value="inactive">Desativada</option>
                        </select>
                    </FormGroup>
                )}

                <Footer>
                    <CancelButton type="button" onClick={onClose}>Cancelar</CancelButton>
                    <SaveButton type="submit">
                        {type === "edit" ? "Salvar Alterações" : "Salvar Categoria"}
                    </SaveButton>
                </Footer>
                </form>
            </ModalContent>
        </Overlay>
    );
}