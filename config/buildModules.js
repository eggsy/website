import dotenv from "./modules/dotenv"
import colorMode from "./modules/colorMode"
import googleAnalytics from "./modules/googleAnalytics"

export default [
  "@nuxtjs/svg",
  "@nuxt/image",
  "nuxt-windicss",
  "@nuxtjs/moment",
  ["@nuxtjs/dotenv", dotenv],
  ["@nuxtjs/color-mode", colorMode],
  ["@nuxtjs/google-analytics", googleAnalytics],
]
