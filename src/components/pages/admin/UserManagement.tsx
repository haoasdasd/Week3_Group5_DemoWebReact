import { useState } from "react";
import type {User} from "@/api/userApi";
import { useUsers, useDeleteUser} from "@/api/userApi";
import Swal from "sweetalert2";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function UserManagement() {
  const { data: users = [], isLoading } = useUsers();
  const del = useDeleteUser();

  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState<Partial<User> | null>(null);

  if (isLoading) return <p className="p-6 text-center">Đang tải người dùng...</p>;

  const filteredUsers = users.filter(u => u.username.toLowerCase().includes(filter.toLowerCase()));

  const handleDelete = async (id: string, username: string) => {
    const result = await Swal.fire({
      title: "Xác nhận xoá?",
      text: `Bạn có chắc muốn xoá user "${username}" không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await del.mutateAsync(id);
        Swal.fire("Đã xoá!", `User "${username}" đã được xoá.`, "success");
      } catch {
        Swal.fire("Lỗi!", "Không thể xoá user.", "error");
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
        <button
          onClick={() => setEditing({})}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FiPlus /> Thêm user
        </button>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm user..."
        className="border rounded p-2 w-full md:w-1/3"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="bg-white border rounded-lg overflow-hidden mt-3">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 border">Tên đăng nhập</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Số điện thoại</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="text-center hover:bg-gray-100">
                <td className="p-2 border">{u.username}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.phone || "-"}</td>
                <td className="p-2 border">{u.status || "active"}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => setEditing(u)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(u.id, u.username)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal thêm/sửa user */}
      {editing && (
        <UserModal
          editing={editing}
          onClose={() => setEditing(null)}
          onSubmit={(form: FormData) => {
            // gọi api tạo/sửa user
            console.log("submit user form", form);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

// modal thêm/sửa user
function UserModal({ editing, onClose, onSubmit }: { editing: Partial<User>; onClose: () => void; onSubmit: (form: FormData) => void }) {
  const [form, setForm] = useState({
    username: editing?.username || "",
    email: editing?.email || "",
    phone: editing?.phone || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", form.username);
    data.append("email", form.email);
    data.append("phone", form.phone || "");
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">
          {editing?.id ? "Chỉnh sửa user" : "Thêm user mới"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Tên đăng nhập" className="w-full border rounded p-2" required />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border rounded p-2" required />
          <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Số điện thoại" className="w-full border rounded p-2" />
          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded hover:bg-gray-100">Hủy</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}
