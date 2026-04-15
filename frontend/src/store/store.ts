import { create } from "zustand";

interface AppState {
  theme: string;

  setTheme: (theme: string) => void;
  reset: () => void;
}

const initialState = {
  theme: (() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "forest";
    }
    return "forest";
  })(),
};

export const useAppStore = create<AppState>((set) => ({
  theme: initialState.theme,

  setTheme: (theme) => set({ theme }),
  reset: () => ({
    ...initialState,
  }),
}));
