import Cookies from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export function useAuthGuard(redirectTo = "/login") {
	const navigate = useNavigate()

	useEffect(() => {
		const accessToken = Cookies.get("accessToken")
		const refreshToken = Cookies.get("refreshToken")

		const isAuthenticated = accessToken && refreshToken

		if (!isAuthenticated) {
			navigate(redirectTo)
		}
	}, [navigate, redirectTo])
}

export function useGuestGuard(redirectTo = "/users") {
	const navigate = useNavigate()

	useEffect(() => {
		const accessToken = Cookies.get("accessToken")
		const refreshToken = Cookies.get("refreshToken")

		const isAuthenticated = accessToken && refreshToken

		if (isAuthenticated) {
			navigate(redirectTo)
		}
	}, [navigate, redirectTo])
}

export function checkAuthStatus() {
	const accessToken = Cookies.get("accessToken")
	const refreshToken = Cookies.get("refreshToken")

	return {
		isAuthenticated: !!(accessToken && refreshToken),
		accessToken,
		refreshToken,
	}
}

export function removeTokens() {
	Cookies.remove("accessToken")
	Cookies.remove("refreshToken")
}