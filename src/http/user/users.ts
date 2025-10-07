import { dummyApi, type Pagination, type User } from "../../libs/dummy-api"

export type UsersRequest = {
	limit?: number
	page?: number
	skip?: number
	q?: string
	filter?: Partial<User>
}

type UsersResponse = Pagination & {
	users: User[]
}

export async function users({ limit, page, skip, q, filter }: UsersRequest) {
	const resp = await dummyApi.get<UsersResponse>("/users", {
		params: { limit, page, skip, q, ...filter },
	})
	return resp.data
}
