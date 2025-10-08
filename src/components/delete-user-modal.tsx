import { Alert, Modal, message } from "antd"
import { useNavigate } from "react-router"

import { useDeleteUser } from "../hooks/user"

type DeleteUserModalProps = {
	userId: number | null
	open: boolean
	name: string | null
	onClose: () => void
}

export default function DeleteUserModal({
	userId,
	open,
	name,
	onClose,
}: DeleteUserModalProps) {
	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage()

	const { mutateAsync: destroy, isPending } = useDeleteUser()

	const handleDelete = async () => {
		if (!userId) return
		await destroy({ id: userId })
		messageApi.success("Usuário excluído com sucesso")
		onClose()
		navigate("/dashboard/users")
	}

	return (
		<Modal
			title="Excluir usuário"
			open={open}
			confirmLoading={isPending}
			onCancel={() => onClose()}
			okButtonProps={{
				danger: true,
				onClick: handleDelete,
				loading: isPending,
			}}
			okText="Excluir permanentemente"
			cancelText="Cancelar"
		>
			{contextHolder}
			<Alert
				message={`Tem certeza que deseja excluir o usuário ${name}?`}
				showIcon
				style={{ fontWeight: "bold" }}
				type="warning"
			/>
		</Modal>
	)
}
