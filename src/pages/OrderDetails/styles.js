import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: ${({ $isopen }) => ($isopen ? '210px' : '80px')} auto;
    grid-template-rows: 105px auto;
    grid-template-areas:
        "brand header"
        "menu content";
    background-color: ${({theme}) => theme.COLORS.GRAY_100};
    transition: grid-template-columns 0.3s ease-in-out;
`;

export const Content = styled.div`
    grid-area: content;
    padding: 40px 80px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

// --- HEADER DA PÁGINA ---

export const PageTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const TitleInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    > svg {
        color: ${({ theme }) => theme.COLORS.BLACK};
    }

    > div {
        display: flex;
        flex-direction: column;
        
        h2 {
            font-size: 28px;
            font-weight: 700;
            color: ${({ theme }) => theme.COLORS.BLACK};
        }

        span {
            font-size: 14px;
            color: ${({ theme }) => theme.COLORS.GRAY_700};
        }
    }
`;

export const DeleteButton = styled.button`
    background-color: ${({ theme }) => theme.COLORS.RED};
    color: ${({ theme }) => theme.COLORS.WHITE};
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        opacity: rgba(0, 0, 0, 0, 0.1);
    }
`;

// --- CARDS ---

export const Card = styled.div`
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    width: 100%;
    border-radius: 10px;
    padding: 32px 40px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const CardTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};

    > svg {
        color: ${({ theme }) => theme.COLORS.PRIMARY};
    }

    h3 {
        font-size: 20px;
        font-weight: 600;
        color: ${({ theme }) => theme.COLORS.BLACK};
    }
`;

// --- COMPONENTES DE INFORMAÇÕES ---

export const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
`;

export const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const InfoLabel = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const InfoValue = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.COLORS.BLACK};
`;

// --- COMPONENTES DA TABELA ---

export const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 12px 0;
        text-align: left;
    }

    th {
        font-size: 14px;
        color: ${({ theme }) => theme.COLORS.GRAY_700};
        text-transform: uppercase;
        font-weight: 500;
        border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
        padding-bottom: 8px;
    }

    /* --- Alinha as colunas --- */
    .product-col { width: 50%; }
    .qty-col { text-align: center; }
    .price-col { text-align: left; }
    .total-col { text-align: right; }
`;

export const ProductRow = styled.tr`
    td {
        border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
        height: 100px;
        font-size: 16px;
        color: ${({ theme }) => theme.COLORS.BLACK};

        &:nth-child(2) {
            text-align: center;
        }
        &:nth-child(3) { 
            text-align: left;
        }
        &:nth-child(4) {
            text-align: right;
            
            strong {
                font-size: 18px;
                font-weight: 700;
            }
        }
    }
`;

export const ProductInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    img {
        width: 64px;
        height: 64px;
        object-fit: cover;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    span {
        font-size: 16px;
        font-weight: 500;
        color: ${({ theme }) => theme.COLORS.BLACK};
    }
`;

export const QuantityContainer = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 14px;
    font-weight: 500;
`;

// --- COMPONENTES DE STATUS ---

export const Status = styled.div`
    width: 100%;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;

    background-color: ${({ theme, $status }) => 
        $status === 'success' ? 'rgba(45, 212, 191, 0.1)' : 
        $status === 'warning' ? 'rgba(251, 191, 36, 0.1)' : 
        theme.COLORS.GRAY_200
    };
    
    color: ${({ theme, $status }) => 
        $status === 'success' ? '#065f46' : 
        $status === 'warning' ? '#b45309' : 
        theme.COLORS.BLACK
    };

    > svg {
        color: ${({ theme, $status }) => 
        $status === 'success' ? '#065f46' : 
        $status === 'warning' ? '#b45309' : 
        theme.COLORS.BLACK
    };
    }
`;

// --- COMPONENTES DO RESUMO ---

export const Summary = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    
    span:first-child {
        color: ${({ theme }) => theme.COLORS.GRAY_700};
    }

    span:last-child {
        color: ${({ theme }) => theme.COLORS.BLACK};
        font-weight: 500;
    }
`;

export const SummaryTotal = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.COLORS.BLACK};
    margin-top: 8px;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
`;