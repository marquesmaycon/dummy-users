import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppProvider from "./providers/app-provider.tsx"
import AppRouter from "./routes.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProvider>
			<AppRouter />
		</AppProvider>
	</StrictMode>,
)
