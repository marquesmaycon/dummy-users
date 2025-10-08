import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query"
import {
	addUser,
	deleteUser,
	me,
	type UpdateUserRequest,
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
		select: ({ users, ...data }) => ({
			...data,
			users: users.map((user) => ({ key: user.id, ...user })),
		}),
		placeholderData: keepPreviousData,
	})
}

export const useUser = (id: number | null) => {
	return useQuery({
		queryKey: ["users", id],
		queryFn: async () => {
			if (!id) return Promise.reject("User ID is required")
			return await user({ id })
		},
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

export const useUpdateUser = (userId: number | null) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: UpdateUserRequest) => {
			if (!userId) return Promise.reject("User ID is required")
			return await updateUser({ id: userId, ...data })
		},
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
