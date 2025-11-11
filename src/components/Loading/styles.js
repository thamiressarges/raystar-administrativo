import styled, { keyframes } from 'styled-components';

// Animação de rotação
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Overlay = styled.div`
  position: fixed; 
  inset: 0;
  background: rgba(255, 255, 255, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px); 
`;

export const Spinner = styled.div`
  color: ${({ theme }) => theme.COLORS.BLACK || '#000'};
  
  animation: ${spin} 1s linear infinite;
`;