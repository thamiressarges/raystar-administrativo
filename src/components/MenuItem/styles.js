import styled from "styled-components";

export const Item = styled.a`
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;

    justify-content: ${({ $isopen }) => $isopen ? 'flex-start' : 'center'};
    
    padding-left: ${({ $isopen }) => $isopen ? '15px' : '0'};

    color: ${({theme}) => theme.COLORS.WHITE};
    text-decoration: none;

    > svg {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: 24px;
        margin-right: ${({ $isopen }) => $isopen ? '8px' : '0'};
        flex-shrink: 0; 
    }

    > span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &:hover {
        background-color: #1a1a1a;
        cursor: pointer;
    }
`;