import styled from "styled-components";

export const Container = styled.aside`
    grid-area: menu;
    
    background-color: ${({theme}) => theme.COLORS.BLACK};

    padding-top: 40px;

    overflow: hidden;
`;

export const MenuList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

    > li {
        margin-bottom: 20px;
    }
`;