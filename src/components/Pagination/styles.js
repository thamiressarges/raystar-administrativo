import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 0;
    margin-top: 40px;
    margin-bottom: 40px;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

export const PaginationButton = styled.button`
    background-color: ${({ theme, $isactive }) => $isactive ? theme.COLORS.BLACK : theme.COLORS.WHITE};
    color: ${({ theme, $isactive }) => $isactive ? theme.COLORS.WHITE : theme.COLORS.BLACK};
    border: none;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    margin: 0;

    &:not(:last-child) {
        border-right: 1px solid rgba(0,0,0,0.2);
    }

    &:first-child {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    &:last-child {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    &:hover {
        background-color: ${({ theme, $isactive }) => $isactive ? theme.COLORS.BLACK : theme.COLORS.GRAY_100};
        color: ${({ theme, $isactive }) => $isactive ? theme.COLORS.WHITE : theme.COLORS.BLACK};
    }
`;