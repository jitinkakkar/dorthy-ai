import { create } from "zustand";
import { THEME_STORAGE_KEY } from "../lib/config";

type ColorScheme = "light" | "dark";

type AppState = {
  scheme: ColorScheme;
  threadId: string | null;
  setScheme: (scheme: ColorScheme) => void;
  setThreadId: (threadId: string | null) => void;
};

// Get initial theme from localStorage or system preference
const getInitialTheme = (): ColorScheme => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  // Default to system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useAppStore = create<AppState>((set) => ({
  scheme: getInitialTheme(),
  threadId: null,
  setScheme: (scheme) => {
    localStorage.setItem(THEME_STORAGE_KEY, scheme);
    set({ scheme });
  },
  setThreadId: (threadId) => set({ threadId }),
}));
