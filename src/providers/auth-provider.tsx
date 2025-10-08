import type { ReactNode } from "react"

import { AuthContext } from "../contexts/auth-context"
import { useMe } from "../hooks/auth"

type AuthProviderProps = {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const { data: user, isLoading } = useMe()

	const value = {
		user: user || null,
		isLoading,
		role: user?.role,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
