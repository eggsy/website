import colors from "vuetify/es5/util/colors";
import path from "path";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + "eggsy.codes",
    title: "eggsy.codes",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "theme-color",
        content: "#272727",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
    ],
  },
  env: {
    apiBase: "https://eggsy.codes/api",
  },
  /*
   ** Global CSS
   */
  css: ["./stylesheets/root.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "@/plugins/anime.js",
      mode: "client",
    },
    {
      src: "@/plugins/tippy.js",
      mode: "client",
    },
    {
      src: "@/plugins/editor.js",
      mode: "client",
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/axios", "@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["nuxt-helmet", "@nuxtjs/auth"],
  router: {
    middleware: ["auth"],
  },
  helmet: {
    frameguard: false,
    xssFilter: true,
    hsts: true,
  },
  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/callback",
      home: "/blog",
    },
    strategies: {
      local: false,
      discord: {
        _scheme: "oauth2",
        authorization_endpoint: "https://discordapp.com/api/oauth2/authorize",
        userinfo_endpoint: "https://discordapp.com/api/users/@me",
        scope: ["identify"],
        client_id: "351611743018942464",
      },
    },
  },
  loading: { color: "#fff" },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  serverMiddleware: [path.resolve(__dirname, "api/index.js")],
};
