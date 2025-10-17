const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser(data: { username: string; password: string }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Sai tài khoản hoặc mật khẩu");
  return res.json();
}

export async function registerUser(data: { username: string; password: string }) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Đăng ký thất bại");
  return res.json();
}
