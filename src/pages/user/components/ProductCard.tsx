// src/pages/user/components/ProductCard.tsx
import { useState } from 'react';
import { useCartStore } from '../../../store/cartStore';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addToCart);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    // Hiệu ứng loading và success
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="text-6xl text-center mb-4">{product.image}</div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          {product.price.toLocaleString()} VND
        </p>
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding || showSuccess}
          className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${
            isAdding 
              ? 'bg-gray-400 cursor-not-allowed' 
              : showSuccess
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isAdding ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang thêm...
            </span>
          ) : showSuccess ? (
            <span className="flex items-center justify-center">
              ✅ Đã thêm!
            </span>
          ) : (
            'Thêm vào giỏ'
          )}
        </button>
      </div>
    </div>
  );
}