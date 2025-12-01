import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-columns: ${({ $isopen }) => ($isopen ? '210px' : '80px')} auto;
    grid-template-rows: 105px 128px auto;
    grid-template-areas:
        "brand header"
        "menu search"
        "menu content";

    background-color: ${({theme}) => theme.COLORS.GRAY_100};
    transition: grid-template-columns 0.3s ease-in-out;
`;

export const Search = styled.div`
    grid-area: search;
    padding: 20px 80px;
`;

export const Content = styled.div`
    grid-area: content;
    padding: 0 80px;
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    padding-bottom: 20px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
  text-align: center;

  color: '#9CA3AF'; 

  p {
      font-size: 18px;
      font-weight: 500;
      color: #6B7280;
    }
`;