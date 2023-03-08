import * as redis from "redis"
import { RECIPE_REDIS_CONNECTION_URL } from "../utils/constants"

const redisClient = redis.createClient({ url: RECIPE_REDIS_CONNECTION_URL })
export { redisClient }