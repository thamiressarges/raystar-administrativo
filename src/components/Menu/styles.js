import styled from "styled-components";

export const Container = styled.aside`
    grid-area: menu;
    background-color: ${({theme}) => theme.COLORS.PRIMARY};
    padding-top: 40px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const MenuList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;

    > li {
        width: 100%;
        margin-bottom: 8px;
    }
`;