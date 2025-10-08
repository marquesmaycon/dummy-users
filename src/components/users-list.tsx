import {
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	UserOutlined,
} from "@ant-design/icons"
import { Avatar, Button, Space, Table, type TableProps, Tag } from "antd"
import { useMemo, useState } from "react"
import { Link } from "react-router"

import { useAuthContext } from "../contexts/auth-context"
import { useUsers } from "../hooks/user"
import type { User } from "../libs/dummy-api"
import DeleteUserModal from "./delete-user-modal"

type UsersListProps = {
	onEditClick: (userId: number) => void
}

type DeleteModalState = {
	open: boolean
	userId: number | null
	name: string | null
}

const roleMetaColors: Record<User["role"], { color: string; label: string }> = {
	admin: { color: "red", label: "Administrador" },
	user: { color: "green", label: "Usuário" },
	moderator: { color: "gray", label: "Moderador" },
}

export default function UsersList({ onEditClick }: UsersListProps) {
	const { role } = useAuthContext()
	const isAdmin = role === "admin"

	const [{ open, userId, name }, setDeleteModal] = useState<DeleteModalState>({
		open: false,
		userId: null,
		name: null,
	})

	const [{ page, pageSize }, setPagination] = useState({
		page: 1,
		pageSize: 10,
	})

	const { data, isLoading, isFetching } = useUsers({
		limit: pageSize,
		skip: (page - 1) * pageSize,
		isAdmin,
	})

	const columns: TableProps<User>["columns"] = useMemo(() => {
		return [
			{
				title: "ID",
				dataIndex: "id",
				key: "id",
				width: 10,
			},
			{
				title: "Nome",
				dataIndex: "name",
				key: "name",
				render: (_, { firstName, lastName, image }) => (
					<Space>
						{image ? (
							<Avatar src={image} />
						) : (
							<Avatar size={30} icon={<UserOutlined />} />
						)}
						<span>{`${firstName} ${lastName}`}</span>
					</Space>
				),
			},

			{
				title: "E-mail",
				dataIndex: "email",
				key: "email",
			},
			{
				title: "Telefone",
				dataIndex: "phone",
				key: "phone",
			},
			{
				title: "Idade",
				dataIndex: "age",
				key: "age",
			},
			{
				title: "Permissão",
				dataIndex: "role",
				key: "role",
				render: (_, { role }) => {
					const { color, label } = roleMetaColors[role || "user"]
					return (
						<Tag color={color} key={role}>
							{label.toUpperCase()}
						</Tag>
					)
				},
			},
			{
				title: "Ações",
				key: "actions",
				align: "right",
				render: (_, { id, firstName, lastName }) => (
					<Space align="center" size="middle">
						<Link to={`/dashboard/users/${id}`}>
							<Button>
								Ver <EyeOutlined />
							</Button>
						</Link>
						{isAdmin && (
							<>
								<Button
									color="purple"
									variant="filled"
									onClick={() => onEditClick(id)}
								>
									Editar <EditOutlined />
								</Button>
								<Button
									danger
									variant="solid"
									onClick={() =>
										setDeleteModal({
											open: true,
											userId: id,
											name: `${firstName} ${lastName}`,
										})
									}
								>
									Excluir <DeleteOutlined />
								</Button>
							</>
						)}
					</Space>
				),
			},
		]
	}, [isAdmin, onEditClick])

	return (
		<>
			<Table<User>
				dataSource={data?.users}
				loading={isLoading || isFetching}
				columns={columns}
				pagination={{
					total: data?.total,
					pageSize,
					showSizeChanger: true,
					onChange: (page, pageSize) => setPagination({ page, pageSize }),
					pageSizeOptions: ["10", "20", "50"],
					showTotal: (total) => `Total ${total} items`,
				}}
				scroll={{ x: "max-content" }}
			/>
			<DeleteUserModal
				open={open}
				userId={userId}
				name={name}
				onClose={() =>
					setDeleteModal({ open: false, userId: null, name: null })
				}
			/>
		</>
	)
}
