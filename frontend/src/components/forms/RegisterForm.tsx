import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";

export default function RegisterForm() {
  const { darkMode } = useThemeStore();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Đang xử lý...");

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      setMessage(res.data.message || "Đăng ký thành công!");
    } catch (err) {
      console.error("❌ Lỗi đăng ký:", err);
      setMessage(
        err.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại!"
      );
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
        <h2 className="text-2xl font-bold mb-6 text-center">
          ✨ Đăng ký tài khoản
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Tên đăng nhập */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập"
              required
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-purple-500"
                  : "bg-gray-100 text-gray-800 focus:ring-pink-400"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              required
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-purple-500"
                  : "bg-gray-100 text-gray-800 focus:ring-pink-400"
              }`}
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block mb-1 text-sm font-medium">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-purple-500"
                  : "bg-gray-100 text-gray-800 focus:ring-pink-400"
              }`}
            />
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              required
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-purple-500"
                  : "bg-gray-100 text-gray-800 focus:ring-pink-400"
              }`}
            />
          </div>

          {/* Nút đăng ký */}
          <button
            type="submit"
            className={`w-full mt-4 py-2 font-semibold rounded-lg transition-all ${
              darkMode
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 text-white"
            }`}
          >
            Đăng ký
          </button>
        </form>

        {/* Hiển thị thông báo */}
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("thành công") ? "text-green-500" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        {/* Chuyển sang trang đăng nhập */}
        <p className="mt-6 text-center text-sm">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className={`font-semibold underline-offset-4 hover:underline ${
              darkMode ? "text-purple-400" : "text-pink-500"
            }`}
          >
            Đăng nhập ngay
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
