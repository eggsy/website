import { defineConfig } from "windicss/helpers"
import defaultTheme from "windicss/defaultTheme"

/* Plugins */
import lineClamp from "windicss/plugin/line-clamp"

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [lineClamp],
})
