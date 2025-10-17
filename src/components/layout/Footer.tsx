// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Táo Store</h3>
            <p className="text-gray-400 text-sm">
              Cung cấp các sản phẩm chất lượng với giá cả hợp lý.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm">Trang chủ</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white text-sm">Sản phẩm</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">Giới thiệu</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Chính sách</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Bảo mật</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Điều khoản</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Đổi trả</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <address className="text-gray-400 not-italic text-sm">
              <p>123 Đường ABC, Quận 1, TP.HCM</p>
              <p>Email: contact@taostore.com</p>
              <p>Điện thoại: (028) 1234 5678</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} YourStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}