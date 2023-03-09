import { resolve } from "path"
import { ModuleOptions } from "nuxt-windicss/dist/types"

const windicss: ModuleOptions = {
  config: resolve("windi.config.ts"),
}

export default windicss
