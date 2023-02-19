import { PayloadSchemaType } from "../types/schema"
import {
	RECIPE_ACCESS_TOKEN_SECRET,
	RECIPE_REFRESH_TOKEN_SECRET,
	TOKEN,
	RECIPE_ACCESS_TOKEN_EXPIRATION_TIME
} from "./constants"
import jwt from "jsonwebtoken"

//? Generate accessToken
const generateAccessToken = (payload: PayloadSchemaType) => {
	return jwt.sign(payload, RECIPE_ACCESS_TOKEN_SECRET, {
		expiresIn: RECIPE_ACCESS_TOKEN_EXPIRATION_TIME
	})
}

//? Generate refreshToken
const generateRefreshToken = (payload: PayloadSchemaType) => {
	return jwt.sign(payload, RECIPE_REFRESH_TOKEN_SECRET)
}

//? Verify token
const verifyToken = (token: string, tokenType: string) => {
	if (tokenType === TOKEN.refreshToken)
		return jwt.verify(token, RECIPE_REFRESH_TOKEN_SECRET)
	if (tokenType === TOKEN.accessToken)
		return jwt.verify(token, RECIPE_ACCESS_TOKEN_SECRET)
}

export { generateAccessToken, generateRefreshToken, verifyToken }
