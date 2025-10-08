import { useQueryClient } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { useNavigate } from "react-router"

import { AuthContext } from "../contexts/auth-context"
import { useMe } from "../hooks/user"
import { removeTokens } from "../utils/auth"

type AuthProviderProps = {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const { data: user, isLoading } = useMe()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const logout = () => {
		removeTokens()
		queryClient.clear()
		navigate("/login")
	}

	const value = {
		user: user || null,
		isLoading,
		role: user?.role,
		logout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
