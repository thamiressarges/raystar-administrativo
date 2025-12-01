import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const SearchArea = styled.div`
    width: 100%;
    padding: 32px 80px 0;
`;

export const Content = styled.div`
    width: 100%;
    padding: 0 80px 20px;

    @media (max-width: 768px) {
        padding: 0 20px 20px;
    }
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

    p {
        font-size: 18px;
        font-weight: 500;
        color: ${({ theme }) => theme.COLORS.GRAY_400 || '#6B7280'};
    }
`;