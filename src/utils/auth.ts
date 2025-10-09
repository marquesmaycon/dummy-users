import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export function useAuthGuard(redirectTo = "/login") {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const accessToken = Cookies.get("accessToken")
		const refreshToken = Cookies.get("refreshToken")

		const isAuthenticated = accessToken && refreshToken

		if (!isAuthenticated) {
			navigate(redirectTo)
		} else {
			setIsLoading(false)
		}
	}, [navigate, redirectTo])

	return { isLoading }
}

export function useGuestGuard(redirectTo = "/users") {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const accessToken = Cookies.get("accessToken")
		const refreshToken = Cookies.get("refreshToken")

		const isAuthenticated = accessToken && refreshToken

		if (isAuthenticated) {
			navigate(redirectTo)
		} else {
			setIsLoading(false)
		}
	}, [navigate, redirectTo])

	return { isLoading }
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