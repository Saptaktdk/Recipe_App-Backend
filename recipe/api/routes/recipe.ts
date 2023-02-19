import express from "express"
import { RecipeController } from "../controllers/Recipe"
import { TokenMiddleWare } from "../../middleware/verifyToken"

const recipeController = new RecipeController()
const RecipeRouter = express.Router()

RecipeRouter.get("/all", recipeController.getAllRecipe)
RecipeRouter.get("/", recipeController.getRecipeByName)
RecipeRouter.get("/:id", recipeController.getRecipeById)
RecipeRouter.post("/add", TokenMiddleWare, recipeController.addRecipe)
RecipeRouter.put("/update/:id", TokenMiddleWare, recipeController.updateRecipe)
RecipeRouter.delete(
	"/delete/:id",
	TokenMiddleWare,
	recipeController.deleteRecipeById
)
RecipeRouter.delete("/", TokenMiddleWare, recipeController.deleteAllRecipes)

export { RecipeRouter }

