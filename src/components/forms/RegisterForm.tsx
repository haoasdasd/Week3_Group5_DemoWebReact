// ✅ src/components/forms/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/api/authApi";

type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    try {
      const res = await registerUser({
        username: data.username,
        password: data.password,
      });
      alert(res.message);
      navigate("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-cyan-400 via-blue-400 to-teal-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-96 max-w-[90%]"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-teal-700">
          ✨ Đăng ký tài khoản
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Tên đăng nhập</label>
            <input
              {...register("username")}
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Mật khẩu</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Xác nhận mật khẩu"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 transition"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
          >
            Đăng ký
          </motion.button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-teal-600 font-medium hover:underline">
            Đăng nhập
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
