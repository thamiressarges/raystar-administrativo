import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../utils/schemas";

import { 
    Overlay, ModalContent, Title, Subtitle, FormGroup, Footer, CancelButton, SaveButton 
} from "./styles"; 

export function CategoryModal({ isOpen, onClose, type = "create", data = null, onSubmit }) {
    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "", is_active: true }
    });

    useEffect(() => {
        if (isOpen && data) {
            setValue("name", data.name);
            setValue("is_active", data.is_active);
        } else {
            reset();
        }
    }, [isOpen, data, setValue, reset]);

    const handleFormSubmit = async (formData) => {
        await onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Title>{type === "edit" ? "Editar Categoria" : "Nova Categoria"}</Title>
                <Subtitle>Preencha os dados abaixo</Subtitle>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <FormGroup>
                        <label>Nome *</label>
                        <input
                            {...register("name")}
                            placeholder="Ex: Roupas"
                            autoFocus
                        />
                        {errors.name && <span style={{color:'red', fontSize: 12}}>{errors.name.message}</span>}
                    </FormGroup>

                    <FormGroup>
                        <label>Status</label>
                        <select {...register("is_active", { setValueAs: v => v === "true" })}>
                            <option value="true">Ativa</option>
                            <option value="false">Inativa</option>
                        </select>
                    </FormGroup>

                    <Footer>
                        <CancelButton type="button" onClick={onClose}>Cancelar</CancelButton>
                        <SaveButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Salvando..." : (type === "edit" ? "Salvar" : "Criar")}
                        </SaveButton>
                    </Footer>
                </form>
            </ModalContent>
        </Overlay>
    );
}