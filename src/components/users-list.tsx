import {
	Alert,
	Button,
	Modal,
	message,
	Space,
	Table,
	type TableProps,
	Tag,
} from "antd"
import { useMemo, useState } from "react"
import { Link } from "react-router"

import { useAuthContext } from "../contexts/auth-context"
import { useDeleteUser, useUsers } from "../hooks/user"
import type { User } from "../libs/dummy-api"

type UsersListProps = {
	onEditClick: (userId: number) => void
}

type DeleteModalState = {
	open: boolean
	userId: number | null
	name: string | null
}

export default function UsersList({ onEditClick }: UsersListProps) {
	const { role } = useAuthContext()
	const isAdmin = role === "admin"

	const [messageApi, contextHolder] = message.useMessage()

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

	const { mutateAsync: destroy, isPending } = useDeleteUser()

	const handleDelete = async () => {
		if (!userId) return
		await destroy({ id: userId })
		messageApi.success("User deleted successfully")
		setDeleteModal({ open: false, userId: null, name: null })
	}

	const columns: TableProps<User>["columns"] = useMemo(() => {
		return [
			{
				title: "Full Name",
				dataIndex: "name",
				key: "name",
				render: (_, record) => `${record.firstName} ${record.lastName}`,
			},
			{
				title: "Age",
				dataIndex: "age",
				key: "age",
			},
			{
				title: "E-mail",
				dataIndex: "email",
				key: "email",
			},
			{
				title: "Role",
				dataIndex: "role",
				key: "role",
				render: (_, { role }) => {
					const color =
						role === "admin" ? "red" : role === "user" ? "green" : "gray"
					return (
						<Tag color={color} key={role}>
							{role.toUpperCase()}
						</Tag>
					)
				},
			},
			{
				title: "Actions",
				key: "actions",
				render: (_, { id, firstName, lastName }) => (
					<Space align="center" size="middle">
						<Link to={`/dashboard/users/${id}`}>
							<Button>View</Button>
						</Link>
						{isAdmin && (
							<>
								<Button
									color="cyan"
									variant="filled"
									onClick={() => onEditClick(id)}
								>
									Edit
								</Button>
								<Button
									danger
									onClick={() =>
										setDeleteModal({
											open: true,
											userId: id,
											name: `${firstName} ${lastName}`,
										})
									}
								>
									Delete
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
			{contextHolder}
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
			/>
			<Modal
				title="Excluir usuário"
				open={open}
				confirmLoading={isPending}
				onCancel={() =>
					setDeleteModal({ open: false, userId: null, name: null })
				}
				okButtonProps={{
					danger: true,
					onClick: handleDelete,
					loading: isPending,
				}}
			>
				<Alert
					message={`Are you sure you want to delete user ${name}?`}
					showIcon
					style={{ fontWeight: "bold" }}
					type="warning"
				/>
			</Modal>
		</>
	)
}
