import type { Product } from "@/components/type/product";

type Props = {
  editing: Partial<Product> | null;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

export default function ProductForm({ editing, onSubmit, onCancel }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    onSubmit(form);
    e.currentTarget.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-xl border shadow-sm space-y-4"
    >
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">Tên sản phẩm</label>
          <input
            name="name"
            defaultValue={editing?.name || ""}
            className="w-full border rounded-md px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Giá (VNĐ)</label>
          <input
            name="price"
            type="number"
            defaultValue={editing?.price || ""}
            className="w-full border rounded-md px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Số lượng tồn</label>
          <input
            name="stock"
            type="number"
            defaultValue={editing?.stock || ""}
            className="w-full border rounded-md px-3 py-2 mt-1"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Ảnh sản phẩm</label>
        <input
            name="image"
            type="file"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-blue-50 file:text-blue-700  hover:file:bg-blue-100   mt-1"/>
      </div>
      <div className="flex justify-end gap-3">
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-400 px-3 py-1.5 rounded-md hover:bg-gray-100"
          >
            Hủy
          </button>
        )}
        <button
          type="submit"
          className="border border-blue-600 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700"
        >
          {editing ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
}
