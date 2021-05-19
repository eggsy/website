import { NuxtOptionsModule } from "@nuxt/types/config/module"

/* Import module options */
import colorMode from "./modules/colorMode"
import googleAnalytics from "./modules/googleAnalytics"
import typescriptBuild from "./modules/typescriptBuild"

const BuildModules: NuxtOptionsModule[] = [
  "nuxt-vite",
  "@nuxt/image",
  "nuxt-windicss",
  "@nuxtjs/moment",
  ["@nuxtjs/color-mode", colorMode],
  ["@nuxt/typescript-build", typescriptBuild],
  ["@nuxtjs/google-analytics", googleAnalytics],
]

export default BuildModules
