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

    > h1 {
        font-size: 48px;
        font-family: "Ibarra Real Nova", serif;
    }

    > h2 {
        font-size: 24px;
        margin-top: 50px;
        margin-bottom: 24px;
    }
`;

export const Options = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 24px;
  font-size: 14px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    input[type="checkbox"] {
      appearance: none; 
      width: 18px;
      height: 18px;
      border: 2px solid ${({ theme }) => theme.COLORS.GRAY_300};
      border-radius: 5px; 
      cursor: pointer;
      transition: 0.2s all ease-in-out;
      position: relative;
    }

    input[type="checkbox"]:checked {
      background-color: ${({ theme }) => theme.COLORS.BLACK};
      border-color: ${({ theme }) => theme.COLORS.BLACK};
    }

    input[type="checkbox"]:checked::after {
      content: "";
      position: absolute;
      top: 4px;
      left: 4px;
      width: 6px;
      height: 6px;
      background: white;
      border-radius: 5px; 
    }
  }

  a {
    color: ${({ theme }) => theme.COLORS.BLACK};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center center;
  background-size: cover;
`;