import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;

    display: grid;
    grid-template-columns: ${({ $isopen }) => ($isopen ? '210px' : '80px')} auto;
    grid-template-rows: 105px 128px auto;
    grid-template-areas:
        "brand header"
        "menu search"
        "menu content";

    background-color: ${({ theme }) => theme.COLORS.GRAY_100};
    transition: grid-template-columns 0.3s ease-in-out;
`;

export const Search = styled.div`
    grid-area: search;
    padding: 20px 80px;

    .search-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        
        > *:first-child {
            flex-grow: 1; 
        }
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

export const Content = styled.div`
    grid-area: content;
    padding: 0 80px;
    overflow-y: auto; 
    height: 100%; 
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