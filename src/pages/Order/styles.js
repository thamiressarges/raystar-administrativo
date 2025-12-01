import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const SearchArea = styled.div`
    width: 100%;
    padding: 32px 64px 0;

    .search-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        
        > *:first-child {
            flex-grow: 1; 
        }
    }

    @media (max-width: 768px) {
        padding: 20px 20px 0;
    }
`;

export const FilterButton = styled.button`
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.COLORS.BLACK};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;

    svg {
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.PRIMARY_HOVER};
    }
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    padding-bottom: 40px; 
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
    text-align: center;

    p {
        font-size: 18px;
        font-weight: 500;
        color: ${({ theme }) => theme.COLORS.GRAY_500};
    }
`;