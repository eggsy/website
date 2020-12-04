// Import base config
import buildModules from "./config/buildModules"
import components from "./config/components"
import css from "./config/css"
import head from "./config/head"
import loader from "./config/loader"
import modules from "./config/modules"
import plugins from "./config/plugins"

// Import module specific configs
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
  loader,
  buildModules,
  components,
  css,
  modules,
  plugins,
  content,
  dotenv,
  firebase,
  pwa,
  sitemap,
  tailwindcss,
}
