import express from "express"
import cors from "cors"
import { RecipeRouter } from "./recipe/api/routes/recipe"
import { ProfileRouter } from "./recipe/api/routes/profile"
import { RECIPE_API_PORT } from "./recipe/utils/constants"
import { redisClient } from "./recipe/cache/redis"

//TODO: Setup Redis Connection ----------------------
//? Connect to redis
;(async () => {
	await redisClient.connect()
})()

//! Event Listener for error state
redisClient.on("error", (err) => {
	console.log("Error in connecting to Redis! Error: ", err)
})

//? Event Listener for ready state
redisClient.on("ready", () => {
	console.log("Redis Connected Successfully!")
})

//? Initialize Express app
const app = express()

// TODO: Set API port
const PORT = process.env.PORT || RECIPE_API_PORT

//TODO: Configure CORS
app.use(cors())

//TODO: Configure body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//? API routes
app.use("/api/profile", ProfileRouter)
app.use("/api/recipe", RecipeRouter)

//TODO: Listen to Auth Server connections on PORT
app.listen(PORT, () => {
	console.log(
		`Recipe: API-Server running successfully on http://localhost:${PORT}`
	)
})
