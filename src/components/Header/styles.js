import styled from "styled-components";

export const Container = styled.header`
    grid-area: header;
    height: 105px;
    width: 100%;
    
    border-bottom: 1px solid ${({theme}) => theme.COLORS.GRAY_200}; 
    
    display: flex;
    align-items: center;
    justify-content: flex-end; 

    padding: 0 80px;
    background-color: ${({theme}) => theme.COLORS.GRAY_100};
`;

export const LogoutButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s;
    
    color: ${({ theme }) => theme.COLORS.GRAY_500};

    &:hover {
        color: ${({ theme }) => theme.COLORS.DANGER};
        background-color: ${({ theme }) => theme.COLORS.DANGER_LIGHT};
    }

    svg {
        font-size: 24px;
    }
`;