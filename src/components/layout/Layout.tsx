import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>👋 {user}</span>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Đăng xuất
          </button>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
