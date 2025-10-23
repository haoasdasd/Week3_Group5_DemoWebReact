import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export type User = {
  id: string;
  username: string;
  email: string;
  phone?: string;
  status?: "active" | "inactive";
};

// lấy danh sách user
export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("Lấy user thất bại");
  return res.json();
};

// Xóa user
export const deleteUser = async (id: string) => {
  const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Xóa user thất bại");
  return res.json();
};

export const useUsers = () => useQuery({ queryKey: ["users"], queryFn: fetchUsers });
export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({ 
    mutationFn: deleteUser, 
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }) 
  });
};
