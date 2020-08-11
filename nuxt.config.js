import colors from "vuetify/es5/util/colors";
import path from "path";

export default {
  mode: "universal",
  head: {
    titleTemplate: "%s - " + "eggsy.xyz",
    title: "eggsy.xyz",
    meta: [
      {
        charset: "utf-8",
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "eggsy.xyz",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "theme-color",
        name: "theme-color",
        content: "#212121",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
      {
        hid: "og:description",
        name: "og:description",
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
    apiBase: "https://eggsy.xyz/api",
  },
  css: ["./stylesheets/root.scss"],
  plugins: [
    "@/plugins/util.js",
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

  buildModules: ["@nuxtjs/axios", "@nuxtjs/vuetify"],
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
  vuetify: {
    breakpoint: {
      xs: 600,
      thresholds: {
        xs: 340,
      },
    },
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

  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },

    extend(config, ctx) {},
  },
  serverMiddleware: [path.resolve(__dirname, "api/index.js")],
};
