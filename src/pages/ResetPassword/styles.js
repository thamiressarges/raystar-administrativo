import styled from "styled-components";
import background from '../../assets/background_forgot_password.jpg';

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
  max-width: 700px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};

  @media (max-width: 1024px) {
    padding: 0 60px;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    padding: 0 30px;
    max-width: 100%;
  }

  > h1 {
    font-size: 48px;
    font-family: ${({ theme }) => theme.FONTS.SERIF || 'serif'};
    color: ${({ theme }) => theme.COLORS.BLACK};
  }

  > h2 {
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 24px;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }

  > p {
    text-align: center;
    margin-bottom: 25px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    font-size: 14px;
  }
  
  > button {
    margin-top: 16px;
    width: 100%;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center center;
  background-size: cover;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.COLORS.DANGER};
  font-size: 12px;
  display: block;
  text-align: left;
  margin-top: 4px;
  margin-left: 4px;
`;