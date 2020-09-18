import colors from "vuetify/es5/util/colors";
import { resolve } from "path";

export default {
  rootDir: "./",
  srcDir: "./src",
  head: {
    titleTemplate: "%s - eggsy.xyz",
    title: "eggsy.xyz",
    meta: [
      {
        charset: "utf-8",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary",
      },
      {
        hid: "twitter:site",
        name: "twitter:site",
        content: "@eggsydev",
      },
      {
        hid: "twitter:creator",
        name: "twitter:creator",
        content: "@eggsydev",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "eggsy.xyz",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: process.env.npm_package_description,
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
        content: process.env.npm_package_description,
      },
      {
        hid: "og:description",
        name: "og:description",
        content: process.env.npm_package_description,
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  css: ["./stylesheets/root.scss"],
  plugins: [
    "@/plugins/util.js",
    {
      src: "@/plugins/highlight.js",
      mode: "client",
    },
    {
      src: "@/plugins/player.js",
      mode: "client",
    },
    {
      src: "@/plugins/tippy.js",
      mode: "client",
    },
  ],
  modules: [
    "@nuxtjs/pwa",
    "@nuxt/content",
    "@nuxtjs/device",
    "@nuxtjs/sitemap",
    "@nuxtjs/firebase",
  ],
  buildModules: [
    "@nuxtjs/axios",
    "@nuxtjs/vuetify",
    ["@nuxtjs/dotenv", { path: resolve("./") }],
    ["@nuxtjs/google-analytics", { id: "UA-62051904-3" }],
  ],
  pwa: {
    background_color: "#212121",
    theme_color: "#212121",
  },
  firebase: {
    config: {
      appId: process.env.FIREBASE_APP_ID,
      apiKey: process.env.FIREBASE_API_KEY,
      databaseURL: process.env.FIREBASE_DB_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGE_SENDER_ID,
    },
    services: {
      firestore: true,
    },
  },
  content: {
    liveEdit: false,
    markdown: {
      remarkPlugins: ["remark-emoji", "remark-attr"],
    },
  },
  vuetify: {
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
  router: {
    middleware: ["redirection"],
  },
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
  components: true,
  loading: { color: "#fff" },
  serverMiddleware: [resolve(__dirname, "src/api/index.js")],
};
