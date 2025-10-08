import axios from "axios"
import Cookies from "js-cookie"

export const dummyApi = axios.create({
	baseURL: "https://dummyjson.com/",
})

dummyApi.interceptors.request.use((config) => {
	const token = Cookies.get("accessToken")
	if (token) {
		const token = Cookies.get("accessToken")
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

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
	}

export type Pagination = {
	total: number
	skip: number
	limit: number
}