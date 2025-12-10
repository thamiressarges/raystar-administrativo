import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.COLORS.OVERLAY};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(2px);
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.COLORS.WHITE};
  width: 100%;
  max-width: 500px; 
  padding: 32px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  font-weight: 700;
  margin: 0;
`;

export const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  font-size: 14px;
  margin-top: -16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 600;
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }

  input,
  select {
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    width: 100%;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.COLORS.PRIMARY};
    }

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_400};
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end; 
  gap: 12px;
  margin-top: 16px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const CancelButton = styled.button`
  flex: 1;
  max-width: 140px;
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.COLORS.GRAY_100};
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_200};
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const SaveButton = styled.button`
  flex: 1;
  max-width: 160px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.COLORS.SUCCESS}; 
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.COLORS.SUCCESS_HOVER};
    transform: translateY(-1px);
  }
`;