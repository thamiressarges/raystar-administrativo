import styled from "styled-components";

export const Container = styled.div`

    grid-area: brand;

    display: flex;
    justify-content: ${({ $isopen }) => $isopen ? 'space-between' : 'center'};
    align-items: center;

    padding: 25px;

    border-bottom: 1px solid ${({theme}) => theme.COLORS.GRAY_100};
    background-color: ${({theme}) => theme.COLORS.BLACK};

    > h1 {
        font-size: 30px;
        color: ${({theme}) => theme.COLORS.WHITE};
        font-family: "Ibarra Real Nova", serif;
        font-weight: normal;
        white-space: nowrap;
    }

    > button {
        background: transparent;
        border: none;
        display: flex; /* Para alinhar o ícone perfeitamente */
        align-items: center;
        cursor: pointer;

        > svg {
            font-size: 24px;
            color: ${({theme}) => theme.COLORS.WHITE};
        }
    }

`;