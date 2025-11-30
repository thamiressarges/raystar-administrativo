import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Overlay = styled.div`
  position: fixed; 
  inset: 0;
  background-color: rgba(255, 255, 255, 0.7); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

export const Spinner = styled.div`
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  display: flex; 
  align-items: center;
  justify-content: center;

  animation: ${spin} 1s linear infinite;
  
  filter: drop-shadow(0 0 2px rgba(0,0,0,0.1));
`;