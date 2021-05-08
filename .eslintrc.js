module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "@nuxtjs",
    "plugin:nuxt/recommended",
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "@nuxtjs/eslint-config-typescript",
  ],
  plugins: ["vue"],
  rules: {
    semi: [2, "never"],
    quotes: [2, "double", "avoid-escape"],
    "comma-dangle": false,
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/html-indent": "off",
    "vue/singleline-html-element-content-newline": "off",
    "prettier/prettier": ["error", { semi: false }],
  },
}
