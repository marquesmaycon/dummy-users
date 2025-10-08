import { useMutation } from "@tanstack/react-query"

import { login } from "../http/auth/login"
import { refresh } from "../http/auth/refresh"

export const useLogin = () => {
	return useMutation({
		mutationFn: login,
	})
}

export const useRefresh = () => {
	return useMutation({
		mutationFn: refresh,
	})
}
