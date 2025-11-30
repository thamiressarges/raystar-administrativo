import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
`;

export const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  white-space: nowrap;

  th {
    font-weight: 600;
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_800};
    padding-bottom: 16px;
    border-bottom: 2px solid ${({ theme }) => theme.COLORS.GRAY_100};
  }

  td {
    font-size: 15px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    padding: 16px 0;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  }

  tr:last-child td {
    border-bottom: none;
  }

  th,
  td {
    padding-right: 24px;
  }

  td:last-child {
    text-align: right;
    padding-right: 0;
  }
`;