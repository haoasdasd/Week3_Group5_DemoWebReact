import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/api/productApi";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

export default function ShopPage() {
  const { data: products = [], isLoading } = useProducts();
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();


  const isLoggedIn = Boolean(localStorage.getItem("user"));


  const toggleCart = (p: any) => {

    if (!isLoggedIn) {
      alert(" Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/login");
      return;
    }

    setCart((prev) =>
      prev.some((x) => x.id === p.id)
        ? prev.filter((x) => x.id !== p.id)
        : [...prev, p]
    );
  };


  const goToStore = (p?: any) => {
    if (!isLoggedIn) {
      alert(" Bạn cần đăng nhập để mua hàng!");
      navigate("/login");
      return;
    }

    const currentCart = p ? [p] : cart;
    if (currentCart.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm!");
      return;
    }

    navigate("/store", { state: { cart: currentCart } });
  };

  if (isLoading)
    return <p className="p-6 text-center text-gray-600">Đang tải sản phẩm...</p>;

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">🛍️ Cửa hàng</h1>
        <div className="flex items-center gap-3">
          <FiShoppingCart size={22} className="text-blue-600" />
          <span className="font-semibold text-gray-700">
            {cart.length} sản phẩm
          </span>
          <button
            onClick={() => goToStore()}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Thanh toán →
          </button>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {products.map((p) => {
          const selected = cart.some((x) => x.id === p.id);
          return (
            <div
              key={p.id}
              className={`border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-all ${
                selected ? "ring-2 ring-blue-400" : ""
              }`}
            >
              <img
                src={
                  p.imageUrl
                    ? `${import.meta.env.VITE_API_URL.replace("/data", "")}${p.imageUrl}`
                    : "https://via.placeholder.com/200x150?text=No+Image"
                }
                alt={p.name}
                className="w-full h-40 object-cover rounded-md"
              />

              <h3 className="font-semibold mt-3 text-gray-800 line-clamp-2">
                {p.name}
              </h3>
              <p className="text-blue-600 font-bold mt-1">
                {p.price.toLocaleString()}₫
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toggleCart(p)}
                  className={`flex-1 py-2 rounded-md font-medium flex items-center justify-center gap-2 transition ${
                    selected
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {selected ? (
                    <>
                      <FiTrash2 /> Bỏ chọn
                    </>
                  ) : (
                    <>
                      <FiShoppingCart /> Giỏ hàng
                    </>
                  )}
                </button>

                <button
                  onClick={() => goToStore(p)}
                  className="flex-1 py-2 rounded-md font-medium bg-green-500 hover:bg-green-600 text-white transition"
                >
                  Mua
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
