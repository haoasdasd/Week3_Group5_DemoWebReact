import { useState, useEffect } from "react";
import { useOrders } from "@/api/orderApi";

export default function OrdersPage() {
  const { data: orders = [], isLoading, isError } = useOrders();
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rainbowIndex, setRainbowIndex] = useState(0);

  // Hiệu ứng cầu vồng cho tiêu đề
  useEffect(() => {
    const interval = setInterval(() => {
      setRainbowIndex((prev) => (prev + 1) % 7);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const rainbowColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-indigo-500",
    "text-purple-500",
  ];

  // ✅ Cấu hình trạng thái bằng tiếng Việt
  const statusConfig: Record<string, { text: string; color: string }> = {
    "Đang chờ xử lý": {
      text: "Đang chờ xử lý",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    "Đang xử lý": {
      text: "Đang xử lý",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    "Đã hoàn tất": {
      text: "Đã hoàn tất",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    "Đã hủy": {
      text: "Đã hủy",
      color: "bg-gray-100 text-gray-500 border-gray-200",
    },
  };

  // ✅ Lọc dữ liệu
  const filteredOrders = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(filter.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  // ✅ Thống kê
  const stats = {
    total: filteredOrders.length,
    pending: filteredOrders.filter((o) => o.status === "Đang chờ xử lý").length,
    processing: filteredOrders.filter((o) => o.status === "Đang xử lý").length,
    done: filteredOrders.filter((o) => o.status === "Đã hoàn tất").length,
  };

  // ✅ Loading / error
  if (isLoading)
    return <p className="p-6 text-center text-gray-500">Đang tải đơn hàng...</p>;
  if (isError)
    return <p className="p-6 text-center text-red-500">Không thể tải đơn hàng.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 transition-all duration-500 ${rainbowColors[rainbowIndex]}`}
          >
            Trạng thái và tiến độ đơn hàng
          </h1>
          <p
            className={`text-lg transition-all duration-500 ${
              rainbowColors[(rainbowIndex + 2) % 7]
            }`}
          >
            Theo dõi trạng thái và tiến độ giao hàng
          </p>
        </div>

        {/* Thống kê */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatBox label="Tổng đơn hàng" value={stats.total} color="text-gray-900" />
          <StatBox label="Chờ xử lý" value={stats.pending} color="text-yellow-600" />
          <StatBox label="Đang xử lý" value={stats.processing} color="text-blue-600" />
          <StatBox label="Hoàn thành" value={stats.done} color="text-green-600" />
        </div>

        {/* Bộ lọc */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tìm kiếm đơn hàng
              </label>
              <input
                type="text"
                placeholder="Nhập tên khách hàng..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lọc theo trạng thái
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="Đang chờ xử lý">Chờ xử lý</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đã hoàn tất">Hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bảng đơn hàng */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mã đơn
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Khách hàng
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ngày đặt
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => {
                  const conf =
                    statusConfig[o.status] ??
                    { text: "Không xác định", color: "bg-gray-100 text-gray-500" };
                  return (
                    <tr key={o.id} className="hover:bg-gray-50 text-sm">
                      <td className="p-3 border-b">#{o.id}</td>
                      <td className="p-3 border-b">{o.customer}</td>
                      <td className="p-3 border-b">
                        {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="p-3 border-b">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${conf.color}`}
                        >
                          {conf.text}
                        </span>
                      </td>
                      <td className="p-3 border-b font-medium text-gray-900">
                        {o.total.toLocaleString()}₫
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-3">📦</div>
              <h3 className="text-base font-medium text-gray-900 mb-1">
                Không có đơn hàng nào
              </h3>
              <p className="text-gray-500 text-sm">
                Hãy thử thay đổi bộ lọc hoặc quay lại sau
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Box thống kê nhỏ gọn
function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}
