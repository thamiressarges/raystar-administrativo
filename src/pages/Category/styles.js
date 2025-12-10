import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Search = styled.div`
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
    width: 56px; 
    height: 56px;
    background-color: ${({ theme }) => theme.COLORS.BLACK};
    color: ${({ theme }) => theme.COLORS.WHITE};
    border: none;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.PRIMARY_HOVER};
        transform: translateY(-2px);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const Content = styled.div`
    padding: 24px 64px 48px;
    flex: 1;
    overflow-y: auto; 

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 32px;
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    text-align: center;
    opacity: 0.7;

    p {
        font-size: 16px;
        font-weight: 500;
        color: ${({ theme }) => theme.COLORS.GRAY_500};
    }
`;