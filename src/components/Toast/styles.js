import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    background: #FFFFFF;
    color: #333;
  }

  .Toastify__toast--success {
    color: #4caf50;
    
    .Toastify__progress-bar {
      background: #4caf50;
    }
  }

  .Toastify__toast--error {
    color: #f44336;
    .Toastify__progress-bar {
      background: #f44336;
    }
  }
`;