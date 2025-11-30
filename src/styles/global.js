import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${({ theme }) => theme.COLORS.GRAY_100};
        color: ${({ theme }) => theme.COLORS.GRAY_700};
        font-family: 'Poppins', sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button, textarea, select {
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        outline: none;
    }

    a {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }
    
    button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    ul, li {
        list-style: none;
    }
    
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.COLORS.GRAY_300};
        border-radius: 4px;
    }
`;