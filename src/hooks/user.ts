import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { addUser } from "../http/user/add-user"
import { deleteUser } from "../http/user/delete-user"
import { updateUser } from "../http/user/update-user"
import { user } from "../http/user/user"
import { type UsersRequest, users } from "../http/user/users"

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
