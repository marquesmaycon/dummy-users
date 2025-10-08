import { Alert, Flex, Form, Input, Modal, Spin } from "antd"
import { useEffect } from "react"

import { useAddUser, useUpdateUser, useUser } from "../hooks/user"
import type { AddUserRequest } from "../http/user"
import type { User } from "../libs/dummy-api"
import { getAxiosErrorMessage } from "../utils/get-axios-error-message"
import type { UserModalState } from "./users"

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

	const [form] = Form.useForm<User>()
	const { data: user, isLoading } = useUser(userId)

	const {
		mutateAsync: add,
		isPending: isAdding,
		error: addError,
	} = useAddUser()
	const {
		mutateAsync: update,
		isPending: isUpdating,
		error: updateError,
	} = useUpdateUser(userId)

	useEffect(() => {
		if (isEdit && user) {
			form.setFieldsValue(user)
		}
	}, [form, user, isEdit])

	const handleSubmit = async (values: AddUserRequest) => {
		if (isEdit) {
			await update(values)
		} else {
			await add(values)
		}
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
			title="Title"
			open={open}
			confirmLoading={isPending}
			onCancel={clearAndCancel}
			okButtonProps={{ onClick: () => form.submit() }}
		>
			{isEdit && isLoading ? (
				<Flex style={{ minHeight: 210 }} align="center" justify="center">
					<Spin />
				</Flex>
			) : (
				<Form<User>
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
					<Form.Item<AddUserRequest>
						label="Nome"
						name="firstName"
						rules={[
							{
								required: true,
								message: "Please input your user name!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item<AddUserRequest>
						label="Sobrenome"
						name="lastName"
						rules={[
							{ required: true, message: "Please input your last name!" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item<AddUserRequest>
						label="E-mail"
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your email!",
								type: "email",
							},
						]}
					>
						<Input />
					</Form.Item>
				</Form>
			)}
		</Modal>
	)
}
