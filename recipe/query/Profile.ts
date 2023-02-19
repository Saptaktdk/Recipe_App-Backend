import { ProfileQueryType } from "../types/query"
import { ResponseBodyType } from "../types/response"
import { pool } from "../db/recipedb"
import { DBQueryType } from "../types/query"
import { ResponseStatusHandler } from "../utils/handleResponse"
import { ProfileMiddlewareType } from "../types/middleware"

class ProfileQuery {
	static schema: string = "Profile"

	constructor() {}

	//TODO: Mask Profile Entity
	static maskedProfileEntity(profileEntity: any) {
		const modifiedProfileEntity: ProfileMiddlewareType = {
			id: profileEntity.id,
			name: profileEntity.name,
			email: profileEntity.email
		}
		return modifiedProfileEntity
	}

	//TODO: Mask Profile Entity List
	static maskedProfileEntityList = (profileEntityList: any) => {
		//? Handle empty list
		if (profileEntityList.length === 0) return []

		let modifiedEntityList: any = []
		for (let i = 0; i < profileEntityList.length; i++) {
			const modifiedProfileEntity: ProfileMiddlewareType = {
				id: profileEntityList[i].id,
				name: profileEntityList[i].name,
				email: profileEntityList[i].email
			}
			modifiedEntityList.push(modifiedProfileEntity)
		}
		return modifiedEntityList
	}

	//TODO: Get Profiles by Query
	static async get(
		query: DBQueryType,
		mask?: Boolean
	): Promise<ResponseBodyType> {
		try {
			const getProfileResponse = await pool.query(query)

			//? If profile count = 0
			if (getProfileResponse?.rows.length === 0)
				return ResponseStatusHandler.error_not_found(
					ProfileQuery.schema
				)

			//? If profile count = 1
			if (getProfileResponse?.rows.length === 1) {
				if (mask) {
					//? Mask profile Entity
					const maskedProfileEntity =
						ProfileQuery.maskedProfileEntity(
							getProfileResponse.rows[0]
						)

					//? return response
					return ResponseStatusHandler.success_get_one(
						ProfileQuery.schema,
						maskedProfileEntity
					)
				}
				return ResponseStatusHandler.success_get_one(
					ProfileQuery.schema,
					getProfileResponse.rows[0]
				)
			}

			//? If profile count > 1
			if (getProfileResponse?.rows.length > 1) {
				if (mask) {
					//? Mask profile Entity
					const maskedProfileEntityList =
						ProfileQuery.maskedProfileEntityList(
							getProfileResponse.rows
						)

					//? return response
					return ResponseStatusHandler.success_get_many(
						ProfileQuery.schema,
						maskedProfileEntityList
					)
				}
				return ResponseStatusHandler.success_get_many(
					ProfileQuery.schema,
					getProfileResponse.rows
				)
			}
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}

	//TODO: Add a profile
	static async add(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const addProfileResponse = await pool.query(query)

			if (addProfileResponse.rowCount === 0)
				return ResponseStatusHandler.error_not_found(
					ProfileQuery.schema
				)

			if (addProfileResponse.rowCount === 1)
				return ResponseStatusHandler.success_add(ProfileQuery.schema)

			return ResponseStatusHandler.error_unknown()
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}

	//TODO: Update profile
	static async update(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const updateProfileResponse = await pool.query(query)

			if (updateProfileResponse.rowCount === 0)
				return ResponseStatusHandler.error_not_found(
					ProfileQuery.schema
				)

			if (updateProfileResponse.rowCount === 1)
				return ResponseStatusHandler.success_update(ProfileQuery.schema)

			return ResponseStatusHandler.error_unknown()
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}

	//TODO: Delete Profile
	static async delete(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const deleteProfileResponse = await pool.query(query)

			if (deleteProfileResponse.rowCount === 0)
				return ResponseStatusHandler.error_not_found(
					ProfileQuery.schema
				)

			if (deleteProfileResponse.rowCount === 1)
				return ResponseStatusHandler.success_delete_one(
					ProfileQuery.schema
				)

			return ResponseStatusHandler.error_unknown()
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}
}

export { ProfileQuery }
