import styled, { css } from "styled-components";

export const Container = styled.button`
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.PRIMARY};
    color: ${({ theme }) => theme.COLORS.WHITE};
    height: 56px;
    border: 0;
    padding: 0 16px;
    margin-top: 16px;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.PRIMARY_HOVER};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    ${({ $isTableButton }) => $isTableButton && css`
        width: 100px;
        height: 36px;
        margin-top: 0;
        border-radius: 20px;
        font-size: 12px;
        padding: 0;
    `}
`;