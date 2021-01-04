// Import base config
import buildModules from "./config/buildModules"
import components from "./config/components"
import css from "./config/css"
import head from "./config/head"
import loading from "./config/loading"
import modules from "./config/modules"
import plugins from "./config/plugins"
import publicRuntimeConfig from "./config/publicRuntimeConfig"

// Set options as variables
const rootDir = "./"
const srcDir = "src"
const target = "static"
const ssr = true
const server = {
  host: "0.0.0.0",
  port: "3000",
}

// Export all collected data
export default {
  server,
  rootDir,
  srcDir,
  target,
  ssr,
  head,
  loading,
  buildModules,
  components,
  css,
  modules,
  plugins,
  publicRuntimeConfig,
}
