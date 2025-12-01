import styled from "styled-components";

export const Card = styled.div`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  width: 100%;
  border-radius: 12px;
  padding: 28px 32px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  margin-bottom: 24px;

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
    color: ${({ theme }) => theme.COLORS.GRAY_900};
    margin: 0;
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
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  text-transform: uppercase;
`;

export const InfoValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  word-break: break-word; 
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

export const DangerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.COLORS.DANGER};
  color: white;

  svg {
    font-size: 16px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.DANGER_HOVER};
  }
`;