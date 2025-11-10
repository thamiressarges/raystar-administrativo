import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer } from "./styles";

export function Toast() {
  return (
    <StyledToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}
