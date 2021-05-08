// Import base config
import build from "./config/build"
import buildModules from "./config/buildModules"
import components from "./config/components"
import generate from "./config/generate"
import css from "./config/css"
import head from "./config/head"
import loading from "./config/loading"
import modules from "./config/modules"
import plugins from "./config/plugins"
import publicRuntimeConfig from "./config/publicRuntimeConfig"

/* Types */
import { NuxtConfig } from "@nuxt/types"

/* Set options as variables */
const options: {
  rootDir: string
  srcDir: string
  target: "static" | "server"
  ssr: boolean
} = {
  rootDir: "./",
  srcDir: "src",
  target: "static",
  ssr: true,
}

/* Actual config object */
const Config: NuxtConfig = {
  ...options,
  build,
  head,
  loading,
  buildModules,
  components,
  generate,
  css,
  modules,
  plugins,
  publicRuntimeConfig,
}

export default Config
