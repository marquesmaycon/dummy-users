import { dummyApi, type User } from "../../libs/dummy-api"

export type AddUserRequest = {
	firstName: string
	lastName: string
	email: string
	phone?: string
	username?: string
	birthDate?: string
	image?: string
	bloodGroup?: string
	height?: number
	weight?: number
	eyeColor?: string
}

type AddUserResponse = User

export async function addUser(data: AddUserRequest) {
	const resp = await dummyApi.post<AddUserResponse>(`/users/add`, {
		role: "user",
		...data,
	})
	return resp.data
}
