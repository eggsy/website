import { NuxtOptionsModule } from "@nuxt/types/config/module"

/* Import module options */
import dotenv from "./modules/dotenv"
import colorMode from "./modules/colorMode"
import googleAnalytics from "./modules/googleAnalytics"
import typescriptBuild from "./modules/typescriptBuild"

const BuildModules: NuxtOptionsModule[] = [
  "@nuxtjs/svg",
  "@nuxt/image",
  "nuxt-windicss",
  "@nuxtjs/moment",
  ["@nuxtjs/dotenv", dotenv],
  ["@nuxtjs/color-mode", colorMode],
  ["@nuxt/typescript-build", typescriptBuild],
  ["@nuxtjs/google-analytics", googleAnalytics],
]

export default BuildModules
