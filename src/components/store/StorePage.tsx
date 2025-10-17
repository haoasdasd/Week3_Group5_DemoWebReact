import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function StorePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];
  const [customer, setCustomer] = useState("");

  // ✅ Lấy thông tin user từ localStorage 1 lần duy nhất
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleConfirm = async () => {
    console.log("👤 user trong StorePage:", user);

    if (!user) {
      alert("Vui lòng đăng nhập trước khi đặt hàng!");
      navigate("/login");
      return;
    }

    if (!customer.trim()) {
      alert("Vui lòng nhập tên khách hàng!");
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    // ✅ Lúc này username sẽ có giá trị chính xác
    const order = {
      username: user.username,
      customer,
      products: cart.map((p: any) => ({
        name: p.name,
        price: p.price,
        quantity: 1,
      })),
      total: cart.reduce((sum: number, p: any) => sum + p.price, 0),
    };

    console.log("📦 Gửi đơn hàng:", order);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      alert("🎉 Đặt hàng thành công!");
      navigate("/shop");
    } else {
      const err = await res.json().catch(() => ({}));
      alert(`❌ Lỗi khi đặt hàng: ${err.error || res.status}`);
    }
  };

  if (cart.length === 0)
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">Giỏ hàng trống.</p>
        <button
          onClick={() => navigate("/shop")}
          className="text-blue-600 underline"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Xác nhận đơn hàng
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="font-medium text-gray-700">
          Tài khoản:{" "}
          <span className="text-blue-600 font-semibold">{user?.username}</span>
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <label className="block font-medium mb-2 text-gray-700">
          Tên khách hàng (hiển thị):
        </label>
        <input
          type="text"
          placeholder="Nhập tên hiển thị..."
          className="border p-2 rounded w-full max-w-md focus:ring-2 focus:ring-blue-400 outline-none"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Sản phẩm trong giỏ hàng:</h2>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 border">Tên sản phẩm</th>
              <th className="p-2 border">Giá</th>
              <th className="p-2 border">Số lượng</th>
              <th className="p-2 border">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((p: any) => (
              <tr key={p.id} className="text-center">
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.price.toLocaleString()}₫</td>
                <td className="border p-2">1</td>
                <td className="border p-2">{p.price.toLocaleString()}₫</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xl font-semibold">
          Tổng tiền:{" "}
          <span className="text-blue-600">
            {cart
              .reduce((sum: number, p: any) => sum + p.price, 0)
              .toLocaleString()}
            ₫
          </span>
        </p>
        <button
          onClick={handleConfirm}
          className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
        >
          <FiCheckCircle /> Xác nhận mua hàng
        </button>
      </div>
    </div>
  );
}
