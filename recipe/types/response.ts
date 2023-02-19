export type ResponseBodyType = {
	status?: number
	message?: String
	data?: any
	error?: String
}

//? Authorization response
export type AuthorizationResponseType = {
	type: String
	value: String
}
