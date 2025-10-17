import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Package,
  LogOut,
} from "lucide-react";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useUserStore();
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl rounded-3xl shadow-xl p-8 bg-[#1e293b]/80 border border-cyan-400/30 backdrop-blur-md"
      >
        {/* Ảnh đại diện và tên */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Customer"
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-md"
          />
          <h2 className="mt-4 text-2xl font-bold">{user || "Khách hàng"}</h2>
          <p className="text-sm text-gray-400">
            Thành viên từ 12/09/2024
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <Tab label="Thông tin cá nhân" active={activeTab === "info"} onClick={() => setActiveTab("info")} />
          <Tab label="Đơn hàng gần đây" active={activeTab === "orders"} onClick={() => setActiveTab("orders")} />
          <Tab label="Cài đặt bảo mật" active={activeTab === "security"} onClick={() => setActiveTab("security")} />
        </div>

        {/* Nội dung tab */}
        {activeTab === "info" && <InfoTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "security" && <SecurityTab onLogout={handleLogout} />}
      </motion.div>
    </div>
  );
}

/* ---- COMPONENT BUTTON ---- */
function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition ${
        active
          ? "bg-cyan-600 text-white shadow"
          : "bg-gray-700/40 text-gray-300 hover:bg-gray-600/40"
      }`}
    >
      {label}
    </button>
  );
}

/* ---- THÔNG TIN KHÁCH HÀNG ---- */
function InfoTab() {
  return (
    <div className="space-y-4">
      <Field icon={<User size={18} />} label="Họ và tên" value="Nguyễn Văn A" />
      <Field icon={<Mail size={18} />} label="Email" value="nguyenvana@example.com" />
      <Field icon={<Phone size={18} />} label="Số điện thoại" value="0901 234 567" />
      <Field icon={<MapPin size={18} />} label="Địa chỉ giao hàng" value="123 Lê Lợi, Quận 1, TP.HCM" />
      <Field icon={<Calendar size={18} />} label="Ngày đăng ký" value="12/09/2024" />
    </div>
  );
}

/* ---- ĐƠN HÀNG GẦN ĐÂY ---- */
function OrdersTab() {
  const orders = [
    { id: "DH001", date: "10/10/2025", status: "Đã giao", total: "1.200.000₫" },
    { id: "DH002", date: "05/10/2025", status: "Đang xử lý", total: "750.000₫" },
    { id: "DH003", date: "28/09/2025", status: "Đã hủy", total: "520.000₫" },
  ];

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <motion.div
          key={o.id}
          whileHover={{ scale: 1.02 }}
          className="flex justify-between items-center p-4 rounded-lg bg-gray-800/40 border border-gray-700/50"
        >
          <div>
            <p className="font-semibold flex items-center gap-2">
              <Package size={18} /> {o.id}
            </p>
            <p className="text-sm text-gray-400">{o.date}</p>
          </div>
          <div className="text-right">
            <p
              className={`text-sm font-medium ${
                o.status === "Đã giao"
                  ? "text-green-400"
                  : o.status === "Đang xử lý"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {o.status}
            </p>
            <p className="font-semibold">{o.total}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---- CÀI ĐẶT & BẢO MẬT ---- */
function SecurityTab({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="space-y-4">
      <Field icon={<Lock size={18} />} label="Mật khẩu" value="********" />
      <button className="w-full py-2 mt-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition">
        Đổi mật khẩu
      </button>

      <div className="pt-4 border-t border-gray-700 mt-4">
        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-red-400/50 text-red-300 hover:bg-red-500/10 transition"
        >
          <LogOut size={18} /> Đăng xuất
        </motion.button>
      </div>
    </div>
  );
}

/* ---- FIELD COMPONENT ---- */
function Field({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40 border border-gray-700/50">
      {icon && <div className="text-cyan-400">{icon}</div>}
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
