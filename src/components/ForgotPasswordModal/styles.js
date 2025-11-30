import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.COLORS.OVERLAY};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 32px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.3s ease-out;
  margin: 20px;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 24px;
      color: ${({ theme }) => theme.COLORS.GRAY_900};
      font-weight: 700;
      margin: 0;
    }

    button {
      background: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.COLORS.GRAY_400};
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: ${({ theme }) => theme.COLORS.DANGER};
      }

      svg {
        font-size: 24px;
      }
    }
  }

  > p {
    font-size: 15px;
    color: ${({ theme }) => theme.COLORS.GRAY_600};
    line-height: 1.5;
    margin: 0;
  }
`;