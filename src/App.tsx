import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/profile"; // tên file nên viết hoa P
import Layout from "./components/layout/Layout";
import useUserStore from "./store/userStore";

export default function App() {
  const { user } = useUserStore();

  return (
    <Routes>
      {/* Mặc định chuyển hướng về trang login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Form đăng nhập / đăng ký */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          user ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
