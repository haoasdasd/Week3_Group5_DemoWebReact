import { useState } from "react"; // useState quản lý trạng thái hiển thị mật khẩu
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "@/api/adminAuthApi";
import { FaEye, FaEyeSlash, FaUserShield, FaLock } from 'react-icons/fa';

type LoginFormData = {
  username: string;
  password: string;
};

export default function AdminLoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();
  // theo dõi việc hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false); 

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginAdmin(data);
      alert(res.message);

      //admin riêng
      localStorage.setItem("admin", JSON.stringify(res.admin));

      //nếu đang login admin thì xoá user token (chặn chéo)
      localStorage.removeItem("user");

      navigate("/admin/dashboard");
    } catch (err: any) {
      alert(err.message || "Đăng nhập thất bại");
    }
  };

  //chuyển hướng về trang login/home user
  const navigateToUserLogin = () => {
    navigate("/login"); 
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-gray-800 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        //chỉnh giao diện
        className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl p-10 w-full max-w-sm border border-gray-100" >
        <div className="text-center mb-8">
            <FaUserShield className="w-12 h-12 text-indigo-600 mx-auto mb-3"/>
            <h1 className="text-3xl font-extrabold text-gray-800">
                Đăng nhập Admin
            </h1>
            <p className="text-gray-500 text-sm mt-1">Đăng nhập Quản trị Hệ thống</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="relative">
            <input 
                {...register("username")} 
                type="text" 
                placeholder="Tên admin" 
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150 text-gray-700" 
            />
            <FaUserShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <input 
                {...register("password")} 
                type={showPassword ? "text" : "password"} 
                placeholder="Mật khẩu" 
                className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150 text-gray-700" 
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            {/*nút hiển thị/ẩn mật khẩu */}
            <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition duration-150">
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5" >
            Đăng nhập Admin
            
          </motion.button>
          {/* quay lại đăng nhập ng dùng */}
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            type="button" 
            onClick={navigateToUserLogin}
            className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-200 transition duration-300 shadow-sm">
            Quay lại Trang Người dùng
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}