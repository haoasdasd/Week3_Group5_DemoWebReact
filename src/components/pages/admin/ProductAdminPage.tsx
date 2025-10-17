import { useState } from "react";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/api/productApi";
import ProductTable from "@/components/pages/admin/ProductTable";
import ProductForm from "@/components/pages/admin/ProductForm";

import type { Product } from "@/components/type/product";

export default function ProductAdminPage() {
  const { data: products, isLoading, isError } = useProducts();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  if (isLoading) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
  if (isError) return <p className="text-center text-red-500">Không tải được sản phẩm.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
      <ProductForm
        editing={editing}
        onSubmit={async (data) => {
          if (editing?.id) {
            await updateMutation.mutateAsync({ id: editing.id, data });
          } else {
            await createMutation.mutateAsync(data);
          }
          setEditing(null);
        }}
        onCancel={() => setEditing(null)}
      />
      <ProductTable
        products={products || []}
        onEdit={setEditing}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
}
