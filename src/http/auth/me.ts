import { dummyApi, type User } from "../../libs/dummy-api"

export type MeRequest = {
	email: string
	password: string
}

type MeResponse = User

export async function me(data: MeRequest) {
	const resp = await dummyApi.post<MeResponse>("/auth/me", data)
	return resp.data
}
