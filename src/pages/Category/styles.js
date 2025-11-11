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
    padding: 20px 80px;
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
    background: #000;
    color: #fff;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        stroke: #fff;
    }

    &:hover {
        opacity: 0.9;
    }
`;

export const Content = styled.div`
    grid-area: content;
    padding: 0 80px;
    overflow-y: auto; 
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    padding-bottom: 20px;
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
    padding-bottom: 60px;
    text-align: center;

    color: '#9CA3AF'; 

    p {
        font-size: 18px;
        font-weight: 500;
        color: #6B7280;
    }
`;