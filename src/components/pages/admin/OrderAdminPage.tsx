import type { Order } from "@/components/type/order";
import { useOrders, useUpdateOrder, useDeleteOrder } from "@/api/orderApi";

export default function OrderAdminPage() {
  const { data: orders = [], isLoading } = useOrders();
  const update = useUpdateOrder();
  const del = useDeleteOrder();

  if (isLoading) return <p className="p-4 text-center">Đang tải đơn hàng...</p>;

  const statusOptions: Order["status"][] = [
    "Đang chờ xử lý",
    "Đang xử lý",
    "Đã hoàn tất",
    "Đã hủy",
  ];

  const statusColor: Record<string, string> = {
    "Đang chờ xử lý": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Đang xử lý": "bg-blue-100 text-blue-800 border-blue-200",
    "Đã hoàn tất": "bg-green-100 text-green-800 border-green-200",
    "Đã hủy": "bg-gray-100 text-gray-600 border-gray-200",
  };

  const handleStatusChange = (order: Order, newStatus: string) => {
    if (newStatus !== order.status) {
      if (confirm(`Cập nhật trạng thái đơn ${order.id} sang "${newStatus}"?`)) {
        update.mutate({ id: order.id, data: { status: newStatus } });
      }
    }
  };

  const handleDelete = (order: Order) => {
    if (confirm(`Bạn có chắc muốn xóa đơn hàng ${order.id}?`)) {
      del.mutate(order.id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4"  > Quản lý đơn hàng</h1>

      <table className="w-full border border-gray-200 bg-white rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 border">Mã đơn</th>
            <th className="p-2 border">Khách hàng</th>
            <th className="p-2 border">Tổng tiền</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Ngày tạo</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o: Order) => {
            const colorClass = statusColor[o.status] || "bg-gray-100 text-gray-600";
            return (
              <tr key={o.id} className="hover:bg-gray-50 text-center">
                <td className="p-2 border">{o.id}</td>
                <td className="p-2 border">{o.customer}</td>
                <td className="p-2 border font-medium text-gray-900">
                  {o.total.toLocaleString()}₫
                </td>

                {/* ✅ Dropdown chọn trạng thái */}
                <td className="p-2 border">
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full border ${colorClass}`}
                    >
                      {o.status}
                    </span>
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>

                <td className="p-2 border">
                  {new Date(o.createdAt).toLocaleString("vi-VN")}
                </td>

                {/* Hành động */}
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleDelete(o)}
                    className="border border-red-500 text-red-600 px-2 py-1 rounded hover:bg-red-50"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {orders.length === 0 && (
        <p className="text-center text-gray-500 py-6">Chưa có đơn hàng nào</p>
      )}
    </div>
  );
}
