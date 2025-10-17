import { Outlet, Link,  Navigate } from "react-router-dom";

export default function AdminLayout() {
  let admin = null;
  try {
    admin = JSON.parse(localStorage.getItem("admin") || "null");
  } catch {
    admin = null;
  }

  const user = localStorage.getItem("user");
  if (!admin || user) return <Navigate to="/login/admin" replace />;
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white p-4 space-y-3">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <nav className="space-y-2">
          <Link to="/admin/inventory" className="block hover:text-blue-300">
            Quản lý sản phẩm
          </Link>
          <Link to="/admin/orders" className="block hover:text-blue-300">
            Quản lý đơn hàng
          </Link>
            <Link to="/admin/user-orders" className="block hover:text-blue-300">    
            Đơn hàng người dùng
          </Link>
           <Link to="/admin/dashboard" className="block hover:text-blue-300">    
            Dashboard
          </Link>
          <Link to="/" className="block hover:text-blue-300">
            Trang chủ người dùng 
          </Link>
        </nav>
      </aside>

      {/* Nội dung */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}