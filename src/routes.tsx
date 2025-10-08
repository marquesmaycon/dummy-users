import { lazy } from "react"
import { Route, Routes } from "react-router"

const AppLayout = lazy(() => import("./components//layout/app-layout"))
const LoginPage = lazy(() => import("./components/pages/login-page"))
const Users = lazy(() => import("./components/pages/users"))
const User = lazy(() => import("./components/pages/user"))

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route element={<AppLayout />}>
				<Route path="/dashboard/users" element={<Users />} />
				<Route path="/dashboard/users/:id" element={<User />} />
				<Route path="*" element={<Users />} />
			</Route>
		</Routes>
	)
}
