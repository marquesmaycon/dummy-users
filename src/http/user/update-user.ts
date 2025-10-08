import { dummyApi, type User } from "../../libs/dummy-api"

export type UpdateUserRequest = Partial<User>

type UpdateUserResponse = User

export async function updateUser({ id, ...data }: UpdateUserRequest) {
	const resp = await dummyApi.put<UpdateUserResponse>(`/users/${id}`, data)
	return resp.data
}
