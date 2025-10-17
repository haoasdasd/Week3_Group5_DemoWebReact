import { create } from "zustand";

interface UserState {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: "Admin", 
  login: (username) => set({ user: username }),
  logout: () => set({ user: null }),
}));


export default useUserStore;
