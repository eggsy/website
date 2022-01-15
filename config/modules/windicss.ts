import { resolve } from "path"
import { NuxtWindiOptions } from "nuxt-windicss/dist/"

const windicss: NuxtWindiOptions = {
  config: resolve("windi.config.ts"),
}

export default windicss
