import colors from "vuetify/es5/util/colors";
import axios from "axios";
import path from "path";

export default {
  mode: "universal",
  rootDir: "./",
  srcDir: "./src",
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
  buildModules: [
    "@nuxtjs/axios",
    "@nuxtjs/vuetify",
    ["@nuxtjs/google-analytics", { id: "UA-62051904-3" }],
  ],
  modules: [
    "nuxt-helmet",
    // "nuxt-oauth",
    "@nuxtjs/pwa",
    "@nuxt/content",
    "@nuxtjs/device",
    "@nuxtjs/firebase",
  ],
  firebase: {
    config: {
      apiKey: "AIzaSyChDNyClS2rEuQWsBO-enPIun9qVdr6Bdc",
      authDomain: "eggsy-19751.firebaseapp.com",
      databaseURL: "https://eggsy-19751.firebaseio.com",
      projectId: "eggsy-19751",
      storageBucket: "eggsy-19751.appspot.com",
      messagingSenderId: "306704974684",
      appId: "1:306704974684:web:7ccb8e5ea87916d5803799",
      measurementId: "G-TZS7JWWFVM",
    },
    services: {
      firestore: true,
    },
  },
  oauth: {
    sessionName: "discord",
    secretKey: "vErY-SecReT-ToKeN-nO-caN-fİnD2",
    oauthHost: "https://discord.com/api/oauth2",
    scopes: ["identify"],
    oauthClientID: "351611743018942464",
    oauthClientSecret: "O3I3pf8kiSBMKLlYEuIkoz56Q7XE5-PL",
    fetchUser: async (accessToken) => {
      try {
        const user = await axios.get(`https://discord.com/api/users/@me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return { ...user.data };
      } catch (err) {
        return {
          error: true,
        };
      }
    },
  },
  content: {
    liveEdit: false,
    markdown: {
      remarkPlugins: ["remark-emoji", "remark-attr"],
    },
  },
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
  serverMiddleware: [path.resolve(__dirname, "src/api/index.js")],
};
