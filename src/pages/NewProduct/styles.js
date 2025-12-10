import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 24px 64px 48px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const BackLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${({ theme }) => theme.COLORS.WHITE};
  width: 40px;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.COLORS.BLACK};
    transform: translateX(-2px);
  }

  svg {
    font-size: 24px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto; 
`;

export const SaveButtonHeader = styled.button`
  background-color: #10B981; 
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;