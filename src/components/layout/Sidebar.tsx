// src/components/layout/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/inventory', label: 'Quản lý kho', icon: '📦' },
    { path: '/orders', label: 'Quản lý đơn hàng', icon: '📋' },
    { path: '/profile', label: 'Hồ sơ', icon: '👤' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      {/* Logo */}
      <Link to="/dashboard" className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-bold">Admin Panel</span>
      </Link>

      {/* Navigation */}
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${
              location.pathname === item.path ? 'bg-gray-900 text-white' : 'text-gray-300'
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}