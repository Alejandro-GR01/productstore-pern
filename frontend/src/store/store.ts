import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AppState {
  theme: string;
  user: User;
  setTheme: (theme: string) => void;
  reset: () => void;
  setUser: (user: User) => void;
}

const initialState = {
  theme: (() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "forest";
    }
    return "forest";
  })(),
  user: {
    id: "",
    email: "",
    name: "",
    role: "",
    isActive: false,
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User,
};

export const useAppStore = create<AppState>((set) => ({
  theme: initialState.theme,
  user: initialState.user,
  setTheme: (theme) => set({ theme }),
  reset: () => ({
    ...initialState,
  }),
  setUser: (user) => set({ user }),
}));