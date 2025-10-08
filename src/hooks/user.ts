import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	addUser,
	deleteUser,
	me,
	type UsersRequest,
	updateUser,
	user,
	users,
} from "../http/user"
import { checkAuthStatus } from "../utils/auth"

export const useMe = () => {
	const { isAuthenticated } = checkAuthStatus()
	return useQuery({
		queryKey: ["me"],
		queryFn: me,
		enabled: isAuthenticated,
	})
}

export const useUsers = (params: UsersRequest) => {
	return useQuery({
		queryKey: ["users", params],
		queryFn: () => users(params),
	})
}

export const useUser = (id: string | number) => {
	return useQuery({
		queryKey: ["users", id],
		queryFn: () => user({ id }),
		enabled: !!id,
	})
}

export const useAddUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: addUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] })
		},
	})
}

export const useUpdateUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] })
		},
	})
}

export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] })
		},
	})
}
