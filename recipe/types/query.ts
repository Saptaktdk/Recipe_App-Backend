export type ProfileQueryType = {
	id?: String
	name?: String
	email?: String
}

export type RecipeQueryType = {
	id?: String
	name?: String
	ingredients?: String
	directions?: String
	profile_id?: String
	author?: String
}

export type TokenQueryType = {
	id?: String
	refresh_token?: String
	profile_id?: String
}

export type DBQueryType = {
	text: String
	values: Array<any>
}
