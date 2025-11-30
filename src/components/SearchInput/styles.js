import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    background-color: ${({ theme }) => theme.COLORS.WHITE};
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
    border-radius: 8px;
    overflow: hidden; 
    transition: border-color 0.2s;

    &:focus-within {
        border-color: ${({ theme }) => theme.COLORS.PRIMARY};
    }

    input {
        flex: 1;
        height: 48px;
        border: none;
        outline: none;
        padding: 0 16px;
        font-size: 14px;
        color: ${({ theme }) => theme.COLORS.GRAY_900};
        background-color: transparent;

        &::placeholder {
            color: ${({ theme }) => theme.COLORS.GRAY_400};
        }
    }
`;

export const SearchButton = styled.button`
    width: 48px;
    height: 48px;
    background-color: ${({ theme }) => theme.COLORS.PRIMARY};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.PRIMARY_HOVER};
    }

    svg {
        color: ${({ theme }) => theme.COLORS.WHITE};
    }
`;