import dotenv from "./modules/dotenv"
import colorMode from "./modules/colorMode"
import nuxtStorm from "./modules/nuxtStorm"
import tailwindcss from "./modules/tailwindcss"
import googleAnalytics from "./modules/googleAnalytics"

export default [
  "@nuxtjs/svg",
  "@nuxt/image",
  "@nuxtjs/moment",
  ["nuxt-storm", nuxtStorm],
  ["@nuxtjs/dotenv", dotenv],
  ["@nuxtjs/color-mode", colorMode],
  ["@nuxtjs/tailwindcss", tailwindcss],
  ["@nuxtjs/google-analytics", googleAnalytics],
]
