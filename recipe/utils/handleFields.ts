class RequestBodyHandler {
	//TODO: Handle Mandatory Fields
	static isValidMandatoryFields(
		field: Object,
		mandatoryFieldList: Array<string>
	) {
		for (let i = 0; i < mandatoryFieldList.length; i++) {
			const mandatoryFieldName: string = mandatoryFieldList[i]
			if (
				!field.hasOwnProperty(mandatoryFieldName) ||
				typeof field[mandatoryFieldName] !== "string" ||
				field[mandatoryFieldName] === undefined ||
				field[mandatoryFieldName]?.length === 0
			)
				return false
		}
		return true
	}

	//TODO: Handle Optional Fields
	static isValidOptionalFields(
		field: Object,
		optionalFieldList: Array<string>
	) {
		const inputfieldList: Array<string> = Object.keys(field)

		//? Else loop over the keys and check if the key is found in the optional key list
		for (let i = 0; i < inputfieldList.length; i++) {
			const inputFieldName: string = inputfieldList[i]

			//? Check the validity of the input fields
			if (
				!optionalFieldList.includes(inputFieldName) ||
				typeof field[inputFieldName] !== "string" ||
				field[inputFieldName] === undefined ||
				field[inputFieldName]?.length === 0
			)
				return false
		}
		return true
	}
}

export { RequestBodyHandler }
