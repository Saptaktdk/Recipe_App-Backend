import express from "express"
import cors from "cors"
import { AuthRouter } from "./recipe/auth/routes"
import { RECIPE_AUTH_PORT } from "./recipe/utils/constants"

//? Initialize Express app
const app = express()

// TODO: Set AUTH port
const PORT = process.env.PORT || RECIPE_AUTH_PORT

//TODO: Configure CORS
app.use(cors())

//TODO: Configure body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//? Auth routes
app.use("/auth", AuthRouter)

//TODO: Listen to Auth Server connections on PORT
app.listen(PORT, () => {
	console.log(
		`Recipe: AUTH-Server running successfully on http://localhost:${PORT}`
	)
})
