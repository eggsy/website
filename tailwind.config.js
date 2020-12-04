module.exports = {
  // darkMode: "media",
  purge: {
    content: ["./components/**/*.vue", "./content/**/*.md"],
  },
  theme: {
    extend: {
      colors: {
        social: {
          twitter: "#1DA1F2",
          discord: "#7289DA",
          telegram: "#2EAADE",
          whatsapp: "#25D366",
        },
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
