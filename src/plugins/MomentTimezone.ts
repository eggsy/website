import moment from "moment-timezone"
import type { Plugin } from "@nuxt/types"

const MomentTimezone: Plugin = (_, inject) => {
  inject("moment_tz", moment)
}

export default MomentTimezone
