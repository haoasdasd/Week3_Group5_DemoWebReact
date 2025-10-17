// src/pages/user/HomePage.tsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Chào mừng đến với Táo Store</h1>
          <p className="text-xl mb-8">Khám phá các sản phẩm tuyệt vời với giá cả hợp lý</p>
          <Link 
            to="/products" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Mua sắm ngay
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Sản phẩm nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-gray-400 text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Điện thoại</h3>
              <p className="text-gray-600 mb-4">Các dòng smartphone mới nhất</p>
              <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                Xem ngay →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-gray-400 text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">Laptop</h3>
              <p className="text-gray-600 mb-4">Laptop gaming và văn phòng</p>
              <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                Xem ngay →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-gray-400 text-4xl mb-4">🎧</div>
              <h3 className="text-xl font-semibold mb-2">Phụ kiện</h3>
              <p className="text-gray-600 mb-4">Phụ kiện công nghệ đa dạng</p>
              <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                Xem ngay →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}