import styled from "styled-components";

export const Container = styled.button`
    /* ESTILOS PADRÃO (o botão grande) */
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.BLACK};
    color: ${({theme}) => theme.COLORS.WHITE};

    height: 56px;
    border: 0;
    padding: 0 16px;
    margin-top: 16px;
    border-radius: 10px;
    font-weight: 500;

    &:disabled {
        opacity: 0.5;
    }

    /* ESTILOS CONDICIONAIS PARA TABELA (o botão pequeno) */
    ${({ isTableButton }) => isTableButton && `
        width: 100px;
        height: 36px;
        margin-top: 0;
        border-radius: 999px;
        font-size: 12px;
        padding: 0;
    `}
`;