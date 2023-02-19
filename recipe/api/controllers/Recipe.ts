import { Request, Response } from "express"
import { RecipeQuery } from "../../query/Recipe"
import { ProfileMiddlewareType } from "../../types/middleware"
import {
	DBQueryType,
	ProfileQueryType,
	RecipeQueryType
} from "../../types/query"
import { ResponseBodyType } from "../../types/response"
import { RecipeSchemaType, RecipeUpdateType } from "../../types/schema"
import { RECIPE_FIELDS } from "../../utils/constants"
import { RequestBodyHandler } from "../../utils/handleFields"
import { ResponseBody } from "../../utils/handleResponse"

class RecipeController {
	//TODO: Validate Schema
	static isValidSchema(
		requestBody: RecipeUpdateType,
		router: String
	): Boolean {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(requestBody)

		//? if no properties exist
		if (reqBodyKeys.length === 0) return false

		//* Handle for Add Recipe
		if (router === "ADD") {
			//? Handle mandatory fields
			for (let i = 0; i < RECIPE_FIELDS.length; i++) {
				const field = RECIPE_FIELDS[i]
				if (!requestBody.hasOwnProperty(field)) return false
				if (
					typeof requestBody[field] !== "string" ||
					requestBody[field]?.length === 0
				)
					return false
			}
			return true
		}

		//* Handle for Update Education
		if (router === "UPDATE") {
			//? Handle optional fields
			for (let i = 0; i < reqBodyKeys.length; i++) {
				const recipeKey = reqBodyKeys[i]

				if (!RECIPE_FIELDS.includes(recipeKey)) return false
				else if (
					typeof requestBody[recipeKey] !== "string" ||
					requestBody[recipeKey]?.length === 0
				)
					return false
			}
			return true
		}
		return false
	}

	//TODO: Get All Recipe
	async getAllRecipe(
		request: Request,
		response: Response
	): Promise<Response> {
		//? Build the query
		const getAllRecipeQuery: DBQueryType = {
			text: "SELECT * FROM recipes",
			values: []
		}

		//? Get all recipes from the database
		const getAllRecipeQueryResponse: ResponseBodyType =
			await RecipeQuery.get(getAllRecipeQuery)

		//? Handle the response
		return ResponseBody.handleResponse(response, getAllRecipeQueryResponse)
	}

	//TODO: Get Recipe By id (public)
	async getRecipeById(
		request: Request,
		response: Response
	): Promise<Response> {
		const recipeIdQuery: RecipeQueryType = request.params

		//? Handle Bad Request
		if (!RequestBodyHandler.isValidMandatoryFields(recipeIdQuery, ["id"]))
			return ResponseBody.handleBadRequest(response)

		//? Build the query to fetch by id
		const getRecipeByIdQuery: DBQueryType = {
			text: `SELECT * FROM recipes WHERE id = $1`,
			values: [recipeIdQuery.id]
		}

		//? Get recipe by query
		const getRecipeByIdQueryResponse: ResponseBodyType =
			await RecipeQuery.get(getRecipeByIdQuery)

		//? Handle Response
		return ResponseBody.handleResponse(response, getRecipeByIdQueryResponse)
	}

	//TODO: Get Recipe by Name (public)
	async getRecipeByName(
		request: Request,
		response: Response
	): Promise<Response> {
		const recipeQuery: RecipeQueryType = request.query

		//? Handle Bad Request
		if (!RequestBodyHandler.isValidMandatoryFields(recipeQuery, ["name"]))
			return ResponseBody.handleBadRequest(response)

		//? Build the query to fetch by name
		const getRecipeByNameQuery: DBQueryType = {
			text: `SELECT * FROM recipes WHERE name = $1`,
			values: [recipeQuery.name]
		}

		//? Get recipe by query
		const getRecipeByNameQueryResponse: ResponseBodyType =
			await RecipeQuery.get(getRecipeByNameQuery)

		//? Handle the response
		return ResponseBody.handleResponse(
			response,
			getRecipeByNameQueryResponse
		)
	}

	//TODO: Get Recipe by Profile Id (public)
	async getRecipeByProfileId(
		request: Request,
		response: Response
	): Promise<Response> {
		const profileQuery: ProfileQueryType = request.query

		//? Handle Bad Request
		if (!RequestBodyHandler.isValidMandatoryFields(profileQuery, ["id"]))
			return ResponseBody.handleBadRequest(response)

		//? Build the query to fetch by id
		const getRecipeByProfileIdQuery: DBQueryType = {
			text: `SELECT * FROM recipes WHERE profile_id = $1`,
			values: [profileQuery.id]
		}

		//? Get recipe by query
		const getRecipeByProfileIdQueryResponse: ResponseBodyType =
			await RecipeQuery.get(getRecipeByProfileIdQuery)

		//? Handle the response
		return ResponseBody.handleResponse(
			response,
			getRecipeByProfileIdQueryResponse
		)
	}

	//TODO: Add Recipe for a Profile (authorization required)
	async addRecipe(request: Request, response: Response): Promise<Response> {
		const inputRecipeDetails: RecipeSchemaType = request.body

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle Bad Request
		if (
			Object.keys(inputRecipeDetails).length === 0 ||
			!RecipeController.isValidSchema(inputRecipeDetails, "ADD")
		)
			return ResponseBody.handleBadRequest(response)

		//? Set the profile id from the middleware
		inputRecipeDetails.profile_id = profile.id.toString()

		//? Build the query to insert the recipe
		const addRecipeQuery: DBQueryType = {
			text: "insert into recipes(name,ingredients,directions,profile_id) values($1, $2, $3, $4)",
			values: [
				inputRecipeDetails.name,
				inputRecipeDetails.ingredients,
				inputRecipeDetails.directions,
				inputRecipeDetails.profile_id
			]
		}

		//? Add the recipe to the database
		const addRecipeQueryResponse: ResponseBodyType = await RecipeQuery.add(
			addRecipeQuery
		)

		//? Handle the response
		return ResponseBody.handleResponse(response, addRecipeQueryResponse)
	}

	//TODO: Update Recipe for a Profile (authorization required)
	async updateRecipe(
		request: Request,
		response: Response
	): Promise<Response> {
		//? Grab the request body
		const inputRecipeDetails: RecipeUpdateType = request.body
		const recipeQuery: RecipeQueryType = request.params

		//? Grab the recipe id from the query
		const recipeId: String = recipeQuery.id

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle Bad Request
		if (
			Object.keys(inputRecipeDetails).length === 0 ||
			!RecipeController.isValidSchema(inputRecipeDetails, "UPDATE")
		)
			return ResponseBody.handleBadRequest(response)

		//? Build the update query
		const updateRecipeQuery: DBQueryType = {
			text: "update recipes SET name = $2, ingredients = $3 , directions = $4 where id = $1 and profile_id = $5",
			values: [
				recipeId,
				inputRecipeDetails.name,
				inputRecipeDetails.ingredients,
				inputRecipeDetails.directions,
				profile.id
			]
		}

		//? Update the recipe details in the database
		const updateRecipeQueryResponse: ResponseBodyType =
			await RecipeQuery.update(updateRecipeQuery)

		//? Handle the response
		return ResponseBody.handleResponse(response, updateRecipeQueryResponse)
	}

	//TODO: Delete Recipe by Id for a Profile (authorization required)
	async deleteRecipeById(
		request: Request,
		response: Response
	): Promise<Response> {
		const recipeQuery: RecipeQueryType = request.params

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle Bad Request
		if (!RequestBodyHandler.isValidMandatoryFields(recipeQuery, ["id"]))
			return ResponseBody.handleBadRequest(response)

		//? Grab the recipe id from the query
		const recipeId: String = recipeQuery.id

		//? Build the query
		const deleteRecipeQuery: DBQueryType = {
			text: "delete from recipes where id = $1 and profile_id = $2",
			values: [recipeId, profile.id]
		}

		//? Delete the recipe from the database
		const deleteRecipeQueryResponse: ResponseBodyType =
			await RecipeQuery.delete(deleteRecipeQuery)

		//? Handle the response
		return ResponseBody.handleResponse(response, deleteRecipeQueryResponse)
	}

	//TODO: Delete All Recipes for a Profile (authorization required)
	async deleteAllRecipes(
		request: Request,
		response: Response
	): Promise<Response> {
		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Build the query
		const deleteAllRecipesQuery: DBQueryType = {
			text: "delete from recipes where profile_id = $1",
			values: [profile.id]
		}

		//? Delete all recipes for the profile
		const deleteAllRecipesQueryResponse: ResponseBodyType =
			await RecipeQuery.delete(deleteAllRecipesQuery)

		//?Handle the response
		return ResponseBody.handleResponse(
			response,
			deleteAllRecipesQueryResponse
		)
	}
}

export { RecipeController }
