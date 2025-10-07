import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router"

import { queryClient } from "../libs/tanstack-query"
import { AntdConfigProvider } from "./antd-config-provider"
import { ThemeProvider } from "./theme-provider"

export default function AppProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<AntdConfigProvider>{children}</AntdConfigProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	)
}
