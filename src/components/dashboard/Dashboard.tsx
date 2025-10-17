import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

// 🔹 Fetch dữ liệu thật từ products.json và orders.json
const fetchDashboardData = async () => {
  const [ordersRes, productsRes] = await Promise.all([
    fetch(`${API_URL}/orders`),
    fetch(`${API_URL}/products`),
  ]);

  if (!ordersRes.ok || !productsRes.ok)
    throw new Error("Không thể tải dữ liệu Dashboard");

  const orders = await ordersRes.json();
  const products = await productsRes.json();

  // ====== Xử lý thống kê ======
  // 1️⃣ Gom doanh thu và số đơn hàng theo tháng
  const statsByMonth: Record<
    string,
    { name: string; orders: number; sales: number }
  > = {};

  orders.forEach((o: any) => {
    const d = new Date(o.createdAt);
    const month = `Tháng ${d.getMonth() + 1}`;
    if (!statsByMonth[month])
      statsByMonth[month] = { name: month, orders: 0, sales: 0 };
    statsByMonth[month].orders++;
    statsByMonth[month].sales += o.total || 0;
  });

  const monthlyStats = Object.values(statsByMonth);

  // 2️⃣ Tổng tồn kho (tổng stock tất cả sản phẩm)
  const totalInventory = products.reduce(
    (sum: number, p: any) => sum + (p.stock || 0),
    0
  );

  // 3️⃣ Tổng doanh thu toàn hệ thống
  const totalRevenue = orders.reduce(
    (sum: number, o: any) => sum + (o.total || 0),
    0
  );

  return { monthlyStats, totalInventory, totalRevenue };
};

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  if (isLoading)
    return (
      <p className="text-center text-cyan-400 mt-10">Đang tải dữ liệu...</p>
    );

  const { monthlyStats, totalInventory, totalRevenue } = data || {
    monthlyStats: [],
    totalInventory: 0,
    totalRevenue: 0,
  };

  const totalOrders = monthlyStats.reduce((s, m) => s + m.orders, 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#101026] to-[#0b0c1d] text-white p-8">
      {/* Hiệu ứng nền hologram */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,80,200,0.1),transparent_70%)] blur-3xl pointer-events-none" />

      {/* Tiêu đề hologram */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 drop-shadow-[0_0_10px_#00ffff80]"
      >
        DASHBOARD SYSTEM
      </motion.h2>

      {/* Card thống kê nổi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 my-10">
        <GlassCard title="ĐƠN HÀNG" value={totalOrders.toString()} glow="cyan" />
        <GlassCard title="KHO HÀNG" value={totalInventory.toString()} glow="violet" />
        <GlassCard
          title="DOANH THU"
          value={totalRevenue.toLocaleString("vi-VN") + "₫"}
          glow="green"
        />
      </div>

      {/* Biểu đồ cột */}
      <ChartContainer title="Thống kê Đơn hàng & Doanh thu theo tháng">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                background: "#1e1e2f",
                border: "1px solid #22d3ee50",
                color: "#fff",
                borderRadius: "10px",
              }}
            />
            <Bar dataKey="orders" fill="#22d3ee" radius={[6, 6, 0, 0]} name="Đơn hàng" />
            <Bar dataKey="sales" fill="#a855f7" radius={[6, 6, 0, 0]} name="Doanh thu" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Biểu đồ đường */}
      <ChartContainer title="Biểu đồ doanh thu theo tháng">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                background: "#1e1e2f",
                border: "1px solid #22d3ee50",
                color: "#fff",
                borderRadius: "10px",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#00ffff"
              strokeWidth={3}
              dot={{ r: 6, fill: "#22d3ee", strokeWidth: 2, stroke: "#0ff" }}
              activeDot={{ r: 8, fill: "#a855f7", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

// ----- GlassCard (thẻ số liệu nổi) -----
function GlassCard({
  title,
  value,
  glow,
}: {
  title: string;
  value: string;
  glow: string;
}) {
  const glowColor =
    glow === "cyan"
      ? "shadow-cyan-400/40 border-cyan-400/30"
      : glow === "violet"
      ? "shadow-violet-400/40 border-violet-400/30"
      : "shadow-green-400/40 border-green-400/30";

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`bg-gradient-to-br from-[#1a1a30]/80 to-[#101025]/80 backdrop-blur-xl 
      rounded-2xl p-6 text-center border ${glowColor} shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
    >
      <h4 className="text-gray-400 text-sm mb-2 tracking-widest">{title}</h4>
      <p className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_10px_#22d3ee70]">
        {value}
      </p>
    </motion.div>
  );
}

// ----- Khung biểu đồ hologram -----
function ChartContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative mt-12 bg-gradient-to-br from-[#1a1a30]/80 to-[#101025]/80 backdrop-blur-lg border border-cyan-400/30 rounded-3xl shadow-[0_0_25px_#22d3ee50] p-8"
    >
      <div className="absolute -top-3 left-5 px-3 bg-cyan-600/30 text-xs uppercase tracking-wider border border-cyan-400/50 rounded-md">
        {title}
      </div>
      {children}
    </motion.div>
  );
}
