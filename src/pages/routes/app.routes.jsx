import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import { DefaultLayout } from "../../layouts/DefaultLayout";

// Autenticação
import { SignIn } from "../SignIn";
import { ResetPassword } from "../ResetPassword";

// Componente de Proteção
import { PrivateRoute } from "../../components/PrivateRoute/PrivateRoute";

// Páginas
import { Profile } from "../Profile";
import { Settings } from "../Settings";
import { Order } from "../Order";
import { OrderDetails } from "../OrderDetails";
import { Clients } from "../Clients";
import { ClientsDetails } from "../ClientsDetails";
import { Category } from "../Category";
import { CategoryDetails } from "../CategoryDetails";
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
      <Route element={<PrivateRoute><DefaultLayout /></PrivateRoute>}>
        
        {/* Pedidos */}
        <Route path="/order" element={<Order />} />
        <Route path="/orderDetails/:id" element={<OrderDetails />} />

        {/* Clientes */}
        <Route path="/clients" element={<Clients />} />
        <Route path="/clientsDetails/:id" element={<ClientsDetails />} />

        {/* Categorias */}
        <Route path="/category" element={<Category />} />
        <Route path="/categoryDetails/:id" element={<CategoryDetails />} />

        {/* Produtos */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/productDetails/:id" element={<ProductsDetails />} />

        {/* Configurações e Perfil */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />

      </Route>

      {/* Rotas que não existem*/}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}