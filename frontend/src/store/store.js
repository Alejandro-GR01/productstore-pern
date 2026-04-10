import { create } from "zustand";

const initialState = {
  theme: localStorage.getItem("theme") || "forest",
};

export const useAppStore = create((set) => ({
  theme: initialState.theme,
  setTheme: (theme) => set({ theme }),
  reset: () => ({
    ...initialState,
  }),
}));
