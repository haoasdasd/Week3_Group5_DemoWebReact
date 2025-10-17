// src/components/pages/admin/InventoryPage.tsx
import { useState } from "react";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/api/productApi";
import { useQueryClient } from "@tanstack/react-query";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Product } from "@/components/type/product";

export default function InventoryPage() {
  const queryClient = useQueryClient();
  const { data: products = [], isLoading } = useProducts();
  const create = useCreateProduct();
  const update = useUpdateProduct();
  const del = useDeleteProduct();
  const BASE_URL = import.meta.env.VITE_API_URL.replace('/data', '');
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [filter, setFilter] = useState("");

  if (isLoading) return <p className="p-6 text-center">Đang tải sản phẩm...</p>;

  // thống kê nhỏ
  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.stock > 0).length,
    outStock: products.filter((p) => p.stock === 0).length,
    value: products.reduce((s, p) => s + p.price * p.stock, 0),
  };

    const chartData = [
    { name: "Còn hàng", count: products.filter((p) => p.stock >= 10).length },
    { name: "Hàng còn ít", count: products.filter((p) => p.stock > 0 && p.stock < 10).length },
    { name: "Hết hàng", count: stats.outStock },
    ];


  // Thêm / sửa sản phẩm
  const handleSubmit = async (form: FormData) => {
    if (editing?.id) await update.mutateAsync({ id: editing.id, data: form });
    else await create.mutateAsync(form);
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    setEditing(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
        <button
          onClick={() => setEditing({})}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FiPlus /> Thêm sản phẩm
        </button>
      </div>

      {/* Thống kê + biểu đồ */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Tổng sản phẩm" value={stats.total} color="text-blue-600" />
          <Stat label="Còn hàng" value={stats.inStock} color="text-green-600" />
          <Stat label="Hết hàng" value={stats.outStock} color="text-red-600" />
          <Stat label="Giá trị kho" value={stats.value.toLocaleString() + " ₫"} color="text-yellow-600" />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Tình trạng hàng</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className="w-full border rounded p-2 mb-4"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Bảng */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 border">Ảnh</th>
              <th className="p-2 border">Tên sản phẩm</th>
              <th className="p-2 border">Giá</th>
              <th className="p-2 border">Kho</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Cập nhật</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
              .map((p) => (
                <tr key={p.id} className="text-center hover:bg-gray-50">
                  <td className="p-2 border">
                    {p.imageUrl ? (
                        <img
                        src={`${BASE_URL}${p.imageUrl}`}
                        alt={p.name}
                        className="w-12 h-12 object-cover mx-auto rounded"
                        />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">{p.price.toLocaleString()} ₫</td>
                  <td className="p-2 border">{p.stock}</td>
                  <td className="p-2 border">{p.status}</td>
                  <td className="p-2 border text-xs text-gray-500">
                    {new Date(p.updatedAt ?? "").toLocaleString("vi-VN")}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button onClick={() => setEditing(p)} className="text-blue-600 hover:text-blue-800">
                      <FiEdit />
                    </button>
                    <button onClick={() => del.mutate(p.id)} className="text-red-600 hover:text-red-800">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal thêm / sửa */}
      {editing && (
        <ProductModal
          editing={editing}
          onClose={() => setEditing(null)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

// === Nhỏ gọn ===
function Stat({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

// === Modal thêm/sửa sản phẩm ===
function ProductModal({
  editing,
  onClose,
  onSubmit,
}: {
  editing: Partial<Product>;
  onClose: () => void;
  onSubmit: (form: FormData) => void;
}) {
type FormState = {
  name: string;
  price: number | string;
  stock: number | string;
  image: File | null;
};

const [form, setForm] = useState<FormState>({
  name: editing?.name ?? "",
  price: editing?.price ?? "",
  stock: editing?.stock ?? "",
  image: null,
});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("price", String(form.price));
    data.append("stock", String(form.stock));
    if (form.image) data.append("image", form.image);
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">
          {editing?.id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            name="price"
            value={form.price || ""}
            onChange={handleChange}
            placeholder="Giá (₫)"
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            name="stock"
            value={form.stock || ""}
            onChange={handleChange}
            placeholder="Số lượng tồn"
            className="w-full border rounded p-2"
            required
          />
          <input type="file" name="image" onChange={handleChange} className="w-full border rounded p-2" />
          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded hover:bg-gray-100">
              Hủy
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
