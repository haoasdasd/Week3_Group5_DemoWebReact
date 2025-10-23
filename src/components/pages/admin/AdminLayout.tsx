import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, LogOut, User, Home, Package, ClipboardList, BarChart3, UserCheck, User2 } from "lucide-react";

export default function AdminLayout() {
  // lấy admin từ localStorage
  let admin = null;
  try {
    admin = JSON.parse(localStorage.getItem("admin") || "null");
  } catch {
    admin = null;
  }

  const user = localStorage.getItem("user");
  if (!admin || user) return <Navigate to="/login/admin" replace />;

  const [openOrders, setOpenOrders] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/login/admin";
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-200 flex flex-col justify-between shadow-lg">
        <div>
          <div className="p-5 border-b border-gray-700 text-center">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              🛠️ Quản trị
            </h2>
          </div>

          <nav className="p-4 space-y-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-blue-600 text-white font-semibold" : "hover:bg-gray-800 hover:text-white"
                }`  } >
              <BarChart3 size={18} />
              <span>Tổng quan</span>
            </NavLink>
            <NavLink
              to="/admin/inventory"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-blue-600 text-white font-semibold" : "hover:bg-gray-800 hover:text-white"
                }`  }>
              <Package size={18} />
              <span>Quản lý sản phẩm</span>
            </NavLink>

            <NavLink
              to="/admin/usermanagement"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-gray-800 hover:text-white"
                }` }>
              <User2 size={18} /> 
              <span>Quản lý User</span>
            </NavLink>

            <div>
              <button
                onClick={() => setOpenOrders(!openOrders)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"  >
                <div className="flex items-center gap-2">
                  <ClipboardList size={18} />
                  <span>Quản lý đơn hàng</span>
                </div>
                <ChevronDown className={`w-4 h-4 transform transition ${openOrders ? "rotate-180" : ""}`} />
              </button>

              {openOrders && (
                <div className="ml-6 mt-1 space-y-1">
                  <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                        isActive ? "bg-blue-600 text-white font-semibold" : "hover:bg-gray-800 hover:text-white"
                      }` }  >
                    <ClipboardList size={16} />
                    <span>Danh sách đơn hàng</span>
                  </NavLink>

                  <NavLink
                    to="/admin/user-orders"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                        isActive ? "bg-blue-600 text-white font-semibold" : "hover:bg-gray-800 hover:text-white"
                      }` } >
                    <UserCheck size={16} />
                    <span>Đơn hàng người dùng</span>
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/" className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-blue-600 text-white font-semibold" : "hover:bg-gray-800 hover:text-white"
                }` }  >
              <Home size={18} />
              <span>Trang chủ người dùng</span>
            </NavLink>
          </nav>
        </div>

        {/* Thông tin admin + nút logout nhỏ */}
        <div className="p-4 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gray-800 p-2 rounded-full">
              <User size={18} />
            </div>
            <span className="text-sm font-medium truncate max-w-[100px]">
              {admin.username}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-red-500 hover:text-red-600 transition"
            title="Đăng xuất">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
