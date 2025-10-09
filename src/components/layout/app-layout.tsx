import { PoweroffOutlined } from "@ant-design/icons"
import { Button, Divider, Flex, Layout, Typography } from "antd"
import { Outlet } from "react-router"

import { useAuthContext } from "../../contexts/auth-context"
import { useAuthGuard } from "../../utils/auth"
import ThemeSwitcher from "../theme-switcher"
import Footer from "./footer"

const { Header, Content } = Layout
const { Title, Text } = Typography

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
				<Title level={2} style={{ marginBottom: 0 }}>
					Dummy Users
				</Title>
				<Flex align="center" gap={16}>
					<Text>
						Olá, <strong>{user?.firstName}</strong> ({user?.role})
					</Text>

					<Divider type="vertical" />

					<ThemeSwitcher />

					<Button onClick={logout}>
						<PoweroffOutlined /> Sair
					</Button>
				</Flex>
			</Header>
			<Content style={{ padding: "24px" }}>
				<Outlet />
			</Content>
			<Footer />
		</Layout>
	)
}
