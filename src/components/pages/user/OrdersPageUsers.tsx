import { useEffect, useState } from "react";

export default function OrdersPageUsers() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/orders?username=${user.username}`
        );
        if (!res.ok) throw new Error("Không tải được đơn hàng");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("❌ Lỗi tải đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-600 mb-4">Vui lòng đăng nhập để xem đơn hàng.</p>
        <a
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Đăng nhập
        </a>
      </div>
    );
  }

  if (loading) return <p className="p-6">Đang tải...</p>;

  if (orders.length === 0)
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
        <a href="/shop" className="text-blue-600 underline">
          Mua sắm ngay
        </a>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Đơn hàng của bạn</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow rounded-lg p-4 border">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg text-gray-700">
                Mã đơn: {order.id.slice(0, 8).toUpperCase()}
              </h2>
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  order.status === "Đang chờ xử lý"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Ngày đặt: {new Date(order.createdAt).toLocaleString("vi-VN")}
            </p>

            <ul className="divide-y text-sm">
              {order.products.map((p: any, i: number) => (
                <li key={i} className="py-1 flex justify-between">
                  <span>{p.name}</span>
                  <span>{p.price.toLocaleString()}₫</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 text-right font-semibold text-blue-600">
              Tổng cộng: {order.total.toLocaleString()}₫
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
