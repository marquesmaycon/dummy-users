import { dummyApi, type Pagination, type User } from "../../libs/dummy-api"

export type UsersRequest = {
	isAdmin: boolean
	limit?: number
	skip?: number
}

export type UsersResponse = Pagination & {
	users: User[]
}

export async function users({ limit, skip, isAdmin }: UsersRequest) {
	const resp = await dummyApi.get<UsersResponse>(
		`/users${!isAdmin ? "/filter" : ""}`,
		{
			params: {
				limit,
				skip,
				...(!isAdmin ? { key: "role", value: "user" } : {}),
			},
		},
	)
	return resp.data
}
