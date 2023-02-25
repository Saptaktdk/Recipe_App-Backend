import {Request, Response} from "express"
import { ProfileQuery } from "../query/Profile"
import { TokenQuery } from "../query/Token"
import {
	PayloadSchemaType,
	ProfileSchemaType,
	TokenSchemaType
} from "../types/schema"
import { ResponseBody } from "../utils/handleResponse"
import { DBQueryType } from "../types/query"
import { hashPassword, comparePassword } from "../utils/handlePassword"
import { RequestBodyHandler } from "../utils/handleFields"
import {
	RECIPE_PROFILE_LOGIN_FIELDS,
	RECIPE_PROFILE_REGISTER_FIELDS,
	TOKEN
} from "../utils/constants"
import { ResponseBodyType } from "../types/response"
import {
	generateAccessToken,
	generateRefreshToken,
	verifyToken
} from "../utils/handleToken"

//? Authentication Controller
class AuthController {
	//TODO: Register User
	async register(request: Request, response: Response) {
		//? Grab the request body
		const inputProfileDetails: ProfileSchemaType = request.body

		//? Handle Bad Request
		if (
			!RequestBodyHandler.isValidMandatoryFields(
				inputProfileDetails,
				RECIPE_PROFILE_REGISTER_FIELDS
			)
		)
			return ResponseBody.handleBadRequest(response)

		//? Handle lowercase
		inputProfileDetails.email = inputProfileDetails.email
			.toString()
			.toLowerCase()

		//? Get Profile by email Query
		const getExistingProfileQuery: DBQueryType = {
			text: "SELECT * FROM profiles WHERE email = $1",
			values: [inputProfileDetails.email]
		}

		//? Get profile by email
		const getProfileResponse: ResponseBodyType = await ProfileQuery.get(
			getExistingProfileQuery
		)

		//? if status is 200
		if (getProfileResponse.status === 200)
			return ResponseBody.error_exists(response, {
				status: 403,
				error: `Profile already exists for email ${inputProfileDetails.email}`
			})

		//? Check if profile exists for the email
		if (getProfileResponse.status === 404) {
			//? Hash the password
			inputProfileDetails.password = await hashPassword(
				inputProfileDetails.password.toString()
			)

			//? register profile
			const addProfileQuery = {
				text: "INSERT INTO profiles(name,email,password) values($1,$2,$3)",
				values: [
					inputProfileDetails.name,
					inputProfileDetails.email,
					inputProfileDetails.password
				]
			}

			//? Add the profile in the database
			const addProfileResponse = await ProfileQuery.add(addProfileQuery)
			return ResponseBody.handleResponse(response, addProfileResponse)
		}

		//? Handle response
		return ResponseBody.handleResponse(response, getProfileResponse)
	}

	//TODO: Login User
	async login(request: Request, response: Response) {
		//? Grab the request body
		const inputProfileDetails: ProfileSchemaType = request.body

		//? Handle Bad Request
		if (
			!RequestBodyHandler.isValidMandatoryFields(
				inputProfileDetails,
				RECIPE_PROFILE_LOGIN_FIELDS
			)
		)
			return ResponseBody.handleBadRequest(response)

		//? Handle lowercase
		inputProfileDetails.email = inputProfileDetails.email
			.toString()
			.toLowerCase()

		//? Get existing profile query by email
		const getExistingProfileQuery: DBQueryType = {
			text: "SELECT * FROM profiles WHERE email = $1",
			values: [inputProfileDetails.email]
		}

		//? declare a variable to store the response
		let existingProfileResponse: ResponseBodyType

		//? Check user by email or username in the database
		if (
			RequestBodyHandler.isValidMandatoryFields(inputProfileDetails, [
				"email"
			])
		)
			existingProfileResponse = await ProfileQuery.get(
				getExistingProfileQuery
			)

		//? Check if the profile exists by email or username
		if (existingProfileResponse.status === 404)
			return ResponseBody.error_not_found(
				response,
				existingProfileResponse
			)

		//? If profile found, Grab the profile from the response
		const profileEntity = existingProfileResponse.data

		//? compare password (request body with profile entity)
		const comparePasswordStatus: Boolean = await comparePassword(
			inputProfileDetails.password.toString(),
			profileEntity.password.toString()
		)

		//? If password does not match
		if (!comparePasswordStatus)
			return ResponseBody.error_not_matched(response, {
				status: 401,
				error: `Error! Password did not match`
			})

		//? Create the payload
		const payload: PayloadSchemaType = {
			id: profileEntity.id.toString()
		}

		//? Create Access Token and Refresh Token
		const accessToken: String = generateAccessToken(payload)
		const refreshToken: String = generateRefreshToken(payload)

		//TODO: ------------- Queries -----------------------
		//? Get token query
		const getTokenQuery: DBQueryType = {
			text: `SELECT * FROM tokens WHERE profile_id = $1`,
			values: [profileEntity.id.toString()]
		}

		//? Add Token Query
		const addTokenQuery: DBQueryType = {
			text: "INSERT INTO tokens (token,profile_id) VALUES ($1,$2)",
			values: [refreshToken, payload.id]
		}

		//? Update token to db if found , else add the token
		const updateTokenQuery: DBQueryType = {
			text: "update tokens set token = $1 where profile_id = $2",
			values: [refreshToken, profileEntity.id.toString()]
		}

		//TODO: ---------------- o -----------------------

		//? Query Token by Profile ID
		const getTokenResponse: ResponseBodyType = await TokenQuery.get(
			getTokenQuery
		)

		//? if token found then update else add the token
		if (getTokenResponse.status === 200) {
			//? Update Token
			const updateTokenResponse: ResponseBodyType =
				await TokenQuery.update(updateTokenQuery)

			if (updateTokenResponse.status === 201)
				return ResponseBody.success_auth(response, {
					status: 200,
					message: `Success! ${profileEntity.name} logged in successfully!`,
					data: {
						access_token: accessToken,
						refresh_token: refreshToken
					}
				})
			return ResponseBody.handleResponse(response, updateTokenResponse)
		} else if (getTokenResponse.status === 404) {
			//? Add the token to the DB
			const addTokenResponse: ResponseBodyType = await TokenQuery.add(
				addTokenQuery
			)

			if (addTokenResponse.status === 201)
				return ResponseBody.success_auth(response, {
					status: 200,
					message: `Success! ${profileEntity.name} logged in successfully!`,
					data: {
						accessToken: accessToken,
						refreshToken: refreshToken
					}
				})
		}

		//? Else handle response
		return ResponseBody.handleResponse(response, getTokenResponse)
	}

	//TODO: Generate Token
	async generateToken(request: Request, response: Response) {
		//? Grab the request body
		const inputTokenDetails: TokenSchemaType = request.body

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidMandatoryFields(inputTokenDetails, [
				"token"
			])
		)
			return ResponseBody.handleBadRequest(response)

		//? Else grab the refresh token
		const refreshToken: string = inputTokenDetails.token.toString()

		//? Check if the refresh token is valid
		let payload: PayloadSchemaType

		try {
			const tokenVerifiedPayload = verifyToken(
				refreshToken,
				TOKEN.refreshToken
			)
			payload = { id: tokenVerifiedPayload["id"].toString() }
		} catch (error) {
			return ResponseBody.error_token_invald(response, {
				status: 401,
				error: `Error! Token verification failed`
			})
		}

		//TODO: --------- Query -------------------
		//? Get token query
		const getTokenQuery: DBQueryType = {
			text: `SELECT * FROM tokens WHERE token = $1`,
			values: [refreshToken]
		}

		//? If verified, check if the refresh token exists in the database
		const existingTokenResponse: ResponseBodyType = await TokenQuery.get(
			getTokenQuery
		)

		//? If refresh token was found, create the access token
		if (existingTokenResponse.status === 200) {
			//* generate access token with the payload
			const newAccessToken = generateAccessToken(payload)

			//* return the access token
			return ResponseBody.success_found(response, {
				status: 200,
				message: `Token successfully generated`,
				data: {
					access_token: newAccessToken
				}
			})
		}

		//? if token not found
		if (existingTokenResponse.status === 404)
			return ResponseBody.error_unauthorized(response, {
				status: 401,
				error: `Error! Refresh Token not found, user not Logged in!`
			})

		//? Else handle response
		return ResponseBody.handleResponse(response, existingTokenResponse)
	}

	//TODO: Logout user (authorization required)
	async logout(request: Request, response: Response) {
		//? Grab the refresh token from request body
		const inputTokenDetails: TokenSchemaType = request.body

		//? Handle Bad Request
		if (
			!RequestBodyHandler.isValidMandatoryFields(inputTokenDetails, [
				"token"
			])
		)
			return ResponseBody.handleBadRequest(response)

		//? Query
		const deleteTokenquery: DBQueryType = {
			text: "DELETE FROM tokens WHERE token = $1",
			values: [inputTokenDetails.token]
		}

		const getTokenResponse = await TokenQuery.delete(deleteTokenquery)

		//? If the status is 200
		if (getTokenResponse.status === 200)
			return ResponseBody.success_delete(response, getTokenResponse)

		//? Handle other responses
		return ResponseBody.handleResponse(response, getTokenResponse)
	}

	async resetPassword(request: Request, response: Response) {}
}

export { AuthController }
