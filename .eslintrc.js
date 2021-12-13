module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    sourceType: "module",
    requireConfigFile: false,
    babelOptions: {
      presets: ["@nuxt/babel-preset-app"],
    },
  },
  extends: [
    "@nuxtjs",
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["vue"],
  rules: {
    semi: [2, "never"],
    quotes: [2, "double", "avoid-escape"],
    "vue/multi-word-component-names": "off",
    "comma-dangle": "off",
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/html-indent": "off",
    "vue/singleline-html-element-content-newline": "off",
    "prettier/prettier": ["error", { semi: false }],
  },
}
