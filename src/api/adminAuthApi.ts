const API_URL = import.meta.env.VITE_API_URL;

export async function loginAdmin(data: { username: string; password: string }) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Sai tài khoản hoặc mật khẩu admin");
  return res.json();
}

export async function registerAdmin(data: { username: string; password: string }) {
  const res = await fetch(`${API_URL}/admin/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Tạo admin thất bại");
  return res.json();
}
