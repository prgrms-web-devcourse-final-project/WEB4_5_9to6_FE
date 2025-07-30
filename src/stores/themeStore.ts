import { create } from "zustand";

type Theme = "light" | "dark" | "green" | "orange" | "blue";

interface ThemeStore {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    initTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: "light",
    setTheme: (theme: Theme) => {
        localStorage.setItem("theme", theme);
        document.documentElement.className = theme;
        set({ theme });
    },
    initTheme: () => {
        const initdTheme = (localStorage.getItem("theme") as Theme) || "light";
        document.documentElement.className = initdTheme;
        set({ theme: initdTheme });
    },
}));
