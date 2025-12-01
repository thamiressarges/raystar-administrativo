import { Routes, Route, Navigate } from "react-router-dom";

// Autenticação
import { SignIn } from "../SignIn";
import { ResetPassword } from "../ResetPassword";

// Core
import { Profile } from "../Profile";
import { Settings } from "../Settings";
import { PrivateRoute } from "../../components/PrivateRoute/PrivateRoute";

// Pedidos
import { Order } from "../Order";
import { OrderDetails } from "../OrderDetails";

// Clientes
import { Clients } from "../Clients";
import { ClientsDetails } from "../ClientsDetails";

// Categorias
import { Category } from "../Category";
import { CategoryDetails } from "../CategoryDetails";

// Produtos
import { Products } from "../Products";
import { ProductsDetails } from "../ProductsDetails";
import { NewProduct } from "../NewProduct";

export function AppRoutes() {
  return (
    <Routes>
      {/* --- Rotas Públicas --- */}
      <Route path="/" element={<SignIn />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* --- Rotas Privadas --- */}
      
      {/* Pedidos */}
      <Route path="/order" element={<PrivateRoute><Order /></PrivateRoute>} />
      <Route path="/orderDetails/:id" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />

      {/* Clientes */}
      <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
      <Route path="/clientsDetails/:id" element={<PrivateRoute><ClientsDetails /></PrivateRoute>} />

      {/* Categorias */}
      <Route path="/category" element={<PrivateRoute><Category /></PrivateRoute>} />
      <Route path="/categoryDetails/:id" element={<PrivateRoute><CategoryDetails /></PrivateRoute>} />

      {/* Produtos */}
      <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
      <Route path="/products/new" element={<PrivateRoute><NewProduct /></PrivateRoute>} />
      <Route path="/productDetails/:id" element={<PrivateRoute><ProductsDetails /></PrivateRoute>} />

      {/* Configurações e Perfil */}
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

      {/* Redirecionamento para rotas inexistentes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}