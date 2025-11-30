import styled from "styled-components";

export const Container = styled.div`
    grid-area: brand;
    width: 100%;
    display: flex;
    justify-content: ${({ $isopen }) => $isopen ? 'space-between' : 'center'};
    align-items: center;

    padding: 24px;

    background-color: ${({theme}) => theme.COLORS.BLACK};
    
    border-bottom: 1px solid ${({theme}) => theme.COLORS.GRAY_800};

    > h1 {
        font-size: 28px;
        color: ${({theme}) => theme.COLORS.WHITE};
        
        font-family: ${({theme}) => theme.FONTS.SERIF}; 
        font-weight: 400;
        white-space: nowrap;
        
        animation: fadeIn 0.3s ease-in;
    }

    > button {
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s;

        color: ${({theme}) => theme.COLORS.GRAY_400};

        &:hover {
            color: ${({theme}) => theme.COLORS.WHITE};
            background-color: rgba(255, 255, 255, 0.1);
        }

        > svg {
            font-size: 24px;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;