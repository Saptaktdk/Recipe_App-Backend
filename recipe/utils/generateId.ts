import {v1 as uuidv1, v4 as uuidv4} from 'uuid'

const generateRandomId = () => {
    return uuidv1()
}

export {generateRandomId}

