import { Alert, Button, Card, Form, Input, Layout } from "antd"
import { useForm } from "antd/es/form/Form"
import { Content } from "antd/es/layout/layout"
import { useNavigate } from "react-router"
import { useLogin } from "../hooks/auth"
import { useGuestGuard } from "../utils/auth"
import { getAxiosErrorMessage } from "../utils/get-axios-error-message"
import ThemeSwitcher from "./theme-switcher"

type FieldType = {
	username: string
	password: string
}

export default function LoginPage() {
	const navigate = useNavigate()
	const [form] = useForm<FieldType>()

	const { mutateAsync: login, isPending, error } = useLogin()

	useGuestGuard()

	const handleFinish = async (values: FieldType) => {
		await login(values)
		navigate("/dashboard")
	}

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<div
				style={{ position: "absolute", top: "16px", right: "16px", zIndex: 1 }}
			>
				<ThemeSwitcher />
			</div>
			<Content style={{ display: "grid", placeContent: "center" }}>
				<Card title="Login" style={{ minWidth: "400px" }}>
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
						// autoComplete="off"
						onFinish={handleFinish}
						form={form}
					>
						<Form.Item<FieldType>
							label="User Name"
							name="username"
							rules={[
								{
									required: true,
									message: "Please input your user name!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item<FieldType>
							label="Password"
							name="password"
							rules={[
								{ required: true, message: "Please input your password!" },
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item key="submit" label={null}>
							<Button type="primary" htmlType="submit" loading={isPending}>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Content>
		</Layout>
	)
}
