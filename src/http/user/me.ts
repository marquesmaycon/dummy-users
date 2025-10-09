import { dummyApi, type User } from "../../libs/dummy-api"

export type MeResponse = User

export async function me() {
	const resp = await dummyApi.get<MeResponse>("/user/me")
	return resp.data
}
