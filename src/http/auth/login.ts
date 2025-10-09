import Cookies from "js-cookie"

import { dummyApi } from "../../libs/dummy-api"
import { queryClient } from "../../libs/tanstack-query"
import { type MeResponse, me } from "../user/me"

export type LoginRequest = {
	username: string
	password: string
}

export type LoginResponse = {
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
	const resp = await dummyApi.post<LoginResponse>("/auth/login", {
		...data,
		expiresInMins: 10,
	})
	const { accessToken, refreshToken } = resp.data

	Cookies.set("accessToken", accessToken, { path: "/" })
	Cookies.set("refreshToken", refreshToken, { path: "/" })

	await queryClient.prefetchQuery({
		queryKey: ["me"],
		queryFn: me,
	})

	const meResp = queryClient.getQueryData<MeResponse>(["me"])

	const isAllowed = meResp?.role === "admin" || meResp?.role === "user"

	if (!isAllowed) {
		throw new Error("Usuário não cadastrado no sistema")
	}
}
