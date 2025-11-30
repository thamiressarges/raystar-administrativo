import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: ${({ $isopen }) => ($isopen ? "210px" : "80px")} auto;
    grid-template-rows: 105px auto;
    grid-template-areas:
        "brand header"
        "menu content";
    background: ${({ theme }) => theme.COLORS.GRAY_100};
    transition: grid-template-columns 0.3s ease-in-out;
`;

export const PageContainer = styled.div`
    grid-area: content;
    padding: 24px 64px 48px;
    overflow-y: auto; 
`;

export const HeaderBar = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
`;

export const BackLink = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    transition: color 0.2s;

    &:hover {
        color: ${({ theme }) => theme.COLORS.GRAY_900};
    }

    svg {
        font-size: 24px;
    }
`;

export const Title = styled.h1`
    font-size: 28px;
    margin: 0;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
    font-weight: 700;
`;

export const Section = styled.section`
    background: ${({ theme }) => theme.COLORS.WHITE};
    border-radius: 16px;
    padding: 24px; 
    margin-top: 18px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const SectionHeader = styled.div`
    background: ${({ theme }) => theme.COLORS.GRAY_50};
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const SectionTitle = styled.h3`
    margin: 0;
    color: ${({ theme }) => theme.COLORS.GRAY_800};
    font-size: 18px;
`;

export const InfoRow = styled.div`
    display: grid;
    grid-template-columns: 180px auto; 
    gap: 14px;
    align-items: center;
    margin-bottom: 16px; 

    label {
        font-weight: 600;
        font-size: 15px;
        color: ${({ theme }) => theme.COLORS.GRAY_700}; 
    }
`;

export const StatusText = styled.p`
    font-size: 15px; 
    margin: 0; 
    font-weight: 600;
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    
    background-color: ${({ $isActive, theme }) => ($isActive ? theme.COLORS.SUCCESS_LIGHT : theme.COLORS.DANGER_LIGHT)};
    color: ${({ $isActive, theme }) => ($isActive ? theme.COLORS.SUCCESS : theme.COLORS.DANGER)};
`;

export const ScrollArea = styled.div`
    max-height: 400px;
    overflow-y: auto;
    padding-right: 8px;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.COLORS.GRAY_300};
        border-radius: 6px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

export const ProductsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Tr = styled.tr`
    &:not(:last-child) td {
        border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    }
`;

export const Td = styled.td`
    padding: 16px 12px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    font-size: 15px;
`;

export const ActionsRow = styled.div`
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    display: flex;
    justify-content: flex-end;
    gap: 12px; 
`;

const ActionButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: none;
    border-radius: 8px;
    color: ${({ theme }) => theme.COLORS.WHITE};
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const EditButton = styled(ActionButton)`
    background: ${({ theme }) => theme.COLORS.INFO};
`;

export const DeleteButton = styled(ActionButton)`
    background: ${({ theme }) => theme.COLORS.DANGER};
`;