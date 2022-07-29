import { NuxtOptionsModule } from "@nuxt/types/config/module"

// Import module options
import colorMode from "./modules/colorMode"
import windicss from "./modules/windicss"
import image from "./modules/image"
import googleAnalytics from "./modules/googleAnalytics"
import typescriptBuild from "./modules/typescriptBuild"

// Dev mode
const isDev = process.env.NODE_ENV === "development"

const BuildModules: NuxtOptionsModule[] = [
  "@nuxtjs/moment",
  ["@nuxt/image", image],
  ["nuxt-windicss", windicss],
  ["@nuxtjs/color-mode", colorMode],
  ["@nuxt/typescript-build", typescriptBuild],
  ["@nuxtjs/google-analytics", googleAnalytics],
]

if (isDev) BuildModules.unshift("nuxt-vite")

export default BuildModules
