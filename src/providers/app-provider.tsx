import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter } from "react-router"

import { queryClient } from "../libs/tanstack-query"
import { AntdConfigProvider } from "./antd-config-provider"
import { AuthProvider } from "./auth-provider"
import { ThemeProvider } from "./theme-provider"

export default function AppProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ThemeProvider>
						<AntdConfigProvider>{children}</AntdConfigProvider>
					</ThemeProvider>
				</AuthProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</BrowserRouter>
	)
}
