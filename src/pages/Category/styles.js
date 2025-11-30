import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: ${({ $isopen }) => $isopen ? "210px" : "80px"} auto;
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
    padding: 24px 64px 0; 
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
    background-color: ${({ theme }) => theme.COLORS.PRIMARY};
    color: ${({ theme }) => theme.COLORS.WHITE};
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.PRIMARY_HOVER};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const Content = styled.div`
    grid-area: content;
    padding: 24px 64px 48px;
    overflow-y: auto; 
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 24px;
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
    text-align: center;

    p {
        font-size: 18px;
        font-weight: 500;
        color: ${({ theme }) => theme.COLORS.GRAY_400};
    }
`;