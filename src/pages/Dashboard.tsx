import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const fetchMockData = async () => {
  return [
    { name: "Tháng 1", orders: 120, inventory: 85 },
    { name: "Tháng 2", orders: 90, inventory: 60 },
    { name: "Tháng 3", orders: 150, inventory: 100 },
  ];
};

export default function Dashboard() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchMockData,
  });

  if (isLoading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Thống kê bán hàng</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#8884d8" />
        <Bar dataKey="inventory" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
