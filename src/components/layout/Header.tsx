// src/components/layout/Header.tsx
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

export default function Header() {
  const itemCount = useCartStore(state => state.getItemCount());

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">Táo Store</span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Trang chủ
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              Sản phẩm
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              Giới thiệu
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Liên hệ
            </Link>
            
            {/* Giỏ hàng */}
            <Link to="/cart" className="flex items-center text-gray-700 hover:text-blue-600 relative">
              <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
              </svg>
              Giỏ hàng
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Nút đăng nhập đơn giản */}
            <Link 
              to="/login" 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Đăng nhập
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}