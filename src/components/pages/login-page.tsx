import { LoginOutlined } from "@ant-design/icons"
import { Alert, Button, Card, Form, Input, Layout, Spin } from "antd"
import { useForm } from "antd/es/form/Form"
import { Content } from "antd/es/layout/layout"
import { useNavigate } from "react-router"

import { useLogin } from "../../hooks/auth"
import { useGuestGuard } from "../../utils/auth"
import { getAxiosErrorMessage } from "../../utils/get-axios-error-message"
import Footer from "../layout/footer"
import ThemeSwitcher from "../theme-switcher"

type FieldType = {
	username: string
	password: string
}

export default function LoginPage() {
	const navigate = useNavigate()
	const [form] = useForm<FieldType>()

	const { mutateAsync: login, isPending, error } = useLogin()

	const { isLoading } = useGuestGuard()

	const handleFinish = async (values: FieldType) => {
		await login(values)
		navigate("/dashboard/users")
	}

	if (isLoading) {
		return <Spin fullscreen />
	}

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<div
				style={{ position: "absolute", top: "16px", right: "16px", zIndex: 1 }}
			>
				<ThemeSwitcher />
			</div>
			<Content style={{ display: "grid", placeContent: "center" }}>
				<Card title="Login - Dummy Users" style={{ minWidth: "440px" }}>
					{error && (
						<Alert
							message={getAxiosErrorMessage(error) || "Unknown error"}
							type="error"
							showIcon
							style={{ marginBottom: "1rem" }}
						/>
					)}
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						initialValues={{ remember: true }}
						onFinish={handleFinish}
						form={form}
					>
						<Form.Item<FieldType>
							label="Nome de usuário"
							name="username"
							rules={[
								{
									required: true,
									message: "Por favor, insira seu nome de usuário!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item<FieldType>
							label="Senha"
							name="password"
							rules={[
								{ required: true, message: "Por favor, insira sua senha!" },
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item key="submit" label={null}>
							<Button type="primary" htmlType="submit" loading={isPending}>
								Enviar
								<LoginOutlined />
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Content>
			<Footer />
		</Layout>
	)
}
