// Import base config
import buildModules from "./config/buildModules"
import components from "./config/components"
import css from "./config/css"
import head from "./config/head"
import loading from "./config/loading"
import modules from "./config/modules"
import plugins from "./config/plugins"
import publicRuntimeConfig from "./config/publicRuntimeConfig"

// Import module specific configs
import colorMode from "./config/modules/colorMode"
import content from "./config/modules/content"
import dotenv from "./config/modules/dotenv"
import firebase from "./config/modules/firebase"
import pwa from "./config/modules/pwa"
import sitemap from "./config/modules/sitemap"
import tailwindcss from "./config/modules/tailwindcss"

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
  colorMode,
  content,
  dotenv,
  firebase,
  publicRuntimeConfig,
  pwa,
  sitemap,
  tailwindcss,
}
