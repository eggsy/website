import dotenv from "./modules/dotenv"
import colorMode from "./modules/colorMode"
import tailwindcss from "./modules/tailwindcss"

export default [
  /*
    Will keep this here until it get's updated an is ready to be used in production
    IT'S FAST!
  "nuxt-vite", */
  "@nuxtjs/svg",
  "@nuxtjs/moment",
  ["@nuxtjs/dotenv", dotenv],
  ["@nuxtjs/color-mode", colorMode],
  ["@nuxtjs/tailwindcss", tailwindcss],
]
