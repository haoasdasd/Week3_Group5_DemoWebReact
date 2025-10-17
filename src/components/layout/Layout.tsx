import { useNavigate, NavLink } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { motion } from "framer-motion";
import { LogOut, BarChart3, Package, ClipboardList, User } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  // Khi nhấn Logout → xóa user + về login
  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-gray-100 flex flex-col">
      {/* HEADER */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg py-4 px-6 flex justify-between items-center"
      >
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-2xl font-extrabold tracking-wide text-white drop-shadow-md cursor-pointer hover:text-cyan-300 transition"
        >
          🧭 Inventory Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-200 text-sm">👋 {user || "Khách"}</span>

          {/* Nút Logout*/}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
              bg-gradient-to-r from-red-500/30 to-rose-600/30
              border border-red-400/50 text-red-200 font-semibold
              hover:text-white hover:shadow-[0_0_12px_#f87171] transition-all duration-300"
          >
            <LogOut size={18} />
            <span>Đăng xuất</span>
          </motion.button>
        </div>
      </motion.header>

      {/* SIDEBAR + CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#1e293b]/70 backdrop-blur-md border-r border-gray-700 p-5 flex flex-col">
          <nav className="space-y-3">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow"
                    : "hover:bg-indigo-500/30 text-gray-300"
                }`
              }
            >
              <BarChart3 size={20} /> Dashboard
            </NavLink>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow"
                    : "hover:bg-indigo-500/30 text-gray-300"
                }`
              }
            >
              <Package size={20} /> Inventory
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow"
                    : "hover:bg-indigo-500/30 text-gray-300"
                }`
              }
            >
              <ClipboardList size={20} /> Orders
            </NavLink>

          </nav>

          <div className="mt-auto text-sm text-gray-500 text-center pt-4 border-t border-gray-700">
            © 2025 Group 5
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-[#0f172a]/50 to-[#1e293b]/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
