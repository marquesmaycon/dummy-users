import { Button, Layout, Space } from "antd"
import { Outlet } from "react-router"
import { useAuthContext } from "../contexts/auth-context"
import { useAuthGuard } from "../utils/auth"
import ThemeSwitcher from "./theme-switcher"

const { Header, Content } = Layout

export default function AppLayout() {
	const { logout } = useAuthContext()

	useAuthGuard()

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
					App Layout
				</div>
				<Space>
					<ThemeSwitcher />
					<Button onClick={logout} variant="filled" danger>
						Logout
					</Button>
				</Space>
			</Header>
			<Content style={{ padding: "24px" }}>
				<Outlet />
			</Content>
		</Layout>
	)
}
