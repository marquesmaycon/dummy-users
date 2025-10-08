import { useMutation, useQuery } from "@tanstack/react-query"

import { login } from "../http/auth/login"
import { refresh } from "../http/auth/refresh"
import { me } from "../http/user/me"

export const useLogin = () => {
	return useMutation({
		mutationFn: login,
	})
}

export const useMe = () => {
	return useQuery({
		queryKey: ["me"],
		queryFn: me,
	})
}

export const useRefresh = () => {
	return useMutation({
		mutationFn: refresh,
	})
}
