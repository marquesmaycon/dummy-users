import { useMutation, useQuery } from "@tanstack/react-query"

import { login } from "../http/auth/login"
import { type MeRequest, me } from "../http/auth/me"
import { refresh } from "../http/auth/refresh"

export const useLogin = () => {
	return useMutation({
		mutationFn: login,
	})
}

export const useMe = (data: MeRequest) => {
	return useQuery({
		queryKey: ["me"],
		queryFn: () => me(data),
	})
}

export const useRefresh = () => {
	return useMutation({
		mutationFn: refresh,
	})
}
