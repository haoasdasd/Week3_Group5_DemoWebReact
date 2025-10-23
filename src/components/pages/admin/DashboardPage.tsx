// src/components/pages/admin/DashboardPage.tsx
import { useMemo } from "react";
import { useProducts } from "@/api/productApi";
import { useOrders } from "@/api/orderApi";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid
} from "recharts";

interface PieLabelRenderProps {
  name?: string;
  percent?: number;
  [key: string]: any; 
}

export default function DashboardPage() {
  const { data: products = [] } = useProducts();
  const { data: orders = [] } = useOrders();

  //thống kê nhanh
  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    revenue: orders.reduce((sum, o) => sum + Number(o.total || 0), 0),
    inStock: products.filter(p => p.stock > 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock < 10).length,
    outStock: products.filter(p => p.stock === 0).length,
  };

  //biểu đồ cột tình trạng hàng 
  const stockChartData = [
  { name: "Còn nhiều", count: stats.inStock - stats.lowStock, fill: "#3b82f6" },
  { name: "Còn ít", count: stats.lowStock, fill: "#facc15" },
  { name: "Hết hàng", count: stats.outStock, fill: "#ef4444" },
];

  // biểu đồ tròn đơn hàng theo trạng thái
  const statusColors = { pending: "#facc15", shipped: "#3b82f6", delivered: "#10b981", cancelled: "#ef4444" };
  const statusData = Object.entries(
    orders.reduce((acc: Record<string, number>, o) => {
        const status = (o.status || "pending").toLowerCase(); // chuẩn hóa
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {})
    ).map(([status, count]) => ({ name: status, value: count }));


  //biểu đồ đường doanh số theo ngày
  const salesByDate = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach(o => {
      const date = new Date(o.createdAt).toLocaleDateString("vi-VN");
      map[date] = (map[date] || 0) + Number(o.total || 0);
    });
    return Object.entries(map)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, value]) => ({ date, value }));
  }, [orders]);

  return (
    <div className="space-y-6">
    <h1 className="text-3xl font-bold border-b pb-2 border-gray-300">Tổng quan</h1>
    <div className="grid md:grid-cols-3 gap-4"></div>
      <div className="grid md:grid-cols-3 gap-4">
        <Stat label="Tổng sản phẩm" value={stats.totalProducts} color="text-blue-600" />
        {/* table về user nhưng chưa có dl nên gắn tạm products  */}
        <Stat label="Tài khoản hiện hoạt động" value={stats.totalProducts} color="text-green-600" />
        <Stat label="Tổng đơn hàng" value={stats.totalOrders} color="text-green-600" />
        <Stat label="Doanh thu" value={stats.revenue.toLocaleString() + " ₫"} color="text-yellow-600" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Tình trạng hàng</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stockChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => [value, "Số lượng"]} />
                <Bar dataKey="count">
                    {stockChartData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                    ))}
                </Bar>
                </BarChart>

          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Đơn hàng theo trạng thái</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={statusData} dataKey="value" nameKey="name"   cx="50%" cy="50%" 
                outerRadius={100}
                label={({ name, percent }: PieLabelRenderProps) => {
                    if (name === undefined || percent === undefined) return '';
                    return `${name.toUpperCase()} (${(percent * 100).toFixed(1)}%)`;
                }}
                labelLine={false}>
                {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} 
                fill={statusColors[(entry.name as string).toLowerCase() as keyof typeof statusColors] || "#6e6a6aff"}/>

                ))}
              </Pie>
              {/*+ Tooltip */}
              <Tooltip formatter={(value: number) => [value, 'Số lượng đơn']} />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{ paddingLeft: '10px' }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

        {/* Biểu đồ đường doanh số */}
        <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Doanh số theo ngày</h3>
        <ResponsiveContainer width="100%" height={250}>
            <LineChart 
            data={salesByDate} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}> {/*chỉnh lề trái */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 10, right: 10 }} />
            <YAxis 
                tickFormatter={(value: number) => value.toLocaleString() + " ₫"} 
                width={90}
            />
            <Tooltip 
                formatter={(value: number) => [value.toLocaleString() + " ₫", 'Doanh số']} 
                labelFormatter={(label: string) => `Ngày: ${label}`} 
            />
            <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
        </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Đơn hàng gần đây</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">Mã đơn</th>
                <th className="p-2 border">Khách hàng</th>
                <th className="p-2 border">Tổng tiền</th>
                <th className="p-2 border">Ngày đặt</th>
                <th className="p-2 border">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(-10).reverse().map(o => (
                <tr key={o.id} className="border-b hover:bg-gray-50 text-center">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.customer || "Khách ẩn danh"}</td>
                  <td className="p-2">{Number(o.total || 0).toLocaleString()} ₫</td>
                  <td className="p-2">{new Date(o.createdAt).toLocaleDateString("vi-VN")}</td>
                  <td className="p-2 capitalize">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  );
}