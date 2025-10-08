import {
	Alert,
	DatePicker,
	Flex,
	Form,
	Input,
	InputNumber,
	Modal,
	message,
	Spin,
} from "antd"
import dayjs from "dayjs"
import { useEffect } from "react"

import { useAddUser, useUpdateUser, useUser } from "../hooks/user"
import type { User } from "../libs/dummy-api"
import { getAxiosErrorMessage } from "../utils/get-axios-error-message"
import type { UserModalState } from "./pages/users"

type UserFormValues = Omit<User, "birthDate"> & {
	birthDate?: dayjs.Dayjs
}

type UserFormProps = UserModalState & {
	onCancel: () => void
}

export default function UserFormModal({
	open,
	mode,
	userId,
	onCancel,
}: UserFormProps) {
	const isEdit = mode === "edit"

	const [form] = Form.useForm<UserFormValues>()
	const [messageApi, context] = message.useMessage()
	const { data: user, isLoading } = useUser(userId)
	
	const { mutateAsync: add, isPending: isAdding, error: addError } = useAddUser()
	const {
		mutateAsync: update,
		isPending: isUpdating,
		error: updateError,
	} = useUpdateUser(userId)

	useEffect(() => {
		if (isEdit && user && open) {
			console.log(user)
			const formattedUser = {
				...user,
				birthDate: user.birthDate ? dayjs(user.birthDate) : undefined,
			}
			form.setFieldsValue(formattedUser)
		}
	}, [form, user, isEdit, open])

	const handleSubmit = async (values: UserFormValues) => {
		const formattedValues = {
			...values,
			birthDate: values.birthDate
				? dayjs(values.birthDate).format("YYYY-M-D")
				: values.birthDate,
		}
		if (isEdit) {
			await update(formattedValues)
		} else {
			await add(formattedValues)
		}
		messageApi.success(
			`Usuário ${isEdit ? "atualizado" : "adicionado"} com sucesso`,
		)
		clearAndCancel()
	}

	const clearAndCancel = () => {
		form.resetFields()
		onCancel()
	}

	const isPending = isAdding || isUpdating
	const error = addError || updateError

	return (
		<Modal
			title={isEdit ? "Editar Usuário" : "Adicionar Novo Usuário"}
			open={open}
			confirmLoading={isPending}
			onCancel={clearAndCancel}
			okButtonProps={{ onClick: () => form.submit() }}
			okText="Salvar"
			cancelText="Cancelar"
		>
			{context}
			{isEdit && isLoading ? (
				<Flex style={{ minHeight: 210 }} align="center" justify="center">
					<Spin />
				</Flex>
			) : (
				<Form<UserFormValues>
					form={form}
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					onFinish={handleSubmit}
				>
					{error && (
						<Alert
							message={getAxiosErrorMessage(error) || "Unknown error"}
							type="error"
							showIcon
							style={{ marginBottom: "1rem" }}
						/>
					)}
					<Form.Item<UserFormValues>
						label="Nome"
						name="firstName"
						rules={[
							{
								required: true,
								message: "Por favor, insira o nome!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item<UserFormValues>
						label="Sobrenome"
						name="lastName"
						rules={[
							{ required: true, message: "Por favor, insira o sobrenome!" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item<UserFormValues>
						label="E-mail"
						name="email"
						rules={[
							{
								required: true,
								message: "Por favor, insira o e-mail!",
								type: "email",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item<UserFormValues> label="Telefone" name="phone">
						<Input />
					</Form.Item>
					<Form.Item<UserFormValues> label="Nome de Usuário" name="username">
						<Input />
					</Form.Item>
					<Form.Item<UserFormValues>
						label="Data de nascimento"
						name="birthDate"
					>
						<DatePicker placeholder="Selecione a data" format="DD/MM/YYYY" />
					</Form.Item>
					<Form.Item<UserFormValues>
						label="Imagem"
						name="image"
						rules={[{ type: "url", message: "Please enter a valid URL!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item<UserFormValues> label="Grupo sanguíneo" name="bloodGroup">
						<Input />
					</Form.Item>
					<Form.Item<UserFormValues> label="Altura" name="height">
						<InputNumber min={0} />
					</Form.Item>
					<Form.Item<UserFormValues> label="Peso" name="weight">
						<InputNumber min={0} />
					</Form.Item>
					<Form.Item<UserFormValues> label="Cor dos olhos" name="eyeColor">
						<Input />
					</Form.Item>
				</Form>
			)}
		</Modal>
	)
}
