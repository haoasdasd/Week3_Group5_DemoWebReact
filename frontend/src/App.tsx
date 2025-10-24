import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import ParticlesBg from "particles-bg";
import { useThemeStore } from "./store/themeStore";
import ThemeToggle from "./components/ThemeToggle";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import VerifyOtpForm from "./components/forms/VerifyOtpForm";
import ForgotPasswordForm from "./components/forms/ForgotPasswordForm";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPasswordForm from "./components/forms/ResetPasswordForm";
import AnimatedBackground from "./components/AnimatedBackground";

export default function App() {
  const { darkMode } = useThemeStore();
  const location = useLocation();

return (
  <div
    className={`relative min-h-screen transition-all duration-1000 overflow-hidden ${
      darkMode
        ? "bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white"
        : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800"
    }`}
  >
    {/* 🌌 Nền động */}
    <AnimatedBackground darkMode={darkMode} />

    {/* ⚙️ Nút đổi theme */}
    <div className="absolute top-5 right-5 z-20">
      <ThemeToggle />
    </div>

    {/* ✨ Hiệu ứng Particles */}
    <ParticlesBg
      type="cobweb"
      bg={false}
      color={darkMode ? "#ffffff" : "#a855f7"}
      num={50}
    />

    {/* 🔔 Toast */}
    <Toaster position="top-right" />

    {/* 🧭 Wrapper căn giữa tuyệt đối */}
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md px-6"
        >
          {/* 🧊 Container form (glass effect) */}
          <div
            className={`p-8 rounded-2xl shadow-2xl backdrop-blur-lg border ${
              darkMode
                ? "bg-white/10 border-white/20"
                : "bg-white/60 border-gray-200"
            }`}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LoginForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/verify-otp" element={<VerifyOtpForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/reset-password" element={<ResetPasswordForm />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);
}