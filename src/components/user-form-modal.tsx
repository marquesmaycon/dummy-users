import { Button, Flex, Form, Input, Modal, Spin } from "antd"
import { useAddUser, useUpdateUser, useUser } from "../hooks/user"
import type { AddUserRequest } from "../http/user"
import type { User } from "../libs/dummy-api"
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
	const { data: user, isLoading } = useUser(userId)

	const { mutateAsync: addUser, isPending: isAdding } = useAddUser()
	const { mutateAsync: updateUser, isPending: isUpdating } =
		useUpdateUser(userId)

	const handleFinish = async (values: AddUserRequest) => {
		return isEdit ? await updateUser(values) : await addUser(values)
	}

	const isPending = isAdding || isUpdating

	return (
		<Modal
			title="Title"
			open={open}
			confirmLoading={isPending}
			onCancel={onCancel}
		>
			{isEdit && isLoading ? (
				<Flex style={{ minHeight: 210 }} align="center" justify="center">
					<Spin />
				</Flex>
			) : (
				<Form<User>
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={user}
					onFinish={handleFinish}
				>
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
					<Form.Item key="submit" label={null}>
						<Button type="primary" htmlType="submit" loading={isPending}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			)}
		</Modal>
	)
}
