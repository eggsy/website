import { join } from "path"
import { mkdirSync, existsSync, writeFileSync } from "fs"
import consola from "consola"

// Types
import type { NuxtConfig } from "@nuxt/types"

// Functions
import { generateImage } from "./scripts/generateOgImage"

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
        const generateDir = generator.nuxt.options.generate.dir
        const folderPath = join(generateDir, "./og-images/")

        const { $content } = require("@nuxt/content")
        const articles = await $content("blog").fetch()

        if (!articles.length) return

        consola.info(`Generationg OG images for ${articles.length} posts.`)

        for (const article of articles) {
          const { title, description, slug } = article
          const image = await generateImage({ title, description })

          if (!existsSync(folderPath)) mkdirSync(folderPath)

          writeFileSync(join(folderPath, `./${slug}.png`), image)
        }
      },
    },
  },

  // Modules
  vite,
  feed,
}

export default Config
