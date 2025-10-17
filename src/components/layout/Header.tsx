// src/components/layouts/Header.tsx
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-gray-200 transition ${
      isActive ? "underline underline-offset-4 text-yellow-300" : ""
    }`;

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:text-gray-200"
        >
          MyStore
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm font-medium">
          <NavLink to="/" className={navLinkClass}>
            Trang chủ
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            Cửa hàng
          </NavLink>
          <NavLink to="/ordersuser" className={navLinkClass}>
            Đơn hàng
          </NavLink>
          {user ? (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
              className="hover:text-gray-200"
            >
              Đăng xuất ({user.username})
            </button>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Đăng nhập
            </NavLink>
          )}
            <NavLink to="/admin/inventory" className={navLinkClass}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
