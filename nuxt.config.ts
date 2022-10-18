// Types
import type { NuxtConfig } from "@nuxt/types"

// Base config
import buildModules from "./config/buildModules"
import components from "./config/components"
import generate from "./config/generate"
import css from "./config/css"
import head from "./config/head"
import loading from "./config/loading"
import modules from "./config/modules"
import plugins from "./config/plugins"
import publicRuntimeConfig from "./config/publicRuntimeConfig"

// Specific module options
import vite from "./config/modules/vite"
import feed from "./config/modules/feed"

// Hooks
import { generateDone } from "./hooks/generate/done"

// Constants
const isDev = process.env.NODE_ENV === "development"

const Config: NuxtConfig = {
  // Constant options
  rootDir: "./",
  srcDir: "src",
  target: "static",

  /*
    Disabling server-side rendering on development mode because
    Vite module currently doesn't work when SSR is enabled. This
    might cause some issues and/or hydration errors but will be
    effective enough to help you develop easier.
  */
  ssr: !isDev,

  // Imported options
  head,
  loading,
  buildModules,
  components,
  generate,
  css,
  modules,
  plugins,
  publicRuntimeConfig,

  hooks: {
    generate: {
      async done(generator) {
        await generateDone(generator)
      },
    },
  },

  // Modules
  vite,
  feed,
}

export default Config
