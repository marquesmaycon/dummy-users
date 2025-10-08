import {
	ArrowLeftOutlined,
	DeleteOutlined,
	EditOutlined,
} from "@ant-design/icons"
import { Avatar, Button, Divider, Flex, Spin, Typography } from "antd"
import { useState } from "react"
import { Link, useParams } from "react-router"

import { useAuthContext } from "../contexts/auth-context"
import { useUser } from "../hooks/user"
import DeleteUserModal from "./delete-user-modal"
import UserFormModal from "./user-form-modal"

const { Title, Text } = Typography

const userProps = {
	email: { label: "E-mail" },
	phone: { label: "Telefone" },
	username: { label: "Nome de usuário" },
	birthDate: { label: "Data de Nascimento" },
	image: { label: "Imagem" },
	bloodGroup: { label: "Grupo Sanguíneo" },
	height: { label: "Altura" },
	weight: { label: "Peso" },
	eyeColor: { label: "Cor dos Olhos" },
}

export default function User() {
	const { id } = useParams<{ id: string }>()
	const { role } = useAuthContext()
	
	const userId = Number(id) || null
	const isAdmin = role === "admin"

	const { data: user, isLoading } = useUser(userId)
	const [modalOpen, setModalOpen] = useState<"edit" | "delete" | null>(null)

	if (isLoading) return <Spin />

	return (
		<Flex vertical gap={16} style={{ padding: 16, height: "85vh" }}>
			<Flex align="center" gap={16} justify="space-between">
				<Title level={2}>
					<Avatar src={user?.image} size={64} /> {user?.firstName}{" "}
					{user?.lastName}
				</Title>
				{isAdmin && (
					<Flex align="center" gap={8}>
						<Button
							onClick={() => setModalOpen("edit")}
							color="blue"
							variant="filled"
						>
							Editar <EditOutlined />
						</Button>
						<Button onClick={() => setModalOpen("delete")} danger>
							Excluir <DeleteOutlined />
						</Button>
					</Flex>
				)}
			</Flex>

			<Divider size="small" />

			<Flex vertical gap={8}>
				{Object.entries(userProps).map(([key, { label }]) => (
					<Flex key={key} align="baseline" gap={4}>
						<Text strong style={{ fontSize: 18 }}>
							{label}:
						</Text>
						<Text style={{ fontSize: 18 }}>
							{user?.[key as keyof typeof userProps] ?? "-"}
						</Text>
					</Flex>
				))}
			</Flex>

			<div style={{ marginTop: "auto", width: "fit-content" }}>
				<Link to="/dashboard/users">
					<Button>
						<ArrowLeftOutlined /> Voltar
					</Button>
				</Link>
			</div>

			<UserFormModal
				mode="edit"
				open={modalOpen === "edit"}
				userId={userId}
				onCancel={() => setModalOpen(null)}
			/>

			<DeleteUserModal
				open={modalOpen === "delete"}
				userId={userId}
				name={user ? `${user.firstName} ${user.lastName}` : null}
				onClose={() => setModalOpen(null)}
			/>
		</Flex>
	)
}
