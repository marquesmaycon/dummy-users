import { dummyApi, type User } from "../../libs/dummy-api"

type MeResponse = User

export async function me() {
	const resp = await dummyApi.get<MeResponse>("/user/me")
	return resp.data
}
