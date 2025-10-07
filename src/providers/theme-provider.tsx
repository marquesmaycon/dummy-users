import { type ReactNode, useEffect, useState } from "react"

import { ThemeContext } from "../contexts/theme-context"
import type { Theme } from "../theme"

interface ThemeProviderProps {
	children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem("theme") as Theme
		return savedTheme || "light"
	})

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === "light" ? "dark" : "light"
			localStorage.setItem("theme", newTheme)
			return newTheme
		})
	}

	const isDarkMode = theme === "dark"

	useEffect(() => {
		localStorage.setItem("theme", theme)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
			{children}
		</ThemeContext.Provider>
	)
}
