import { QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider, theme } from "antd"
import { BrowserRouter } from "react-router"

import { useTheme } from "../hooks/theme"
import { queryClient } from "../libs/tanstack-query"
import { ThemeProvider } from "./theme-provider"

export default function AppProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const { isDarkMode } = useTheme()
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<ConfigProvider
						theme={{
							algorithm: isDarkMode
								? theme.darkAlgorithm
								: theme.defaultAlgorithm,
						}}
					>
						{children}
					</ConfigProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	)
}
