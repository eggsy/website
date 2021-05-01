const { resolve } = require("path")

module.exports = {
  darkMode: "class",
  purge: {
    content: [resolve("./src/content/**/*")],
  },
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
