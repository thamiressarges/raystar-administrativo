import styled from "styled-components";
import background from '../../assets/background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Form = styled.form`
  padding: 0 136px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 600px;
  min-width: 600px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};

  > h1 {
    font-size: 48px;
    font-family: ${({ theme }) => theme.FONTS.SERIF};
    color: ${({ theme }) => theme.COLORS.BLACK};
  }

  > h2 {
    font-size: 24px;
    margin-top: 24px;
    margin-bottom: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const Toggle = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  background: transparent;
  padding: 0;
  margin-top: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};

  > button {
    flex: 1;
    background: transparent;
    border: none;
    padding: 16px;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.COLORS.GRAY_700};
    }

    &.active {
      color: ${({ theme }) => theme.COLORS.BLACK};
      font-weight: 700;
      border-bottom: 2px solid ${({ theme }) => theme.COLORS.BLACK};
    }
  }
`;

export const Options = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 24px;
  font-size: 14px;
`;

export const ForgotPasswordButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.COLORS.BLACK};
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center center;
  background-size: cover;
`;