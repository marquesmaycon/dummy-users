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
	type UserResponse,
	type UsersRequest,
	type UsersResponse,
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
		queryKey: ["user", id],
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
		onSuccess: (data) => {
			queryClient.setQueriesData<UsersResponse>(
				{ queryKey: ["users"] },
				(oldData) => updateUserCache(data, oldData),
			)
			queryClient.setQueryData(["user", data.id], data)
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
		onSuccess: (data) => {
			queryClient.setQueriesData<UsersResponse>(
				{ queryKey: ["users"] },
				(oldData) => {
					console.log(oldData)
					return updateUserCache(data, oldData)
				},
			)
			queryClient.setQueryData<UserResponse>(["user", userId], (oldData) => {
				if (!oldData) return oldData
				return { ...oldData, ...data }
			})
		},
	})
}

export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteUser,
		onSuccess: (_, { id }) => {
			queryClient.setQueriesData(
				{ queryKey: ["users"] },
				(oldData: UsersResponse | undefined) => {
					if (!oldData) return oldData
					const filteredUsers = oldData.users.filter((user) => user.id !== id)
					return { ...oldData, users: filteredUsers }
				},
			)
			queryClient.setQueryData(["user", id], undefined)
		},
	})
}

const updateUserCache = (
	newData: Partial<UpdateUserRequest>,
	oldData: UsersResponse | undefined,
) => {
	if (!oldData) return oldData

	const updatedUsers = oldData.users.map((user) =>
		user.id === newData.id ? { ...user, ...newData } : user,
	)
	return { ...oldData, users: updatedUsers }
}