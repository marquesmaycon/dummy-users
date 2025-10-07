import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Provider from "./provider.tsx"
import AppRouter from "./routes.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider>
			<AppRouter />
		</Provider>
	</StrictMode>,
)
