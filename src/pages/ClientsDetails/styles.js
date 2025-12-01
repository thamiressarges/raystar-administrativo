import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 80px;

  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
`;

export const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px; 
  
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  &:hover {
    color: ${({ theme }) => theme.COLORS.BLACK};
  }
  svg {
    width: 28px;
    height: 28px;
    color: currentColor;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  margin: 0;
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  width: 100%;
  border-radius: 12px;
  padding: 28px 32px;
  box-shadow: 0 8px 30px rgba(17, 24, 39, 0.06);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  
  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.COLORS.BLUE_700}; 
  }
  
  h3 {
    line-height: 1.2;
    font-size: 16px;
    font-weight: 700;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const InfoValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  word-break: break-word; /* Evita que emails longos quebrem o layout */
`;

export const ActionsRow = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #F3F4F6;
  display: flex;
  justify-content: flex-end;
  gap: 12px; 
`;

export const ErrorMessage = styled.p`
    color: #EF4444;
    font-weight: 500;
`;

const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  svg {
    font-size: 16px;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
  
  &:active {
    transform: scale(0.98);
    box-shadow: none;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: #2563eb;
  color: white;
`;

export const DangerButton = styled(BaseButton)`
  background-color: #ef4444;
  color: white;
`;