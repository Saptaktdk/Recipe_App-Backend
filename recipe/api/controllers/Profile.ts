import { Request, Response } from "express"
import { ProfileQuery } from "../../query/Profile"
import { ProfileMiddlewareType } from "../../types/middleware"
import { DBQueryType, ProfileQueryType } from "../../types/query"
import { ResponseBodyType } from "../../types/response"
import { ProfileSchemaType, ProfileUpdateType } from "../../types/schema"
import { RequestBodyHandler } from "../../utils/handleFields"
import { hashPassword } from "../../utils/handlePassword"
import { ResponseBody } from "../../utils/handleResponse"

class ProfileController {
	//TODO Check Valid Schema
	static isValidSchema(requestBody: ProfileUpdateType): Boolean {
		if ("name" in requestBody) {
			if (
				typeof requestBody?.name !== "string" ||
				requestBody?.name.length === 0
			)
				return false
		}
		if ("password" in requestBody) {
			if (
				typeof requestBody?.password !== "string" ||
				requestBody?.password.length === 0
			)
				return false
		}
		return true
	}

	//TODO: Get Profile By Name
	async getProfileByName(
		request: Request,
		response: Response
	): Promise<Response> {
		//? Grab the profile name from query
		const profileQuery: ProfileQueryType = request.query

		//? Handle Bad Request
		if (!RequestBodyHandler.isValidMandatoryFields(profileQuery, ["name"]))
			return ResponseBody.handleBadRequest(response)

		//? Build the query to fetch by name
		const getProfileByNameQuery: DBQueryType = {
			text: "SELECT * FROM profiles WHERE lower(name) like '%' || $1 || '%'",
			values: [profileQuery.name.toLowerCase()]
		}

		//? Get Profile by Query
		const getProfileByNameQueryResponse: ResponseBodyType =
			await ProfileQuery.get(getProfileByNameQuery, true)

		//? Handle Response
		return ResponseBody.handleResponse(
			response,
			getProfileByNameQueryResponse
		)
	}

	//TODO: Get Profile By Id
	async getProfileById(
		request: Request,
		response: Response
	): Promise<Response> {
		//? Grab the profile name from query
		const profileQuery: ProfileQueryType = request.params

		//? Handle Bad Request
		if (!RequestBodyHandler.isValidMandatoryFields(profileQuery, ["id"]))
			return ResponseBody.handleBadRequest(response)

		//? Build the query to fetch by name
		const getProfileByIdQuery: DBQueryType = {
			text: "SELECT * FROM profiles WHERE id = $1",
			values: [profileQuery.id]
		}

		//? Get Profile by Query
		const getProfileByIdQueryResponse: ResponseBodyType =
			await ProfileQuery.get(getProfileByIdQuery, true)

		//? Handle Response
		return ResponseBody.handleResponse(
			response,
			getProfileByIdQueryResponse
		)
	}

	//TODO: Update Profile
	async updateProfile(
		request: Request,
		response: Response
	): Promise<Response> {
		//? Grab the request body
		const inputProfileDetails: ProfileSchemaType = request.body

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle Schema
		if (
			Object.keys(inputProfileDetails).length === 0 ||
			!ProfileController.isValidSchema(inputProfileDetails)
		)
			return ResponseBody.handleBadRequest(response)

		//? Grab the profile id from the middleware
		const profileId: string = profile.id.toString()

		//TODO: -------- Query ------------------------
		let updateProfileQuery: DBQueryType

		//? If name was only given
		if (
			inputProfileDetails.hasOwnProperty("name") &&
			!inputProfileDetails.hasOwnProperty("password")
		) {
			updateProfileQuery = {
				text: "UPDATE profiles SET name = $1 WHERE id = $2",
				values: [inputProfileDetails.name, profileId]
			}
		}
		//? If password was only given
		else if (
			!inputProfileDetails.hasOwnProperty("name") &&
			inputProfileDetails.hasOwnProperty("password")
		) {
			const hashedPassword: string = await hashPassword(
				inputProfileDetails.password.toString()
			)
			updateProfileQuery = {
				text: "UPDATE profiles SET password = $1 WHERE id = $2",
				values: [hashedPassword, profileId]
			}
		}
		//? if both name and password were given
		else if (
			inputProfileDetails.hasOwnProperty("name") &&
			inputProfileDetails.hasOwnProperty("password")
		) {
			const hashedPassword: string = await hashPassword(
				inputProfileDetails.password.toString()
			)
			updateProfileQuery = {
				text: "UPDATE profiles SET name = $1, password = $2 WHERE id = $3",
				values: [inputProfileDetails.name, hashedPassword, profileId]
			}
		}

		//? Update profile By Query
		const updateProfileResponse: ResponseBodyType =
			await ProfileQuery.update(updateProfileQuery)

		//? Handle response
		return ResponseBody.handleResponse(response, updateProfileResponse)
	}

	//! Delete Profile
	async deleteProfile(
		request: Request,
		response: Response
	): Promise<Response> {
		return
	}
}

export { ProfileController }
