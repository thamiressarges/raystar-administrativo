import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiPlus, FiTrash2, FiChevronLeft } from 'react-icons/fi';
import { useSettings } from '../../hooks/useSettings';
import { Input } from '../../components/Input';
import { Loading } from '../../components/Loading';
import { PageContainer, BackButton } from '../../styles/commonStyles';

import {
    Content,
    Form,
    HeaderContainer,
    TitleWrapper,
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

const SettingsField = ({ label, isEditing, register, name, value, error, ...props }) => (
    <InputWrapper>
        <label>{label}</label>
        {isEditing ? (
            <Input {...register(name)} {...props} />
        ) : (
            <InfoDisplay>{value}</InfoDisplay>
        )}
        {error && <span style={{color:'red', fontSize: 12}}>{error.message}</span>}
    </InputWrapper>
);

export function Settings() {
    const navigate = useNavigate();
    const {
        form, 
        phoneFields,
        appendPhone,
        removePhone,
        loading,
        isEditing,
        setIsEditing,
        handleCancel,
        handleSave,
        fetchCep
    } = useSettings();

    const { register, formState: { errors }, getValues } = form;

    if (loading && !isEditing) return <Loading />;

    return (
        <PageContainer>
            {loading && <Loading />}

            <Content>
                <Form onSubmit={handleSave}>
                    <HeaderContainer>
                        <TitleWrapper>
                            <BackButton onClick={() => navigate(-1)}>
                                <FiChevronLeft />
                            </BackButton>
                            <h2>Configurações da Loja</h2>
                        </TitleWrapper>
                        <ActionButtons>
                            {isEditing ? (
                                <>
                                    <CancelButton title="Cancelar" type="button" onClick={handleCancel} />
                                    <SaveButton title="Salvar" type="submit" />
                                </>
                            ) : (
                                <IconButton type="button" onClick={() => setIsEditing(true)}>
                                    <FiEdit2 size={22} />
                                </IconButton>
                            )}
                        </ActionButtons>
                    </HeaderContainer>

                    <SettingsField 
                        label="Nome da Loja" 
                        isEditing={isEditing} 
                        register={register} 
                        name="name" 
                        value={getValues("name")} 
                        error={errors.name} 
                    />

                    <InfoGroup>
                        <SettingsField 
                            label="Email" 
                            isEditing={isEditing} 
                            register={register} 
                            name="email" 
                            value={getValues("email")} 
                            error={errors.email} 
                        />
                        <SettingsField 
                            label="CNPJ" 
                            isEditing={isEditing} 
                            register={register} 
                            name="cnpj" 
                            value={getValues("cnpj")} 
                            error={errors.cnpj} 
                        />
                    </InfoGroup>

                    <SectionHeader>
                        <h4>Endereço</h4>
                    </SectionHeader>

                    <InfoGroup>
                        <SettingsField 
                            label="CEP" 
                            isEditing={isEditing} 
                            register={register} 
                            name="address.cep" 
                            value={getValues("address.cep")} 
                            error={errors.address?.cep}
                            onBlur={(e) => fetchCep(e.target.value)}
                            maxLength={9}
                        />
                        <SettingsField 
                            label="Número" 
                            isEditing={isEditing} 
                            register={register} 
                            name="address.numero" 
                            value={getValues("address.numero")} 
                            error={errors.address?.numero} 
                        />
                    </InfoGroup>

                    <InfoGroup>
                        <SettingsField 
                            label="Complemento" 
                            isEditing={isEditing} 
                            register={register} 
                            name="address.complemento" 
                            value={getValues("address.complemento")} 
                        />
                        <SettingsField 
                            label="Bairro" 
                            isEditing={isEditing} 
                            register={register} 
                            name="address.bairro" 
                            value={getValues("address.bairro")} 
                            error={errors.address?.bairro} 
                        />
                    </InfoGroup>

                    <SettingsField 
                        label="Cidade" 
                        isEditing={isEditing} 
                        register={register} 
                        name="address.cidade" 
                        value={getValues("address.cidade")} 
                        error={errors.address?.cidade} 
                    />

                    <SectionHeader>
                        <h4>Telefones</h4>
                        {isEditing && (
                            <ButtonLink type="button" onClick={() => appendPhone("")}>
                                <FiPlus size={20} /> Adicionar Telefone
                            </ButtonLink>
                        )}
                    </SectionHeader>

                    {phoneFields.map((field, index) => (
                        <ContactRow key={field.id}>
                            {isEditing ? (
                                <>
                                    <Input 
                                        {...register(`phones.${index}`)} 
                                        placeholder="(00) 00000-0000"
                                    />
                                    <button type="button" className="trash-button" onClick={() => removePhone(index)}>
                                        <FiTrash2 size={20} />
                                    </button>
                                </>
                            ) : (
                                <span className="phone-text">{getValues(`phones.${index}`)}</span>
                            )}
                        </ContactRow>
                    ))}

                    <SectionHeader>
                        <h4>Redes Sociais</h4>
                    </SectionHeader>

                    <InfoGroup>
                        <SettingsField 
                            label="Instagram" 
                            isEditing={isEditing} 
                            register={register} 
                            name="social_media.instagram" 
                            value={getValues("social_media.instagram")} 
                            placeholder="@sua_loja"
                        />
                        <SettingsField 
                            label="Facebook" 
                            isEditing={isEditing} 
                            register={register} 
                            name="social_media.facebook" 
                            value={getValues("social_media.facebook")} 
                            placeholder="facebook.com/page"
                        />
                    </InfoGroup>
                </Form>
            </Content>
        </PageContainer>
    );
}