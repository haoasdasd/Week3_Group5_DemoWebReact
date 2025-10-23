
import { useState } from "react";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/api/productApi";
import { useQueryClient } from "@tanstack/react-query";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Swal from "sweetalert2";
import type { Product } from "@/components/type/product";

export default function InventoryPage() {
  const queryClient = useQueryClient();
  const { data: products = [], isLoading } = useProducts();
  const create = useCreateProduct();
  const update = useUpdateProduct();
  const del = useDeleteProduct();
  const BASE_URL = import.meta.env.VITE_API_URL.replace("/data", "");

  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (isLoading) return <p className="p-6 text-center">Đang tải sản phẩm...</p>;

  // thống kê nhỏ
  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.stock > 0).length,
    outStock: products.filter((p) => p.stock === 0).length,
    value: products.reduce((s, p) => s + p.price * p.stock, 0),
  };

  // dữ liệu biểu đồ cột
  const chartData = [
    { name: "Còn hàng", count: products.filter((p) => p.stock >= 10).length },
    {
      name: "Hàng còn ít",
      count: products.filter((p) => p.stock > 0 && p.stock < 10).length,
    },
    { name: "Hết hàng", count: stats.outStock },
  ];

  // thêm / sửa sản phẩm
  const handleSubmit = async (form: FormData) => {
    if (editing?.id) await update.mutateAsync({ id: editing.id, data: form });
    else await create.mutateAsync(form);
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    setEditing(null);
  };

  // hàm xóa có xác nhận sweetAlert2
  const handleDelete = async (id: number | string, name: string) => {
  const result = await Swal.fire({
    title: "Xác nhận xoá?",
    text: `Bạn có chắc muốn xoá sản phẩm "${name}" không? Hành động này không thể hoàn tác.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xoá",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      await del.mutateAsync(String(id)); // lúc đầu là kiểu khác, bên dữ liệu là string nên tui ép kiểu sang string
      await queryClient.invalidateQueries({ queryKey: ["products"] });

      Swal.fire("Đã xoá!", `Sản phẩm "${name}" đã được xoá.`, "success");
    } catch (error) {
      Swal.fire("Lỗi!", "Không thể xoá sản phẩm.", "error");
    }
  }
};

  // lọc + tìm kiếm
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    .filter((p) => {
      if (statusFilter === "inStock") return p.stock >= 10;
      if (statusFilter === "lowStock") return p.stock > 0 && p.stock < 10;
      if (statusFilter === "outStock") return p.stock === 0;
      return true;
    });

  // phân trang sản phẩm
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold border-b pb-2 border-gray-300">Quản lý sản phẩm</h1>
        <button
          onClick={() => setEditing({})}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FiPlus /> Thêm sản phẩm
        </button>
      </div>

      {/* thống kê + biểu đồ cột */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Tổng sản phẩm" value={stats.total} color="text-blue-600" />
          <Stat label="Còn hàng" value={stats.inStock} color="text-green-600" />
          <Stat label="Hết hàng" value={stats.outStock} color="text-red-600" />
          <Stat
            label="Giá trị kho"
            value={stats.value.toLocaleString() + " ₫"}
            color="text-yellow-600"
          />
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

      {/* bộ lọc nhỏ gọn */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full md:w-1/3 border rounded p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Tất cả</option>
          <option value="inStock">Còn nhiều (≥ 10)</option>
          <option value="lowStock">Còn ít (&lt; 10)</option>
          <option value="outStock">Hết hàng</option>
        </select>
      </div>

      {/* bảng sản phẩm */}
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
            {paginated.map((p) => {
              let rowColor = "";// này là màu nền theo số lượng tồn của sp trong kho
              if (p.stock >= 10) rowColor = "bg-green-50"; // nhiều thì xanh lá
              else if (p.stock > 0) rowColor = "bg-yellow-50"; // còn ít thì vàng
              else rowColor = "bg-red-50";// hết hàng thì đỏ

              return (
                <tr key={p.id} className={`text-center hover:bg-gray-100 ${rowColor}`}>
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
                  <td className="p-2 border">
                    {p.stock === 0
                      ? "Hết hàng"
                      : p.stock < 10
                      ? "Còn ít"
                      : "Còn nhiều"}
                  </td>
                  <td className="p-2 border text-xs text-gray-500">
                    {new Date(p.updatedAt ?? "").toLocaleString("vi-VN")}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => setEditing(p)}
                      className="text-blue-600 hover:text-blue-800">
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="text-red-600 hover:text-red-800">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* phân trang 1 trang tối đa 6 sản phẩm */} 
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50">
          «
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50">
          »
        </button>
      </div>

      {/* modal thêm, sửa */}
      {editing && (
        <ProductModal
          editing={editing}
          onClose={() => setEditing(null)}
          onSubmit={handleSubmit}/>
      )}
    </div>
  );
}

// thành phần nhỏ gọn
  function Stat({
    label,
    value,
    color,
  }: {
    label: string;
    value: string | number;
    color: string;
  }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    );
  }

// modal thêm/sửa sản phẩm
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
      category: string;
      description: string;
      image: File | null;
    };

    const [form, setForm] = useState<FormState>({
      name: editing?.name ?? "",
      price: editing?.price ?? "",
      stock: editing?.stock ?? "",
      category: editing?.updatedAt ?? "",//chưa có category trong product nên thay bằng updatedAt
      description: editing?.status ?? "",//chưa có description trong product nên thay bằng status
      image: null,
    });

    const [preview, setPreview] = useState<string | null>(
      editing?.imageUrl ? editing.imageUrl : null
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, files } = e.target as HTMLInputElement;
      if (files && files.length > 0) {
        const file = files[0];
        setForm({ ...form, image: file });
        setPreview(URL.createObjectURL(file));
      } else {
        setForm({ ...form, [name]: value });
      }
    };

    const handleRemoveImage = () => {
      setForm({ ...form, image: null });
      setPreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", String(form.price));
      data.append("stock", String(form.stock));
      data.append("category", form.category);
      data.append("description", form.description);
      if (form.image) data.append("image", form.image);
      onSubmit(data);
    };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg space-y-4 shadow-lg">
        <h2 className="text-lg font-semibold">
          {editing?.id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* tên sản phẩm */}
          <input
            type="text" name="name" value={form.name} onChange={handleChange}
            placeholder="Tên sản phẩm" className="w-full border rounded p-2" required
          />
          {/* danh mục */}
          <input
            type="text" name="category" value={form.category}
            onChange={handleChange}
            placeholder="Danh mục (VD: Điện thoại)"className="w-full border rounded p-2"
          />
          {/* giá và số lượng */}
          <div className="flex gap-3">
            <input
              type="number" name="price" value={form.price || ""}
              onChange={handleChange}
              placeholder="Giá (₫)" className="w-1/2 border rounded p-2"required
            />
            <input
              type="number" name="stock" value={form.stock || ""}onChange={handleChange}
              placeholder="Số lượng tồn"
              className="w-1/2 border rounded p-2" required
            />
          </div>
          {/* mô tả */}
          <textarea
            name="description" value={form.description}onChange={handleChange}
            placeholder="Mô tả sản phẩm"className="w-full border rounded p-2 h-24"/>
          {/* ảnh sản phẩm */}
          <div>
            <label className="block font-medium mb-1">Ảnh sản phẩm</label>
            <input
              type="file" name="image" accept="image/*"
              onChange={handleChange} className="w-full border rounded p-2"/>
            {preview && (
              <div className="mt-3 flex items-center gap-4">
                <img
                  src={preview.startsWith("blob") ? preview : `${import.meta.env.VITE_API_URL.replace("/data", "")}${preview}`}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border"/>
                <div>
                  <p className="text-sm text-gray-600">
                    {form.image?.name ?? "Ảnh hiện tại"}
                  </p>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-red-600 text-sm hover:underline">Xóa ảnh
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* nút */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button" onClick={onClose}
              className="border px-4 py-2 rounded hover:bg-gray-100" >Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}