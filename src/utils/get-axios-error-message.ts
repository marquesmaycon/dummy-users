import { AxiosError } from "axios"

export const getAxiosErrorMessage = (error: Error) => {
	if (error instanceof AxiosError && error.response?.data?.message) {
		return error.response.data.message
	}
	return error?.message || "An error occurred"
}
