import { createContext } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
	theme: Theme
	toggleTheme: () => void
	isDarkMode: boolean
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined,
)
