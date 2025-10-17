// src/App.tsx
import { Routes, Route } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import HomePage from "./pages/user/HomePage";
import ProductPage from "./pages/user/ProductPage";
import ProductDetail from "./pages/user/ProductDetail";
import CartPage from "./pages/user/CartPage";
import AboutPage from "./pages/user/AboutPage";
import ContactPage from "./pages/user/ContactPage";

export default function App() {
  return (
    <Routes>
      {/* Chỉ giữ các route user - không cần đăng nhập */}
      <Route path="/" element={<UserLayout><HomePage /></UserLayout>} />
      <Route path="/products" element={<UserLayout><ProductPage /></UserLayout>} />
      <Route path="/products/:id" element={<UserLayout><ProductDetail /></UserLayout>} />
      <Route path="/cart" element={<UserLayout><CartPage /></UserLayout>} />
      <Route path="/about" element={<UserLayout><AboutPage /></UserLayout>} />
      <Route path="/contact" element={<UserLayout><ContactPage /></UserLayout>} />
      
      {/* Có thể thêm route login/register sau nếu cần */}
      <Route path="/login" element={<div>Login Page - Coming Soon</div>} />
      <Route path="/register" element={<div>Register Page - Coming Soon</div>} />
    </Routes>
  );
}