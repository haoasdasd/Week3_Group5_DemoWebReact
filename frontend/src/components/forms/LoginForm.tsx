import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";

export default function LoginForm() {
  const navigate = useNavigate();
  const { darkMode } = useThemeStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Đang xử lý...");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form
      );
      localStorage.setItem("token", res.data.token);
      setMessage("Đăng nhập thành công!");
      setTimeout(() => navigate("/admin"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Đăng nhập thất bại!");
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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`p-8 w-full max-w-md rounded-2xl ${
          darkMode
            ? "bg-gray-900/80 text-white"
            : "bg-white/90 text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">🔑 Đăng nhập</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Nhập email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-purple-500"
                  : "bg-gray-100 text-gray-800 focus:ring-pink-400"
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Mật khẩu</label>
            <input
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={form.password}
              onChange={handleChange}
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
            Đăng nhập
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("thành công") ? "text-green-500" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className={`font-semibold underline-offset-4 hover:underline ${
              darkMode ? "text-purple-400" : "text-pink-500"
            }`}
          >
            Đăng ký ngay
          </Link>
          <br />
          <Link
            to="/forgot-password"
            className={`font-semibold underline-offset-4 hover:underline ${
              darkMode ? "text-purple-400" : "text-pink-500"
            }`}
          >
            Quên mật khẩu?
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
