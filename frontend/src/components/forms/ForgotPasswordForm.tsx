import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const { darkMode } = useThemeStore();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Đang gửi mã OTP...");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );
      setMessage(res.data.message || "Đã gửi mã OTP qua email!");

      // Lưu email lại để dùng ở các bước sau
      localStorage.setItem("reset_email", email);
      setTimeout(() => navigate("/verify-otp"), 1200);
    } catch (err) {
      console.error("❌ Lỗi gửi OTP:", err);
      setMessage(err.response?.data?.message || "Gửi OTP thất bại!");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-pink-100 via-white to-purple-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`p-8 w-full max-w-md rounded-2xl ${
          darkMode
            ? "bg-gray-900/80 text-white"
            : "bg-white/90 text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          🔑 Quên mật khẩu
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-purple-500"
                  : "bg-gray-100 text-gray-800 focus:ring-pink-400"
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full mt-4 py-2 font-semibold rounded-lg transition-all ${
              darkMode
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 text-white"
            }`}
          >
            Gửi mã OTP
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("OTP") ? "text-green-500" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
}
