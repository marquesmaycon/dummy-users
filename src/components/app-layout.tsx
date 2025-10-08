import { PoweroffOutlined } from "@ant-design/icons"
import { Button, Layout, Space } from "antd"
import { Outlet } from "react-router"
import { useAuthContext } from "../contexts/auth-context"
import { useAuthGuard } from "../utils/auth"
import ThemeSwitcher from "./theme-switcher"

const { Header, Content } = Layout

export default function AppLayout() {
	const { user, logout } = useAuthContext()

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
					Dummy Users
				</div>
				<Space align="center" size="middle">
					<div>
						Olá, <strong>{user?.firstName}</strong> ({user?.role})
					</div>
					<ThemeSwitcher />
					<Button onClick={logout}>
						<PoweroffOutlined /> Sair
					</Button>
				</Space>
			</Header>
			<Content style={{ padding: "24px" }}>
				<Outlet />
			</Content>
		</Layout>
	)
}
