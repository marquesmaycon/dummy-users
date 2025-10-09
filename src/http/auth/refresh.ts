import { dummyApi } from "../../libs/dummy-api"

type RefreshRequest = {
	refreshToken: string
	expiresInMins?: number
}

type RefreshResponse = {
	accessToken: string
	refreshToken: string
}

export async function refresh({
	refreshToken,
	expiresInMins = 10,
}: RefreshRequest) {
	const resp = await dummyApi.post<RefreshResponse>("/auth/refresh", {
		refreshToken,
		expiresInMins,
	})
	return resp.data
}
