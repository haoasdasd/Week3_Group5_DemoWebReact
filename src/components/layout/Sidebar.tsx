import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
      isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-56 bg-white border-r border-gray-200 min-h-screen p-4 space-y-2">
      <h2 className="text-gray-600 font-semibold text-sm uppercase mb-4">Quản trị</h2>
      <NavLink to="/admin/products" className={linkClass}>
        📦 Quản lý sản phẩm
      </NavLink>
      <NavLink to="/admin/orders" className={linkClass}>
        🧾 Quản lý đơn hàng
      </NavLink>
    </aside>
  );
}
