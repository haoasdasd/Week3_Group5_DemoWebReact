import type { Order } from "@/components/type/order";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export const useOrders = () =>
  useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/orders`);
      if (!res.ok) throw new Error("Không tải được đơn hàng");
      return res.json();
    },
  });

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Tạo đơn thất bại");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
};

export const useUpdateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Cập nhật đơn thất bại");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
};

export const useDeleteOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/orders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Xóa đơn thất bại");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
};

export async function getOrders() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`);
  if (!res.ok) throw new Error("Không thể tải danh sách đơn hàng");
  return res.json();
}
