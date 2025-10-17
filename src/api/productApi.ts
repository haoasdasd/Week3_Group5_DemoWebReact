import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/components/type/product";

console.log(" VITE_API_URL =", import.meta.env.VITE_API_URL);
const API_URL = import.meta.env.VITE_API_URL;

// === READ ===
export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      console.log(" Fetching:", `${API_URL}/products`);
      const res = await fetch(`${API_URL}/products`);
      console.log(" Response status:", res.status);
      if (!res.ok) throw new Error("Không tải được danh sách sản phẩm");
      return res.json();
    },
  });
};

// === CREATE ===
export async function createProduct(formData: FormData) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Tạo sản phẩm thất bại");
  return await res.json();
}

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

// === UPDATE ===
export async function updateProduct(id: string, formData: FormData) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Cập nhật sản phẩm thất bại");
  return await res.json();
}

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        body: data,
      });
      if (!res.ok) throw new Error("Cập nhật sản phẩm thất bại");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};


// === DELETE ===
export async function deleteProduct(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Xóa sản phẩm thất bại");
  return await res.json();
}

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export async function getProducts() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
  if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm");
  return res.json();
}

