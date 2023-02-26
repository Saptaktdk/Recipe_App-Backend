import express from "express"
import { ProfileController } from "../controllers/Profile"
import { TokenMiddleWare } from "../../middleware/verifyToken"

const profileController = new ProfileController()
const ProfileRouter = express.Router()

ProfileRouter.get("/", TokenMiddleWare, profileController.getProfile)
ProfileRouter.get("/:id", profileController.getProfileById)
ProfileRouter.put("/update", TokenMiddleWare, profileController.updateProfile)
ProfileRouter.delete(
	"/delete",
	TokenMiddleWare,
	profileController.deleteProfile
)

export { ProfileRouter }
