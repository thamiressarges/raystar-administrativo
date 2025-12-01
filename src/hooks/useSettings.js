import { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { StoreApi } from '../services/storeApi';
import { storeSettingsSchema } from '../utils/schemas';

export function useSettings() {
    const [loading, setLoading] = useState(true);
    const [storeId, setStoreId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm({
        resolver: zodResolver(storeSettingsSchema),
        defaultValues: {
            name: '',
            email: '',
            cnpj: '',
            address: { cep: '', numero: '', complemento: '', bairro: '', cidade: '' },
            social_media: { instagram: '', facebook: '' },
            phones: []
        }
    });

    const { control, reset, setValue, handleSubmit, watch } = form;
    
    const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
        control,
        name: "phones"
    });

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await StoreApi.getStoreSettings();
            setStoreId(data.id);
            
            reset({
                name: data.name || '',
                email: data.email || '',
                cnpj: data.cnpj || '',
                address: data.address || { cep: '', numero: '', complemento: '', bairro: '', cidade: '' },
                social_media: data.social_media || { instagram: '', facebook: '' },
                phones: data.phones || []
            });
        } catch (error) {
            toast.error("Erro ao carregar configurações: " + error.message);
        } finally {
            setLoading(false);
        }
    }, [reset]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const fetchCep = async (cepValue) => {
        const cleanCep = cepValue?.replace(/\D/g, '');
        if (!cleanCep || cleanCep.length !== 8) return;

        try {
            setLoading(true);
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const data = await response.json();

            if (data.erro) {
                toast.warn("CEP não encontrado.");
                return;
            }

            setValue('address.bairro', data.bairro);
            setValue('address.cidade', data.localidade);
            toast.success("Endereço encontrado!");
        } catch (err) {
            toast.error("Erro ao buscar CEP.");
        } finally {
            setLoading(false);
        }
    };

    const onSave = async (data) => {
        if (!storeId) return toast.error("ID da loja não encontrado.");

        try {
            setLoading(true);
            await StoreApi.updateStoreSettings(storeId, data);
            toast.success("Configurações salvas com sucesso!");
            setIsEditing(false);
            loadData();
        } catch (error) {
            toast.error("Erro ao salvar: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        loadData(); 
    };

    return {
        form,
        phoneFields,
        appendPhone,
        removePhone,
        loading,
        isEditing,
        setIsEditing,
        handleCancel,
        handleSave: handleSubmit(onSave),
        fetchCep
    };
}