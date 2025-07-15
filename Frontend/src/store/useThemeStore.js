import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("stringify-theme") || "dark",
    setTheme: (theme) => {
        localStorage.setItem("stringify-theme", theme)
        set({ theme })
    }
}))