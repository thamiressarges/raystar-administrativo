import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.GRAY_800 || "#555"};
    padding-bottom: 12px;
  }

  td {
    color: ${({ theme }) => theme.COLORS.BLACK};
    padding: 14px 0;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200 || "#eee"};
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
  }
`;

