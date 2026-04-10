import { create } from "zustand";

const initialState = {
  theme: localStorage.getItem("theme") || "forest",
  user: {
    id: '',
    email: '',
    name: '',
    role: '',
    isActive: false,
    imageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),

  }
};

export const useAppStore = create((set) => ({
  theme: initialState.theme,
  user: initialState.user,
  setTheme: (theme) => set({ theme }),
  reset: () => ({
    ...initialState,
  }),
  setUser: (user)=> set({
    user
  })
}));
