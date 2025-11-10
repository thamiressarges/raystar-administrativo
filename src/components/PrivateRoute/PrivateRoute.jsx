import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
