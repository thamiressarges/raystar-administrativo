import styled from "styled-components";

export const Item = styled.a`
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: ${({ $isopen }) => $isopen ? 'flex-start' : 'center'};
    padding-left: ${({ $isopen }) => $isopen ? '16px' : '0'};

    color: ${({ theme }) => theme.COLORS.WHITE};
    text-decoration: none;
    transition: background-color 0.2s;

    > svg {
        color: ${({ theme }) => theme.COLORS.WHITE};
        font-size: 22px;
        margin-right: ${({ $isopen }) => $isopen ? '12px' : '0'};
        flex-shrink: 0; 
    }

    > span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
    }

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.PRIMARY_HOVER};
    }
`;