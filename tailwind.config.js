module.exports = {
  // darkMode: "media",
  purge: {
    content: ["./components/**/*.vue"],
  },
  theme: {
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
}
