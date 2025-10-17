import type { Product } from "@/components/type/product";

type Props = {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <table className="w-full border border-gray-200 bg-white rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-700 text-sm">
        <tr>
          <th className="p-2 border">Ảnh</th>
          <th className="p-2 border">Tên</th>
          <th className="p-2 border">Giá</th>
          <th className="p-2 border">Kho</th>
          <th className="p-2 border">Trạng thái</th>
          <th className="p-2 border">Cập nhật</th>
          <th className="p-2 border">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50 text-center">
            <td className="p-2 border">
              {p.imageUrl ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${p.imageUrl}`}
                  className="w-14 h-14 object-cover mx-auto"
                />
              ) : (
                <span>-</span>
              )}
            </td>
            <td className="p-2 border">{p.name || "—"}</td>
            <td className="p-2 border">{(p.price ?? 0).toLocaleString()}₫</td>
            <td className="p-2 border">{p.stock ?? 0}</td>
            <td className="p-2 border text-sm">{p.status || "—"}</td>
            <td className="p-2 border text-xs text-gray-500">
            {p.updatedAt ? new Date(p.updatedAt).toLocaleString("vi-VN") : "—"}
            </td>

            <td className="p-2 border space-x-2">
              <button
                onClick={() => onEdit(p)}
                className="border border-blue-500 text-blue-600 px-2 py-1 rounded hover:bg-blue-50"
              >
                Sửa
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="border border-red-500 text-red-600 px-2 py-1 rounded hover:bg-red-50"
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
