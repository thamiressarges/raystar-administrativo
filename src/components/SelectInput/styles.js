import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  select {
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.COLORS.PRIMARY};
    }
  }
`;
