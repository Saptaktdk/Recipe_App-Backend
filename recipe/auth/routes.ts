import express from "express"
import { AuthController } from "./controller"
import { TokenMiddleWare } from "../middleware/verifyToken"

const authController = new AuthController()
const AuthRouter = express.Router()

AuthRouter.post("/register", authController.register)
AuthRouter.post("/login", authController.login)
AuthRouter.post("/token", authController.generateToken)
AuthRouter.post("/logout", TokenMiddleWare, authController.logout)
AuthRouter.post("/reset-password", authController.resetPassword)

export { AuthRouter }
