import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  }

  .Toastify__toast--success {
    background: #4caf50};
  }

  .Toastify__toast--error {
    background: #f44336};
  }

  .Toastify__progress-bar {
    background: #000};
  }
`;
