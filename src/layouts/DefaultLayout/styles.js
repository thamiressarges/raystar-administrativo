import styled from "styled-components";

export const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: ${({ $isopen }) => ($isopen ? "210px" : "80px")} auto;
  grid-template-rows: 105px auto;
  grid-template-areas:
    "brand header"
    "menu content";
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  transition: grid-template-columns 0.3s ease-in-out;
`;

export const ContentWrapper = styled.main`
  grid-area: content;
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;