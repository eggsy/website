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
      screens: {
        "2xl": false,
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ["dark"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
