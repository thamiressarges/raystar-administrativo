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

    > h1 {
        font-size: 48px;
        font-family: "Ibarra Real Nova", serif;
    }

    > h2 {
        font-size: 24px;
        margin-top: 50px;
        margin-bottom: 24px;
    }

    > p {
        text-align: justify;
        margin-bottom: 15px;
    }

    > a {
        color: ${({theme}) => theme.COLORS.BLACK};
        margin-top: 20px;
    }

    > a:hover {
        text-decoration: underline;
    }
`;



export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center center;
  background-size: cover;
`;