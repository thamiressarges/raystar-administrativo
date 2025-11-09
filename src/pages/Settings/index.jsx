import { useState } from 'react';
import {
    Container,
    Content,
    Form,
    FormHeader,
    InputWrapper,
    InfoDisplay,
    InfoGroup,
    SectionHeader,
    ContactRow,
    ButtonLink,
    ActionButtons
} from './styles';

import { Header } from '../../components/Header';
import { Brand } from '../../components/Brand';
import { Menu } from '../../components/Menu';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { FiTrash2, FiPlus, FiEdit2 } from 'react-icons/fi';

import { useMenu } from '../../contexts/MenuContext';

export function Settings() {
    const { isMenuOpen } = useMenu();
    const [isEditing, setIsEditing] = useState(false);

    const [lojaDados, setLojaDados] = useState({
        nome: 'Minha Loja',
        email: 'contato@minhaloja.com.br',
        cnpj: '00.000.000/0000-00',
        cep: '00000-000',
        numero: '123',
        complemento: 'Sala 101',
        bairro: 'Centro',
        cidade: 'São Paulo'
    });

    const [phones, setPhones] = useState([
        '(11) 98765-4321',
        '(11) 3456-7890'
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLojaDados(prev => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (e, index) => {
        const newPhones = [...phones];
        newPhones[index] = e.target.value;
        setPhones(newPhones);
    };

    const addPhone = () => {
        setPhones([...phones, '']);
    };

    const removePhone = (indexToRemove) => {
        setPhones(phones.filter((_, index) => index !== indexToRemove));
    };

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => {
        setIsEditing(false);
    };
    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <Container $isopen={isMenuOpen}>
            <Brand />
            <Header />
            <Menu />

            <Content>
                <Form>
                    <FormHeader>
                        <h2>Configurações da Loja</h2>
                        <ActionButtons>
                            {isEditing ? (
                                <>
                                    <Button
                                        title="Cancelar"
                                        type="button"
                                        $isCancel
                                        onClick={handleCancel}
                                    />
                                    <Button
                                        title="Salvar"
                                        type="button"
                                        onClick={handleSave}
                                    />
                                </>
                            ) : (
                                <Button
                                    title="Editar"
                                    type="button"
                                    icon={FiEdit2}
                                    onClick={handleEdit}
                                />
                            )}
                        </ActionButtons>
                    </FormHeader>

                    <InputWrapper>
                        <label>Nome da Loja</label>
                        {isEditing ? (
                            <Input
                                name="nome"
                                value={lojaDados.nome}
                                onChange={handleChange}
                            />
                        ) : (
                            <InfoDisplay>{lojaDados.nome}</InfoDisplay>
                        )}
                    </InputWrapper>

                    <InfoGroup>
                        <InputWrapper>
                            <label>Email</label>
                            {isEditing ? (
                                <Input
                                    name="email"
                                    value={lojaDados.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <InfoDisplay>{lojaDados.email}</InfoDisplay>
                            )}
                        </InputWrapper>
                        <InputWrapper>
                            <label>CNPJ</label>
                            {isEditing ? (
                                <Input
                                    name="cnpj"
                                    value={lojaDados.cnpj}
                                    onChange={handleChange}
                                />
                            ) : (
                                <InfoDisplay>{lojaDados.cnpj}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>

                    <InfoGroup>
                        <InputWrapper>
                            <label>CEP</label>
                            {isEditing ? (
                                <Input
                                    name="cep"
                                    value={lojaDados.cep}
                                    onChange={handleChange}
                                />
                            ) : (
                                <InfoDisplay>{lojaDados.cep}</InfoDisplay>
                            )}
                        </InputWrapper>
                        <InputWrapper>
                            <label>Número da Rua</label>
                            {isEditing ? (
                                <Input
                                    name="numero"
                                    value={lojaDados.numero}
                                    onChange={handleChange}
                                />
                            ) : (
                                <InfoDisplay>{lojaDados.numero}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>

                    <InfoGroup>
                        <InputWrapper>
                            <label>Complemento</label>
                            {isEditing ? (
                                <Input
                                    name="complemento"
                                    value={lojaDados.complemento}
                                    onChange={handleChange}
                                />
                            ) : (
                                <InfoDisplay>{lojaDados.complemento}</InfoDisplay>
                            )}
                        </InputWrapper>
                        <InputWrapper>
                            <label>Bairro</label>
                            {isEditing ? (
                                <Input
                                    name="bairro"
                                    value={lojaDados.bairro}
                                    onChange={handleChange}
                                />
                            ) : (
                                <InfoDisplay>{lojaDados.bairro}</InfoDisplay>
                            )}
                        </InputWrapper>
                    </InfoGroup>

                    <InputWrapper>
                        <label>Cidade</label>
                        {isEditing ? (
                            <Input
                                name="cidade"
                                value={lojaDados.cidade}
                                onChange={handleChange}
                            />
                        ) : (
                            <InfoDisplay>{lojaDados.cidade}</InfoDisplay>
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

                    {phones.map((phone, index) => (
                        <ContactRow key={index}>
                            {isEditing ? (
                                <>
                                    <Input
                                        value={phone}
                                        onChange={(e) => handlePhoneChange(e, index)}
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

                </Form>
            </Content>
        </Container>
    );
}