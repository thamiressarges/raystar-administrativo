import { Routes, Route } from "react-router-dom";
import { SignIn } from "../SignIn";
import { ForgotPassword } from "../ForgotPassword"; 
import { Order } from "../Order"; 
import { Clients } from "../Clients"; 
import { Category } from "../Category";
import { Product } from "../Products";
import { Settings } from "../Settings";
import { OrderDetails } from "../OrderDetails";
//import { ClientDetails } from "../ClientDetails";
import { PrivateRoute } from "../../components/PrivateRoute/PrivateRoute";

export function AppRoutes(){
  return(
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<SignIn />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      {/* Rotas privadas */}
      <Route path="/order" element={<PrivateRoute><Order /></PrivateRoute>} />
      <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
      <Route path="/category" element={<PrivateRoute><Category /></PrivateRoute>} />
      <Route path="/products" element={<PrivateRoute><Product /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="/orderDetails" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
    </Routes>
  )
}
