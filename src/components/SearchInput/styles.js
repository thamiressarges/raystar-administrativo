import styled from "styled-components";

export const Container = styled.div`

  width: 100%;
  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px;
  overflow: hidden; 
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  input {
    flex: 1;
    height: 48px;
    border: none;
    outline: none;
    padding: 0 16px;
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.BLACK};
    background-color: transparent;

    &::placeholder {
      color: #999;
    }
  }
`;

export const SearchButton = styled.button`
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.COLORS.BLACK};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
 