import styled from "styled-components";

export const ToastConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  p {
    margin: 0;
    font-size: 15px;
    font-weight: 500;
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
`;

export const ToastButtonConfirm = styled(ToastButton)`
  background: #EF4444; 
  color: white;

  &:hover {
    background: #DC2626;
  }
`;

export const ToastButtonCancel = styled(ToastButton)`
  background: #E5E7EB; 
  color: #374151;

  &:hover {
    background: #D1D5DB;
  }
`;