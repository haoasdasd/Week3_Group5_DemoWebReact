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

const fetchMockData = async () => {
  return [
    { name: "Tháng 1", orders: 120, inventory: 85, sales: 20 },
    { name: "Tháng 2", orders: 90, inventory: 60, sales: 35 },
    { name: "Tháng 3", orders: 150, inventory: 100, sales: 50 },
    { name: "Tháng 4", orders: 180, inventory: 130, sales: 75 },
    { name: "Tháng 5", orders: 200, inventory: 150, sales: 95 },
  ];
};

export default function Dashboard() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchMockData,
  });

  if (isLoading)
    return (
      <p className="text-center text-cyan-400 mt-10">Đang tải dữ liệu...</p>
    );

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
        <GlassCard title="ĐƠN HÀNG" value="540" glow="cyan" />
        <GlassCard title="KHO HÀNG" value="320" glow="violet" />
        <GlassCard title="DOANH THU" value="45,000,000₫" glow="green" />
      </div>

      {/* Biểu đồ cột */}
      <ChartContainer title="Thống kê Đơn hàng & Tồn kho">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
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
            <Bar dataKey="orders" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            <Bar dataKey="inventory" fill="#a855f7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Biểu đồ đường - Năng suất bán hàng */}
      <ChartContainer title="Năng suất bán hàng (Doanh thu)">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
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

// Card kiểu hologram
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

// Khung biểu đồ hologram
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
