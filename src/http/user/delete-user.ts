import { dummyApi, type User } from "../../libs/dummy-api"

export type DeleteUserRequest = Partial<User> & {
	id: number | string
}

type DeleteUserResponse = User & {
	isDeleted: boolean
	deletedOn: string
}

export async function deleteUser({ id }: DeleteUserRequest) {
	const resp = await dummyApi.delete<DeleteUserResponse>(`/users/${id}`)
	return resp.data
}
