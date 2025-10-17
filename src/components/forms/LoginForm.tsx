import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "@/api/authApi";

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data);
      alert(res.message);

      // ✅ Lưu vào localStorage riêng cho user
      localStorage.setItem("user", JSON.stringify(res.user));

      // ✅ Nếu đang là user thì xoá bất kỳ token admin nào (ngăn chéo)
      localStorage.removeItem("admin");

      navigate("/shop");
    } catch (err: any) {
      alert(err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-96 max-w-[90%]"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          👋 Chào mừng trở lại
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("username")} type="text" placeholder="Tên đăng nhập" className="w-full p-3 rounded-lg border border-gray-300" />
          <input {...register("password")} type="password" placeholder="Mật khẩu" className="w-full p-3 rounded-lg border border-gray-300" />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition">
            Đăng nhập
          </motion.button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
