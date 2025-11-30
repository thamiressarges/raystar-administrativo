import styled from "styled-components";

export const ToastConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  p {
    margin: 0;
    font-size: 15px;
    font-weight: 500;
    color: ${({ theme }) => theme.COLORS.GRAY_800};
  }

  div {
    display: flex;
    gap: 8px;
  }
`;

export const ToastButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex-grow: 1; 
  font-size: 14px;
`;

export const ToastButtonConfirm = styled(ToastButton)`
  background: ${({ theme }) => theme.COLORS.DANGER}; 
  color: ${({ theme }) => theme.COLORS.WHITE};

  &:hover {
    background: ${({ theme }) => theme.COLORS.DANGER_HOVER};
  }
`;

export const ToastButtonCancel = styled(ToastButton)`
  background: ${({ theme }) => theme.COLORS.GRAY_200}; 
  color: ${({ theme }) => theme.COLORS.GRAY_700};

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_300};
  }
`;