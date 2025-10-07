import { dummyApi } from "../../libs/dummy-api"

type RefreshRequest = {
	refreshToken: string
	expiresInMins: number
}

type RefreshResponse = {
	accessToken: string
	refreshToken: string
}

export async function refresh(data: RefreshRequest) {
	const resp = await dummyApi.post<RefreshResponse>("/auth/refresh", data)
	return resp.data
}
