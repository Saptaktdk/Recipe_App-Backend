import dotenv from "dotenv"
import { handleEnv } from "./handleEnv"

//? Load Environment variables
dotenv.config(handleEnv())

//? RECIPE Auth Server PORT
export const RECIPE_AUTH_PORT = process.env.RECIPE_AUTH_PORT

//? RECIPE Api Server PORT
export const RECIPE_API_PORT = process.env.RECIPE_API_PORT

//? RECIPE Admin Server PORT
export const RECIPE_ADMIN_PORT = process.env.RECIPE_ADMIN_PORT

//? Database Connection URL
export const RECIPE_DB_CONNECTION_URL = process.env.RECIPE_DB_CONNECTION_URL

//TODO: Database
//? RECIPE Database Name
export const RECIPE_DB_USER = process.env.RECIPE_DB_USER
export const RECIPE_DB_HOST = process.env.RECIPE_DB_HOST
export const RECIPE_DB_NAME = "recipe_db"
export const RECIPE_DB_PASSWORD = process.env.RECIPE_DB_PASSWORD
export const RECIPE_DB_PORT = process.env.RECIPE_DB_PORT

//? Acess Token Secret
export const RECIPE_ACCESS_TOKEN_SECRET = process.env.RECIPE_ACCESS_TOKEN_SECRET

//? Refresh Token Secret
export const RECIPE_REFRESH_TOKEN_SECRET =
	process.env.RECIPE_REFRESH_TOKEN_SECRET

//? Access Token Expiration Time
export const RECIPE_ACCESS_TOKEN_EXPIRATION_TIME = "45m"

//? Refresh Token Expiration Time
export const RECIPE_REFRESH_TOKEN_EXPIRATION_TIME = ""

//? Access Token Header
export const RECIPE_ACCESS_TOKEN_HEADER: string = "authorization"

export const RECIPE_PROFILE_REGISTER_FIELDS: Array<string> = [
	"name",
	"email",
	"password"
]

export const RECIPE_PROFILE_LOGIN_FIELDS: Array<string> = ["email", "password"]

export const RECIPE_FIELDS: Array<string> = [
	"name",
	"ingredients",
	"directions"
]

export const TOKEN = {
	refreshToken: "refresh_token",
	accessToken: "access_token"
}

export const AUTHENTICATION_METHOD = {
	JWT: "jwt",
	API_KEY: "api_key"
}
