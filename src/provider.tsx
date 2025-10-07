import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router"
import { queryClient } from "./libs/tanstack-query"

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</BrowserRouter>
	)
}
