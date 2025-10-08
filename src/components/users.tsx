import { PlusOutlined } from "@ant-design/icons"
import { Button, Flex, Typography } from "antd"
import { useState } from "react"

import { useAuthContext } from "../contexts/auth-context"
import UserFormModal from "./user-form-modal"
import UsersList from "./users-list"

const { Title } = Typography

export type UserModalState = {
	open: boolean
	mode: "add" | "edit"
	userId: number | null
}

export default function Users() {
	const { role } = useAuthContext()
	const isAdmin = role === "admin"

	const [userModal, setUserModal] = useState<UserModalState>({
		open: false,
		mode: "add",
		userId: null,
	})

	return (
		<div>
			<Flex align="center" justify="space-between">
				<Title level={1}>Usuários</Title>
				{isAdmin && (
					<Button
						type="primary"
						onClick={() =>
							setUserModal({ open: true, mode: "add", userId: null })
						}
					>
						Cadastrar
						<PlusOutlined />
					</Button>
				)}
			</Flex>
			<UsersList
				onEditClick={(userId: number) =>
					setUserModal({ open: true, mode: "edit", userId })
				}
			/>
			<UserFormModal
				{...userModal}
				onCancel={() =>
					setUserModal((prev) => ({ ...prev, open: false, userId: null }))
				}
			/>
		</div>
	)
}
