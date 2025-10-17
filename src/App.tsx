import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import useUserStore from "./store/userStore";
import OrdersPage from "./pages/orders/OrdersPage";

export default function App() {
  const { user } = useUserStore();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/dashboard"
        element={user ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />}
      />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  );
}
