import pkg from "pg"
import {
	RECIPE_DB_USER,
	RECIPE_DB_HOST,
	RECIPE_DB_NAME,
	RECIPE_DB_PASSWORD,
	RECIPE_DB_PORT
} from "../utils/constants"

const { Pool } = pkg
const pool = new Pool({
	user: RECIPE_DB_USER,
	host: RECIPE_DB_HOST,
	database: RECIPE_DB_NAME,
	password: RECIPE_DB_PASSWORD,
	port: RECIPE_DB_PORT
})

export { pool }
