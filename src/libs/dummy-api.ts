import axios from "axios"
import Cookies from "js-cookie"

import { refresh } from "../http/auth/refresh"

export const dummyApi = axios.create({ baseURL: "https://dummyjson.com/" })

let isRefreshing = false
let failedQueue: Array<{
	resolve: (value?: string | null) => void
	reject: (reason?: Error) => void
}> = []

const processQueue = (error: Error | null, token: string | null = null) => {
	failedQueue.forEach(({ resolve, reject }) => {
		if (error) {
			reject(error)
		} else {
			resolve(token)
		}
	})

	failedQueue = []
}

dummyApi.interceptors.request.use((config) => {
	const token = Cookies.get("accessToken")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

dummyApi.interceptors.response.use(
	(response) => {
		return response
	},
	async (error) => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then((token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						return dummyApi(originalRequest)
					})
					.catch((err) => {
						return Promise.reject(err)
					})
			}

			originalRequest._retry = true
			isRefreshing = true

			const refreshToken = Cookies.get("refreshToken")

			if (!refreshToken) {
				processQueue(error, null)
				Cookies.remove("accessToken")
				Cookies.remove("refreshToken")
				window.location.href = "/login"
				return Promise.reject(error)
			}

			try {
				const { accessToken, refreshToken: newRefreshToken } = await refresh({
					refreshToken,
					expiresInMins: 10,
				})

				Cookies.set("accessToken", accessToken, { path: "/" })
				Cookies.set("refreshToken", newRefreshToken, { path: "/" })

				originalRequest.headers.Authorization = `Bearer ${accessToken}`

				processQueue(null, accessToken)

				return dummyApi(originalRequest)
			} catch (refreshError) {
				processQueue(
					refreshError instanceof Error
						? refreshError
						: new Error("Falha ao renovar token"),
					null,
				)
				Cookies.remove("accessToken")
				Cookies.remove("refreshToken")

				window.location.href = "/login"
				return Promise.reject(refreshError)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	},
)

export type User = {
		id: number
		firstName: string
		lastName: string
		email: string
		phone: string
		username: string
		birthDate: string
		image: string
		bloodGroup: string
		height: number
		weight: number
		eyeColor: string
		hair: {
			color: string
			type: string
		}
		ip: string
		address: {
			address: string
			city: string
			state: string
			stateCode: string
			postalCode: string
			coordinates: {
				lat: number
				lng: number
			}
			country: string
		}
		macAddress: string
		university: string
		bank: {
			cardExpire: string
			cardNumber: string
			cardType: string
			currency: string
			iban: string
		}
		company: {
			department: string
			name: string
			title: string
			address: {
				address: string
				city: string
				state: string
				stateCode: string
				postalCode: string
				coordinates: {
					lat: number
					lng: number
				}
				country: string
			}
		}
		ein: string
		ssn: string
		userAgent: string
		crypto: {
			coin: string
			wallet: string
			network: string
		}
		role: "admin" | "user" | "moderator"
		isLocal?: boolean
	}

export type Pagination = {
	total: number
	skip: number
	limit: number
}
