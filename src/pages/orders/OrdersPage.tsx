// src/pages/orders/OrdersPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Định nghĩa type cho Order
type Order = {
  id: number;
  customer: string;
  status: 'pending' | 'preparing' | 'delivering' | 'done';
  date: string;
  total: number;
};

// Mock data với type cụ thể
const mockOrders: Order[] = [
  { id: 1, customer: 'Trần Huỳnh Trọng', status: 'pending', date: '2025-10-01', total: 500000 },
  { id: 2, customer: 'Trần Thị Hiền', status: 'preparing', date: '2023-10-02', total: 750000 },
  { id: 3, customer: 'Lê Văn Chính', status: 'delivering', date: '2023-10-03', total: 300000 },
  { id: 4, customer: 'Phạm Thị Dung', status: 'done', date: '2023-10-04', total: 1200000 },
  { id: 5, customer: 'Hoàng Văn Dũng', status: 'pending', date: '2023-10-05', total: 450000 },
  { id: 6, customer: 'Vũ Thị Khánh Huyền', status: 'preparing', date: '2023-10-06', total: 890000 },
  { id: 7, customer: 'Đặng Văn Việt', status: 'delivering', date: '2023-10-07', total: 670000 },
  { id: 8, customer: 'Bùi Thị Hân', status: 'done', date: '2023-10-08', total: 340000 },
  { id: 9, customer: 'Ngô Văn Việt', status: 'pending', date: '2023-10-09', total: 1200000 },
  { id: 10, customer: 'Lý Thị Dung', status: 'preparing', date: '2023-10-10', total: 550000 },
  { id: 11, customer: 'Trương Văn Linh', status: 'delivering', date: '2023-10-11', total: 780000 },
  { id: 12, customer: 'Phan Thị Huyền Trang', status: 'done', date: '2023-10-12', total: 920000 },
];

// Component chính
export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [rainbowIndex, setRainbowIndex] = useState(0);

  // Hiệu ứng cầu vồng cho tiêu đề
  useEffect(() => {
    const interval = setInterval(() => {
      setRainbowIndex((prev) => (prev + 1) % 7);
    }, 500); // Thay đổi màu mỗi 0.5 giây

    return () => clearInterval(interval);
  }, []);

  // Màu sắc cầu vồng
  const rainbowColors = [
    'text-red-500', // Đỏ
    'text-orange-500', // Cam
    'text-yellow-500', // Vàng
    'text-green-500', // Lục
    'text-blue-500', // Lam
    'text-indigo-500', // Chàm
    'text-purple-500', // Tím
  ];

  // Reset về trang 1 khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, statusFilter]);

  // Hàm quay lại dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Hàm cập nhật trạng thái
  const updateStatus = (id: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  // Lọc đơn hàng
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Màu sắc và text cho từng trạng thái
  const statusConfig = {
    pending: { text: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    preparing: { text: 'Đang chuẩn bị', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    delivering: { text: 'Đang giao hàng', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    done: { text: 'Hoàn thành', color: 'bg-green-100 text-green-800 border-green-200' }
  } as const;

  // Các bước tiếp theo cho từng trạng thái
  const nextSteps: Record<Order['status'], Order['status'][]> = {
    pending: ['preparing'],
    preparing: ['delivering'],
    delivering: ['done'],
    done: []
  };

  // Thống kê
  const stats = {
    total: filteredOrders.length,
    pending: filteredOrders.filter(o => o.status === 'pending').length,
    processing: filteredOrders.filter(o => o.status === 'preparing' || o.status === 'delivering').length,
    done: filteredOrders.filter(o => o.status === 'done').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header với nút quay lại và hiệu ứng cầu vồng */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className={`text-3xl font-bold mb-2 transition-all duration-500 ${rainbowColors[rainbowIndex]}`}>
              Quản lý đơn hàng
            </h1>
            <p className={`text-lg transition-all duration-500 ${rainbowColors[(rainbowIndex + 2) % 7]}`}>
              Theo dõi và cập nhật trạng thái đơn hàng
            </p>
          </div>
          <button
            onClick={handleBackToDashboard}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại Dashboard
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500 mt-1">Tổng đơn hàng</div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-500 mt-1">Chờ xử lý</div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.processing}</div>
            <div className="text-sm text-gray-500 mt-1">Đang xử lý</div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
            <div className="text-3xl font-bold text-green-600">{stats.done}</div>
            <div className="text-sm text-gray-500 mt-1">Hoàn thành</div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tìm kiếm đơn hàng
              </label>
              <input
                type="text"
                placeholder="Nhập tên khách hàng..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            {/* Status filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lọc theo trạng thái
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="preparing">Đang chuẩn bị</option>
                <option value="delivering">Đang giao hàng</option>
                <option value="done">Hoàn thành</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table - COMPACT VERSION */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">#{order.id}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusConfig[order.status].color}`}>
                        {statusConfig[order.status].text}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.total.toLocaleString()} VND
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-1">
                        {nextSteps[order.status].map((nextStatus) => (
                          <button
                            key={nextStatus}
                            onClick={() => updateStatus(order.id, nextStatus)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
                          >
                            {statusConfig[nextStatus as keyof typeof statusConfig].text}
                          </button>
                        ))}
                        {order.status === 'done' && (
                          <span className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-800 bg-green-100">
                            Đã hoàn thành
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-3">📦</div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Không tìm thấy đơn hàng</h3>
              <p className="text-gray-500 text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </div>

        {/* Pagination - COMPACT VERSION */}
        {filteredOrders.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">{indexOfFirstItem + 1}</span> đến{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredOrders.length)}
              </span>{' '}
              trong <span className="font-medium">{filteredOrders.length}</span> kết quả
            </div>
            
            <div className="flex items-center space-x-1">
              {/* Nút Previous */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm rounded border transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                ←
              </button>

              {/* Các nút số trang */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`px-3 py-1 text-sm rounded border transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Nút Next */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm rounded border transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}