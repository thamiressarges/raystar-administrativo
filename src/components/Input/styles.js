import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    background-color: ${({ theme }) => theme.COLORS.WHITE};
    color: ${({ theme }) => theme.COLORS.GRAY_500};

    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
    border-radius: 10px;
    margin-bottom: 8px;
    
    transition: border-color 0.2s;

    &:focus-within {
        border-color: ${({ theme }) => theme.COLORS.PRIMARY};
    }

    > input {
        height: 56px;
        width: 100%;
        padding: 12px 16px;
        
        color: ${({ theme }) => theme.COLORS.GRAY_900};
        background: transparent;
        border: 0;
        font-size: 16px;

        &::placeholder {
            color: ${({ theme }) => theme.COLORS.GRAY_400};
        }

        &:focus {
            outline: none;
        }
    }

    > svg {
        margin-left: 16px;
        flex-shrink: 0; 
    }
`;