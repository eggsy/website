const { screens } = require("tailwindcss/defaultTheme")
delete screens["2xl"]

module.exports = {
  darkMode: "class",
  purge: {
    content: ["./components/**/*.vue", "./content/**/*.md"],
  },
  theme: {
    extend: {
      colors: {
        social: {
          twitter: "#1DA1F2",
          telegram: "#2EAADE",
          whatsapp: "#25D366",
          discord: {
            light: "#7289DA",
            dark: "#6c82cf",
          },
        },
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    ...screens,
  },
  variants: {
    extend: {
      backgroundOpacity: ["dark"],
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
}
