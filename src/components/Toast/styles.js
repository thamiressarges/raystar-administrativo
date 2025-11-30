import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 12px;
    font-weight: 500;
    background: ${({ theme }) => theme.COLORS.WHITE};
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .Toastify__toast--success {
    color: ${({ theme }) => theme.COLORS.SUCCESS};
    
    svg {
        fill: ${({ theme }) => theme.COLORS.SUCCESS};
    }

    .Toastify__progress-bar {
      background: ${({ theme }) => theme.COLORS.SUCCESS};
    }
  }

  .Toastify__toast--error {
    color: ${({ theme }) => theme.COLORS.DANGER};

    svg {
        fill: ${({ theme }) => theme.COLORS.DANGER};
    }

    .Toastify__progress-bar {
      background: ${({ theme }) => theme.COLORS.DANGER};
    }
  }

  .Toastify__toast--warning {
    color: ${({ theme }) => theme.COLORS.WARNING};

    svg {
        fill: ${({ theme }) => theme.COLORS.WARNING};
    }

    .Toastify__progress-bar {
      background: ${({ theme }) => theme.COLORS.WARNING};
    }
  }
`;