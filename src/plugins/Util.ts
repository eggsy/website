import type { Plugin } from "@nuxt/types"

/* Import plugins */
import getReadableDate from "./Utils/getReadableDate"
import getReadingTime from "./Utils/getReadingTime"
import prepareMeta from "./Utils/prepareMeta"

/* Export and inject plugin */
const Util: Plugin = (_, inject) => {
  inject("getReadableDate", getReadableDate)
  inject("getReadingTime", getReadingTime)
  inject("prepareMeta", prepareMeta)
}

export default Util
