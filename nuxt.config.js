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
const options = {
  rootDir: "./",
  srcDir: "src",
  target: "static",
  ssr: true,
  server: {
    host: "0.0.0.0",
    port: "3000",
  },
}

// Export all collected data
export default {
  ...options,
  head,
  loading,
  buildModules,
  components,
  css,
  modules,
  plugins,
  publicRuntimeConfig,
}
