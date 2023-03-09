/* Import constants */
import constants from "./constants"

export default {
  ...constants,
  isDev: process.env.NODE_ENV === "development",
}
