import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
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
          <div>
            <label className="block text-gray-700 mb-1">Tên đăng nhập</label>
            <input
              {...register("username")}
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Mật khẩu</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
          >
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
