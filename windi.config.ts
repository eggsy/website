import { defineConfig } from "windicss/helpers"
import defaultTheme from "windicss/defaultTheme"

/* Plugins */
import lineClamp from "windicss/plugin/line-clamp"

export default defineConfig({
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [lineClamp],
})
