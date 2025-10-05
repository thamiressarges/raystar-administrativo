import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    background-color: ${({theme}) => theme.COLORS.WHITE};
    color: ${({theme}) => theme.COLORS.BLACK};

    margin-bottom: 8px;
    border-radius: 10px;

    > input {
        height: 56px;
        width: 100%;

        padding: 12px;
        color: ${({theme}) => theme.COLORS.BLACK};
        background: transparent;
        border: 0;

        &:placeholder {
            color: ${({theme}) => theme.COLORS.BLACK};
        }
    }

    > svg {
        margin-left: 16px;
    }
`;