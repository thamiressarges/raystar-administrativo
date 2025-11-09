import styled from "styled-components";

export const Container = styled.header`
    grid-area: header;

    height: 105px;
    width: 100%;

    border-bottom: 1px solid ${({theme}) => theme.COLORS.BLACK};

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 80px;
    background-color: ${({theme}) => theme.COLORS.GRAY_100};

    > span {
        font-weight: bold;
    }
`;