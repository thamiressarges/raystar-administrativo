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
  max-width: 600px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};

  > h1 {
    font-size: 48px;
    font-family: ${({ theme }) => theme.FONTS.SERIF};
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

  > div {
    margin-bottom: 8px;
  }
  
  > button {
    margin-top: 16px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center center;
  background-size: cover;
`;