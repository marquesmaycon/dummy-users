import { lazy } from "react"
import { Route, Routes } from "react-router"

const AppLayout = lazy(() => import("./components/app-layout"))
const LoginPage = lazy(() => import("./components/login-page"))
const Users = lazy(() => import("./components/users"))
const User = lazy(() => import("./components/user"))

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route element={<AppLayout />}>
				<Route path="/dashboard" element={<Users />} />
				<Route path="/dashboard/users/:id" element={<User />} />
				<Route path="*" element={<Users />} />
			</Route>
		</Routes>
	)
}
