// src/pages/user/ProductPage.tsx
import { useState } from 'react';
import ProductCard from '../user/components/ProductCard';

// Mock data
const products = [
  { id: 1, name: 'iPhone 14 Pro', price: 25990000, image: '📱', category: 'phone' },
  { id: 2, name: 'Samsung Galaxy S23', price: 18990000, image: '📱', category: 'phone' },
  { id: 3, name: 'MacBook Pro M2', price: 42990000, image: '💻', category: 'laptop' },
  { id: 4, name: 'Dell XPS 13', price: 32990000, image: '💻', category: 'laptop' },
  { id: 5, name: 'AirPods Pro', price: 5990000, image: '🎧', category: 'accessory' },
  { id: 6, name: 'Samsung Watch', price: 3990000, image: '⌚', category: 'accessory' },
];

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'phone', name: 'Điện thoại' },
    { id: 'laptop', name: 'Laptop' },
    { id: 'accessory', name: 'Phụ kiện' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Sản phẩm</h1>
      <p className="text-gray-600 mb-8">Khám phá các sản phẩm công nghệ mới nhất</p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">😔</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
          <p className="text-gray-500">Thử chọn danh mục khác</p>
        </div>
      )}
    </div>
  );
}