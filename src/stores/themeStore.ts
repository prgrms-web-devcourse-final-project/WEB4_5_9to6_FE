import { create } from "zustand";

type Theme = "light" | "dark" | "green" | "orange" | "blue";

interface ThemeStore {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
    let defaultTheme: Theme = "light";

    if (typeof window !== "undefined") {
        defaultTheme = (localStorage.getItem("theme") as Theme) || "light";
        document.documentElement.className = defaultTheme;
    }

    return {
        theme: defaultTheme,
        setTheme: (theme: Theme) => {
            localStorage.setItem("theme", theme);
            document.documentElement.className = theme;
            set({ theme });
        },
    };
});
