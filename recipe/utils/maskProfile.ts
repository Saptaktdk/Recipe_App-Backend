import { ProfileMiddlewareType } from "../types/middleware"

const maskedProfileEntity = (profileEntity: any) => {
	const modifiedProfileEntity: ProfileMiddlewareType = {
		id: profileEntity.id,
		name: profileEntity.name,
		email: profileEntity.email
	}
	return modifiedProfileEntity
}

const maskedProfileEntityList = (profileEntityList: any) => {
	//? Handle empty list
	if (profileEntityList.length === 0) return []

	let modifiedEntityList: any = []
	for (let i = 0; i < profileEntityList.length; i++) {
		const modifiedProfileEntity: ProfileMiddlewareType = {
			id: profileEntityList[i].id,
			name: profileEntityList[i].name,
			email: profileEntityList[i].email
		}
		modifiedEntityList.push(modifiedProfileEntity)
	}
	return modifiedEntityList
}

export { maskedProfileEntity, maskedProfileEntityList }
