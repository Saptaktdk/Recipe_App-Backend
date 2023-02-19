import { AuthorizationResponseType } from "../types/response"
import { AUTHENTICATION_METHOD, RECIPE_ACCESS_TOKEN_HEADER } from "./constants"
import { Request } from "express"

const getAuthorizationType = (request: Request) => {
	//? List request headers
	const headers = request.headers

	//? Initialize authorization response
	const authorizationResponse: AuthorizationResponseType = {
		type: "",
		value: ""
	}

	//? Check if API key passed in header
	// if (PORTFOLIO_API_KEY_HEADER in headers) {
	// 	authorizationResponse.type = AUTHENTICATION_METHOD.API_KEY
	// 	authorizationResponse.value =
	// 		headers[RECIPE_API_KEY_HEADER].toString()
	// 	return authorizationResponse
	// }

	//? Check if access_token passed in authorization header
	if (RECIPE_ACCESS_TOKEN_HEADER in headers) {
		authorizationResponse.type = AUTHENTICATION_METHOD.JWT
		authorizationResponse.value =
			headers[RECIPE_ACCESS_TOKEN_HEADER].toString()
		return authorizationResponse
	}
	return null
}

export { getAuthorizationType }
