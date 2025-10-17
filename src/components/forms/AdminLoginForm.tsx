import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "@/api/adminAuthApi";

type LoginFormData = {
  username: string;
  password: string;
};

export default function AdminLoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginAdmin(data);
      alert(res.message);

      // ✅ Lưu admin riêng
      localStorage.setItem("admin", JSON.stringify(res.admin));

      // ✅ Nếu đang login admin thì xoá user token (chặn chéo)
      localStorage.removeItem("user");

      navigate("/admin/inventory");
    } catch (err: any) {
      alert(err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-96 max-w-[90%]"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
           Đăng nhập Quản trị
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("username")} type="text" placeholder="Tên admin" className="w-full p-3 rounded-lg border border-gray-300" />
          <input {...register("password")} type="password" placeholder="Mật khẩu" className="w-full p-3 rounded-lg border border-gray-300" />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit"
            className="w-full bg-gradient-to-r from-gray-700 to-black text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition">
            Đăng nhập Admin
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
