import { dummyApi, type Pagination, type User } from "../../libs/dummy-api"

export type UsersRequest = {
		isAdmin: boolean
		limit?: number
		page?: number
		skip?: number
	}

type UsersResponse = Pagination & {
	users: User[]
}

export async function users({ limit, page, skip, isAdmin }: UsersRequest) {
	const resp = await dummyApi.get<UsersResponse>(
		`/users${!isAdmin ? "/filter" : ""}`,
		{
			params: {
				limit,
				page,
				skip,
				...(!isAdmin ? { key: "role", value: "user" } : {}),
			},
		},
	)
	return resp.data
}
