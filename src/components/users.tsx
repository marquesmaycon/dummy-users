import { Button, Space, Table, type TableProps, Tag } from "antd"
import { Link } from "react-router"

import { useAuthContext } from "../contexts/auth-context"
import { useUsers } from "../hooks/user"
import type { User } from "../libs/dummy-api"

const columns: TableProps<User>["columns"] = [
	{
		title: "Full Name",
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
		render: (_, { id }) => (
			<Space align="center" size="middle">
				<Link to={`/dashboard/users/${id}`}>
					<Button>View</Button>
				</Link>
				<Button color="cyan" variant="filled">
					Edit
				</Button>
				<Button danger>Delete</Button>
			</Space>
		),
	},
]

export default function Users() {
	const { role } = useAuthContext()
	const { data, isLoading } = useUsers({ isAdmin: role === "admin" })

	if (isLoading) return <div>Loading...</div>

	return (
		<Table<User>
			dataSource={data?.users}
			columns={columns}
			pagination={{
				showSizeChanger: true,
				pageSizeOptions: ["5", "10", "20", "50"],
			}}
		/>
	)
}
