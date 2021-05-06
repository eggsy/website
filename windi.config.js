const { resolve } = require("path")
const { defineConfig } = require("windicss/helpers")

/* Plugins */
const lineClamp = require("windicss/plugin/line-clamp")

module.exports = defineConfig({
  darkMode: "class",
  purge: {
    content: [resolve("./src/content/**/*")],
  },
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [lineClamp],
})
