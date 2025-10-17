// src/pages/user/CartPage.tsx
import { useCartStore } from '../../store/cartStore';

export default function CartPage() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    getTotal, 
    clearCart,
    getItemCount 
  } = useCartStore();

  const handleCheckout = () => {
    alert('Đơn hàng của bạn đã được đặt thành công!');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Giỏ hàng trống</h3>
          <p className="text-gray-500 mb-4">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
          <a 
            href="/products" 
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Mua sắm ngay
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng ({getItemCount()} sản phẩm)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách sản phẩm */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border p-6 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{item.image}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {item.price.toLocaleString()} VND
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Số lượng */}
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 min-w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Tổng tiền sản phẩm */}
                  <p className="text-lg font-semibold min-w-32 text-right">
                    {(item.price * item.quantity).toLocaleString()} VND
                  </p>
                  
                  {/* Xóa */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tổng thanh toán */}
        <div className="bg-white rounded-lg shadow-sm border p-6 h-fit">
          <h3 className="text-xl font-bold mb-4">Tổng thanh toán</h3>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span>{getTotal().toLocaleString()} VND</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span className="text-green-600">Miễn phí</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-blue-600">{getTotal().toLocaleString()} VND</span>
            </div>
          </div>
          
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-bold text-lg"
          >
            Thanh toán
          </button>
          
          <button
            onClick={clearCart}
            className="w-full mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Xóa giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}