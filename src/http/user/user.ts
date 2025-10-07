import { dummyApi, type User } from "../../libs/dummy-api"

export type UserRequest = {
	id: string | number
}

type UserResponse = User

export async function user({ id }: UserRequest) {
	const resp = await dummyApi.get<UserResponse>(`/users/${id}`)
	return resp.data
}
