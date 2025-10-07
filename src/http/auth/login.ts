import { dummyApi } from "../../libs/dummy-api"

type LoginRequest = {
	email: string
	password: string
}

type LoginResponse = {
	id: number
	username: string
	email: string
	firstName: string
	lastName: string
	gender: string
	image: string
	accessToken: string
	refreshToken: string
}

export async function login(data: LoginRequest) {
	const resp = await dummyApi.post<LoginResponse>("/auth/login", data)
	return resp.data
}
