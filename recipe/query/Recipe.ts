import { pool } from "../db/recipedb"
import { DBQueryType } from "../types/query"
import { ResponseBodyType } from "../types/response"
import { ResponseStatusHandler } from "../utils/handleResponse"

class RecipeQuery {
	constructor() {}

	//TODO: Schema Name
	static schema: string = "Recipe"

	//TODO: Get Recipes based on query
	static async get(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const getRecipeResponse = await pool.query(query)

			if (getRecipeResponse?.rows.length === 0)
				return ResponseStatusHandler.error_not_found(RecipeQuery.schema)

			if (getRecipeResponse?.rows.length === 1)
				return ResponseStatusHandler.success_get_one(
					RecipeQuery.schema,
					getRecipeResponse.rows[0]
				)

			if (getRecipeResponse?.rows.length > 1)
				return ResponseStatusHandler.success_get_many(
					RecipeQuery.schema,
					getRecipeResponse.rows
				)
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}

	//TODO: Add Recipe for a profile
	static async add(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const addRecipeResponse = await pool.query(query)

			if (addRecipeResponse.rowCount === 0)
				return ResponseStatusHandler.error_not_found(RecipeQuery.schema)

			if (addRecipeResponse.rowCount === 1)
				return ResponseStatusHandler.success_add(RecipeQuery.schema)

			return ResponseStatusHandler.error_unknown()
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}

	//TODO: Update Recipe by query for a profile
	static async update(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const updateRecipeResponse = await pool.query(query)

			if (updateRecipeResponse.rowCount === 0)
				return ResponseStatusHandler.error_not_found(RecipeQuery.schema)

			if (updateRecipeResponse.rowCount === 1)
				return ResponseStatusHandler.success_update(RecipeQuery.schema)

			return ResponseStatusHandler.error_unknown()
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}

	//TODO: Delete Recipe by query for a profile
	static async delete(query: DBQueryType): Promise<ResponseBodyType> {
		try {
			const deleteRecipeResponse = await pool.query(query)

			if (deleteRecipeResponse.rowCount === 0)
				return ResponseStatusHandler.error_not_found(RecipeQuery.schema)

			if (deleteRecipeResponse.rowCount === 1)
				return ResponseStatusHandler.success_delete_one(
					RecipeQuery.schema
				)

			if (deleteRecipeResponse.rowCount > 1)
				return ResponseStatusHandler.success_delete_many(
					RecipeQuery.schema,
					deleteRecipeResponse.rowCount
				)

			return ResponseStatusHandler.error_unknown()
		} catch (error) {
			return ResponseStatusHandler.error_known(error)
		}
	}
}

export { RecipeQuery }
