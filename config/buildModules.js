// Import module specific configs
import dotenv from "./modules/dotenv"
import colorMode from "./modules/colorMode"
import tailwindcss from "./modules/tailwindcss"

export default [
  "@nuxtjs/svg",
  "@nuxtjs/moment",
  "@nuxtjs/eslint-module",
  ["@nuxtjs/dotenv", dotenv],
  ["@nuxtjs/color-mode", colorMode],
  ["@nuxtjs/tailwindcss", tailwindcss],
]
