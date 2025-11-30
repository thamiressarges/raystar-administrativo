import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.COLORS.OVERLAY};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
  backdrop-filter: blur(2px); /* Efeito moderno de desfoque */
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.COLORS.WHITE};
  width: 100%;
  max-width: 700px;
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

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: 16px; 
  align-items: flex-start; /* Alinhamento corrigido para evitar esticar inputs */
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 200px;

  &.small {
    flex: 0 1 140px; /* Largura fixa melhorada para campos pequenos */
  }
  
  label {
    font-weight: 600; 
    font-size: 14px; 
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }

  input {
    height: 48px;
    padding: 0 16px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
    width: 100%; 
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    transition: border-color 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.COLORS.PRIMARY};
      outline: none;
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_400};
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end; /* Botões alinhados à direita é padrão UX melhor */
  gap: 12px;
  margin-top: 16px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const ButtonBase = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  flex: 1;
  max-width: 200px; /* Impede botões gigantes */
`;

export const CancelButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.COLORS.GRAY_100};
  color: ${({ theme }) => theme.COLORS.GRAY_700};

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_200};
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const SaveButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.COLORS.BLACK};
  color: ${({ theme }) => theme.COLORS.WHITE};

  &:hover {
    background: ${({ theme }) => theme.COLORS.PRIMARY_HOVER};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;