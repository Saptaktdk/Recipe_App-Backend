export type ProfileSchemaType = {
	id?: String
	name?: String
	email?: String
	password?: String
}

export type ProfileUpdateType = {
	name?: String
	password?: String
}

export type RecipeSchemaType = {
	id?: String
	name?: String
	ingredients?: String
	directions?: String
	profile_id?: String
}

export type RecipeUpdateType = {
	id?: String
	name?: String
	ingredients?: String
	directions?: String
}

export type TokenSchemaType = {
	id?: String
	token?: String
	profile_id?: String
}

//? Payload type
export type PayloadSchemaType = {
	id: String
}
