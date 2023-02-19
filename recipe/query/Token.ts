import { ResponseBodyType } from "../types/response"
import { pool } from "../db/recipedb"
import { DBQueryType } from "../types/query"
import { ResponseStatusHandler } from "../utils/handleResponse"

class TokenQuery {
	constructor() {}

	//TODO: Schema Name
	static schema: string = "Token"

	//TODO: Get Multiple Tokens based on query
	static async get(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const getTokenResponse = await pool.query(query)

			if (getTokenResponse?.rows.length === 0)
				return ResponseStatusHandler.error_not_found(TokenQuery.schema)

			if (getTokenResponse?.rows.length === 1)
				return ResponseStatusHandler.success_get_one(
					TokenQuery.schema,
					getTokenResponse.rows[0]
				)

			if (getTokenResponse?.rows.length > 1)
				return ResponseStatusHandler.success_get_many(
					TokenQuery.schema,
					getTokenResponse.rows
				)
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}

	//TODO: Add Token for a profile
	static async add(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const addTokenResponse = await pool.query(query)

			if (addTokenResponse.rowCount === 0)
				return ResponseStatusHandler.error_not_found(TokenQuery.schema)

			if (addTokenResponse.rowCount === 1)
				return ResponseStatusHandler.success_add(TokenQuery.schema)

			return ResponseStatusHandler.error_unknown()
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}

	//TODO: Update Token by query for a profile
	static async update(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const updateTokenResponse = await pool.query(query)

			if (updateTokenResponse.rowCount === 0)
				return ResponseStatusHandler.error_not_found(TokenQuery.schema)

			if (updateTokenResponse.rowCount === 1)
				return ResponseStatusHandler.success_update(TokenQuery.schema)

			return ResponseStatusHandler.error_unknown()
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}

	//TODO: Delete Token by query for a profile
	static async delete(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const deleteTokenResponse = await pool.query(query)

			if (deleteTokenResponse.rowCount === 0)
				return ResponseStatusHandler.error_not_found(TokenQuery.schema)

			if (deleteTokenResponse.rowCount === 1)
				return ResponseStatusHandler.success_delete_one(
					TokenQuery.schema
				)

			return ResponseStatusHandler.error_unknown()
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}
}

export { TokenQuery }
