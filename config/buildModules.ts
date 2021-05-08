import { NuxtOptionsModule } from "@nuxt/types/config/module"

/* Import module options */
import dotenv from "./modules/dotenv"
import colorMode from "./modules/colorMode"
import googleAnalytics from "./modules/googleAnalytics"

const BuildModules: NuxtOptionsModule[] = [
  "@nuxtjs/svg",
  "@nuxt/image",
  "nuxt-windicss",
  "@nuxtjs/moment",
  "@nuxt/typescript-build",
  ["@nuxtjs/dotenv", dotenv],
  ["@nuxtjs/color-mode", colorMode],
  ["@nuxtjs/google-analytics", googleAnalytics],
]

export default BuildModules
