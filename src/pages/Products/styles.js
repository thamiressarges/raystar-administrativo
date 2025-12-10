import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const SearchArea = styled.div`
    width: 100%;
    padding: 32px 64px 0;

    @media (max-width: 768px) {
        padding: 20px 20px 0;
    }
`;

export const SearchAndActionButton = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;

    > *:first-child {
        flex-grow: 1;
    }
`;

export const AddButton = styled.button`
    width: 48px;
    height: 48px;
    background-color: ${({ theme }) => theme.COLORS.BLACK};
    color: ${({ theme }) => theme.COLORS.WHITE};
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;

    svg {
        stroke: ${({ theme }) => theme.COLORS.WHITE};
    }

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.PRIMARY_HOVER};
    }
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
    padding-bottom: 60px;
    text-align: center;
    color: ${({ theme }) => theme.COLORS.GRAY_300};

    svg {
        font-size: 80px;
        margin-bottom: 16px;
        color: ${({ theme }) => theme.COLORS.GRAY_200};
    }

    p {
        font-size: 18px;
        font-weight: 500;
        color: ${({ theme }) => theme.COLORS.GRAY_500};
    }
`;