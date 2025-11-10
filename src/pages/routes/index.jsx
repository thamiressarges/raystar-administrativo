import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app.routes";
import { AuthProvider } from "../../contexts/AuthContext";

export function Routes(){
  return(
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
