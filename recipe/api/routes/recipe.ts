import express from "express"
import { ProfileController } from "../controllers/Profile"
import { TokenMiddleWare } from "../../middleware/verifyToken"

const profileController = new ProfileController()
const ProfileRouter = express.Router()

ProfileRouter.get("/", profileController.getProfileByName)
ProfileRouter.get("/:id", profileController.getProfileById)
ProfileRouter.put("/update", TokenMiddleWare, profileController.updateProfile)
ProfileRouter.delete(
	"/delete",
	TokenMiddleWare,
	profileController.deleteProfile
)

export { ProfileRouter }
