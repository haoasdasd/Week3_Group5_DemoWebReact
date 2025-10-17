import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AdminLayout from "@/components/pages/admin/AdminLayout";
import OrderAdminPage from "@/components/pages/admin/OrderAdminPage";
import StorePage from "@/components/store/StorePage";
import OrdersPage from "@/components/user/OrdersPage";
import InventoryPage from "@/components/pages/admin/InventoryPage";
import ShopPage from "@/components/store/ShopPage";
import LoginPage from "@/components/forms/LoginForm";
import RegisterPage from "@/components/forms/RegisterForm";
import AdminLoginPage from "@/components/forms/AdminLoginForm"; 
import OrdersPageUsers from "./components/pages/user/OrdersPageUsers";
import Dashboard from "@/components/dashboard/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect mặc định */}
        <Route path="/" element={<Navigate to="/shop" replace />} />

        {/* Layout người dùng */}
        <Route element={<Layout />}>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/ordersuser" element={<OrdersPageUsers />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Trang đăng nhập admin riêng (không nằm trong Layout) */}
        <Route path="/login/admin" element={<AdminLoginPage />} /> 

        {/* Layout admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="inventory" replace />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="orders" element={<OrderAdminPage />} />
          <Route path="user-orders" element={<OrdersPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <p className="p-6 text-center text-red-500 text-xl">
              404 - Không tìm thấy trang
            </p>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
