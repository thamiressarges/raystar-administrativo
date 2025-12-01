import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2, FiPlus, FiEdit2 } from 'react-icons/fi';

import {
    Container,
    Content,
    Form,
    HeaderContainer,
    InputWrapper,
    InfoDisplay,
    InfoGroup,
    SectionHeader,
    ContactRow,
    ButtonLink,
    ActionButtons,
    IconButton,
    CancelButton,
    SaveButton,
} from './styles';

import { Input } from '../../components/Input';
import { Loading } from '../../components/Loading';

import { StoreApi } from '../../services/storeApi';

export function Settings() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [storeId, setStoreId] = useState(null);
    const [originalData, setOriginalData] = useState(null);

    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedCnpj, setEditedCnpj] = useState('');
    const [editedPhones, setEditedPhones] = useState([]);
    const [editedSocial, setEditedSocial] = useState({ instagram: '', facebook: '' });

    const [editedAddress, setEditedAddress] = useState({
        cep: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
    });

    const loadStoreData = async () => {
        setLoading(true);
        try {
            const data = await StoreApi.getStoreSettings();

            setOriginalData(data);
            setStoreId(data.id);

            setEditedName(data.name || '');
            setEditedEmail(data.email || '');
            setEditedCnpj(data.cnpj || '');
            setEditedPhones(data.phones || []);

            setEditedAddress({
                cep: data.address?.cep || '',
                numero: data.address?.numero || '',
                complemento: data.address?.complemento || '',
                bairro: data.address?.bairro || '',
                cidade: data.address?.cidade || '',
            });

            setEditedSocial({
                instagram: data.social_media?.instagram || '',
                facebook: data.social_media?.facebook || '',
            });

        } catch (err) {
            toast.error('Falha ao carregar dados da loja: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStoreData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const setters = {
            nome: setEditedName,
            email: setEditedEmail,
            cnpj: setEditedCnpj,
        };
        if (setters[name]) setters[name](value);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setEditedAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setEditedSocial((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (e, index) => {
        const newPhones = [...editedPhones];
        newPhones[index] = e.target.value;
        setEditedPhones(newPhones);
    };

    const addPhone = () => {
        setEditedPhones((prev) => [...prev, '']);
    };

    const removePhone = (indexToRemove) => {
        setEditedPhones(editedPhones.filter((_, idx) => idx !== indexToRemove));
    };

    const handleCepChange = async (e) => {
        let cep = e.target.value.replace(/\D/g, '');
        setEditedAddress((prev) => ({ ...prev, cep }));

        if (cep.length === 8) {
            try {
                setLoading(true);
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    toast.warn('CEP não encontrado.');
                } else {
                    setEditedAddress((prev) => ({
                        ...prev,
                        bairro: data.bairro,
                        cidade: data.localidade,
                    }));
                    toast.success('Endereço preenchido!');
                }
            } catch {
                toast.error('Erro ao buscar CEP.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEdit = () => setIsEditing(true);

    const handleCancel = () => {
        if (originalData) {
            setEditedName(originalData.name || '');
            setEditedEmail(originalData.email || '');
            setEditedCnpj(originalData.cnpj || '');
            setEditedPhones(originalData.phones || []);

            setEditedAddress(originalData.address || {
                cep: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
            });

            setEditedSocial(originalData.social_media || {
                instagram: '',
                facebook: '',
            });
        }
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!storeId) {
            toast.error('Erro: ID da loja não encontrado.');
            return;
        }

        const updates = {
            name: editedName,
            email: editedEmail,
            cnpj: editedCnpj,
            phones: editedPhones,
            address: editedAddress,
            social_media: editedSocial,
        };

        try {
            setLoading(true);
            await StoreApi.updateStoreSettings(storeId, updates);
            await loadStoreData();

            toast.success('Loja atualizada com sucesso!');
            setIsEditing(false);
        } catch (err) {
            toast.error('Erro ao salvar: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !originalData) {
        return <Loading />;
    }

    return (
        <Container>
            {loading && <Loading />}

            <Content>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <HeaderContainer>
                        <h2>Configurações da Loja</h2>
                        <ActionButtons>
                            {isEditing ? (
                                <>
                                    <CancelButton
                                        title="Cancelar"
                                        type="button"
                                        onClick={handleCancel}
                                    />
                                    <SaveButton
                                        title="Salvar"
                                        type="button"
                                        onClick={handleSave}
                                    />
                                </>
                            ) : (
                                <IconButton onClick={handleEdit}>
                                    <FiEdit2 size={22} />
                                </IconButton>
                            )}
                        </ActionButtons>
                    </HeaderContainer>

                    <InputWrapper>
                        <label>Nome da Loja</label>
                        {isEditing ? (
                            <Input
                                name="nome"
                                value={editedName}
                                onChange={handleChange}
                            />
                        ) : (
                            <InfoDisplay>{editedName}</InfoDisplay>
                        )}
                    </InputWrapper>

                    <InfoGroup>
                        <InputWrapper>
                            <label>Email</label>
                            {isEditing ? (
                                <Input
                                    name="email"
                                    type="email"
                                    value={editedEmail}
                                    onChange={handleChange}
                                />
                            ) : (
                                <InfoDisplay>{editedEmail}</InfoDisplay>
                            )}
                        </InputWrapper>

                        <InputWrapper>
                            <label>CNPJ</label>
                            {isEditing ? (
                                <Input
                                    name="cnpj"
                                    value={editedCnpj}
                                    onChange={handleChange}
                                />
                            ) : (
                                <InfoDisplay>{editedCnpj}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>

                    <SectionHeader>
                        <h4>Endereço</h4>
                    </SectionHeader>

                    <InfoGroup>
                        <InputWrapper>
                            <label>CEP</label>
                            {isEditing ? (
                                <Input
                                    name="cep"
                                    value={editedAddress.cep}
                                    onChange={handleCepChange}
                                    maxLength={9}
                                />
                            ) : (
                                <InfoDisplay>{editedAddress.cep}</InfoDisplay>
                            )}
                        </InputWrapper>

                        <InputWrapper>
                            <label>Número</label>
                            {isEditing ? (
                                <Input
                                    name="numero"
                                    value={editedAddress.numero}
                                    onChange={handleAddressChange}
                                />
                            ) : (
                                <InfoDisplay>{editedAddress.numero}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>

                    <InfoGroup>
                        <InputWrapper>
                            <label>Complemento</label>
                            {isEditing ? (
                                <Input
                                    name="complemento"
                                    value={editedAddress.complemento}
                                    onChange={handleAddressChange}
                                />
                            ) : (
                                <InfoDisplay>{editedAddress.complemento}</InfoDisplay>
                            )}
                        </InputWrapper>

                        <InputWrapper>
                            <label>Bairro</label>
                            {isEditing ? (
                                <Input
                                    name="bairro"
                                    value={editedAddress.bairro}
                                    onChange={handleAddressChange}
                                />
                            ) : (
                                <InfoDisplay>{editedAddress.bairro}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>

                    <InputWrapper>
                        <label>Cidade</label>
                        {isEditing ? (
                            <Input
                                name="cidade"
                                value={editedAddress.cidade}
                                onChange={handleAddressChange}
                            />
                        ) : (
                            <InfoDisplay>{editedAddress.cidade}</InfoDisplay>
                        )}
                    </InputWrapper>

                    <SectionHeader>
                        <h4>Telefones</h4>
                        {isEditing && (
                            <ButtonLink type="button" onClick={addPhone}>
                                <FiPlus size={20} />
                                Adicionar Telefone
                            </ButtonLink>
                        )}
                    </SectionHeader>

                    {editedPhones.map((phone, index) => (
                        <ContactRow key={index}>
                            {isEditing ? (
                                <>
                                    <Input
                                        value={phone}
                                        onChange={(e) => handlePhoneChange(e, index)}
                                        placeholder="(00) 90000-0000"
                                    />
                                    <button
                                        type="button"
                                        className="trash-button"
                                        onClick={() => removePhone(index)}
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </>
                            ) : (
                                <span className="phone-text">{phone}</span>
                            )}
                        </ContactRow>
                    ))}

                    <SectionHeader>
                        <h4>Redes Sociais</h4>
                    </SectionHeader>

                    <InfoGroup>
                        <InputWrapper>
                            <label>Instagram</label>
                            {isEditing ? (
                                <Input
                                    name="instagram"
                                    value={editedSocial.instagram}
                                    onChange={handleSocialChange}
                                    placeholder="@sua_loja"
                                />
                            ) : (
                                <InfoDisplay>{editedSocial.instagram}</InfoDisplay>
                            )}
                        </InputWrapper>

                        <InputWrapper>
                            <label>Facebook</label>
                            {isEditing ? (
                                <Input
                                    name="facebook"
                                    value={editedSocial.facebook}
                                    onChange={handleSocialChange}
                                    placeholder="facebook.com/sua_loja"
                                />
                            ) : (
                                <InfoDisplay>{editedSocial.facebook}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>
                </Form>
            </Content>
        </Container>
    );
}