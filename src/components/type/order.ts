// src/components/type/order.ts
export type OrderItem = {
  name: string;      // Tên sản phẩm
  price: number;     // Đơn giá
  quantity: number;  // Số lượng mua
};

export type OrderStatus = "Đang chờ xử lý" | "Đang xử lý" | "Đã hoàn tất" | "Đã hủy";

export type Order = {
  id: string;               // Mã đơn 
  customer: string;         // Tên khách hàng
  products: OrderItem[];    // Danh sách sản phẩm trong đơn
  total: number;            // Tổng tiền 
  status: OrderStatus;      // Trạng thái đơn hàng
  createdAt: string;        // Ngày tạo đơn
  updatedAt?: string;       // Ngày cập nhật gần nhất
};
