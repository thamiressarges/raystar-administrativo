import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';

import { useSettings } from '../../hooks/useSettings';
import { Input } from '../../components/Input';
import { Loading } from '../../components/Loading';
import { PageContainer } from '../../styles/commonStyles';

import {
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

export function Settings() {
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
                        <h2>Configurações da Loja</h2>
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

                    {/* --- DADOS GERAIS --- */}
                    <InputWrapper>
                        <label>Nome da Loja</label>
                        {isEditing ? (
                            <Input {...register("name")} />
                        ) : (
                            // CORREÇÃO AQUI: Usando getValues direto, sem chamar o hook de novo
                            <InfoDisplay>{getValues("name")}</InfoDisplay>
                        )}
                        {errors.name && <span style={{color:'red', fontSize: 12}}>{errors.name.message}</span>}
                    </InputWrapper>

                    <InfoGroup>
                        <InputWrapper>
                            <label>Email</label>
                            {isEditing ? (
                                <Input {...register("email")} />
                            ) : (
                                <InfoDisplay>{getValues("email")}</InfoDisplay>
                            )}
                             {errors.email && <span style={{color:'red', fontSize: 12}}>{errors.email.message}</span>}
                        </InputWrapper>

                        <InputWrapper>
                            <label>CNPJ</label>
                            {isEditing ? (
                                <Input {...register("cnpj")} />
                            ) : (
                                <InfoDisplay>{getValues("cnpj")}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>

                    {/* --- ENDEREÇO --- */}
                    <SectionHeader>
                        <h4>Endereço</h4>
                    </SectionHeader>

                    <InfoGroup>
                        <InputWrapper>
                            <label>CEP</label>
                            {isEditing ? (
                                <Input 
                                    {...register("address.cep")} 
                                    onBlur={(e) => fetchCep(e.target.value)} 
                                    maxLength={9}
                                />
                            ) : (
                                <InfoDisplay>{getValues("address.cep")}</InfoDisplay>
                            )}
                             {errors.address?.cep && <span style={{color:'red', fontSize: 12}}>{errors.address.cep.message}</span>}
                        </InputWrapper>

                        <InputWrapper>
                            <label>Número</label>
                            {isEditing ? (
                                <Input {...register("address.numero")} />
                            ) : (
                                <InfoDisplay>{getValues("address.numero")}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>

                    <InfoGroup>
                        <InputWrapper>
                            <label>Complemento</label>
                            {isEditing ? (
                                <Input {...register("address.complemento")} />
                            ) : (
                                <InfoDisplay>{getValues("address.complemento")}</InfoDisplay>
                            )}
                        </InputWrapper>

                        <InputWrapper>
                            <label>Bairro</label>
                            {isEditing ? (
                                <Input {...register("address.bairro")} />
                            ) : (
                                <InfoDisplay>{getValues("address.bairro")}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>

                    <InputWrapper>
                        <label>Cidade</label>
                        {isEditing ? (
                            <Input {...register("address.cidade")} />
                        ) : (
                            <InfoDisplay>{getValues("address.cidade")}</InfoDisplay>
                        )}
                    </InputWrapper>

                    {/* --- TELEFONES (Dinâmico) --- */}
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

                    {/* --- REDES SOCIAIS --- */}
                    <SectionHeader>
                        <h4>Redes Sociais</h4>
                    </SectionHeader>

                    <InfoGroup>
                        <InputWrapper>
                            <label>Instagram</label>
                            {isEditing ? (
                                <Input {...register("social_media.instagram")} placeholder="@sua_loja" />
                            ) : (
                                <InfoDisplay>{getValues("social_media.instagram")}</InfoDisplay>
                            )}
                        </InputWrapper>

                        <InputWrapper>
                            <label>Facebook</label>
                            {isEditing ? (
                                <Input {...register("social_media.facebook")} placeholder="facebook.com/page" />
                            ) : (
                                <InfoDisplay>{getValues("social_media.facebook")}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>
                </Form>
            </Content>
        </PageContainer>
    );
}