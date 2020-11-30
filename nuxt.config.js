import { resolve } from "path"

export default {
  rootDir: "./",
  srcDir: "src",
  target: "static",
  ssr: false,
  head: {
    title: "eggsy.xyz",
    titleTemplate: "%s - eggsy.xyz",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
      },
    ],
  },
  components: [
    "~/components",
    {
      path: "~/components/Card/",
      prefix: "Card",
    },
  ],
  css: ["@/stylesheets/root"],
  buildModules: ["@nuxtjs/eslint-module", "@nuxtjs/tailwindcss"],
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxt/content"],
  plugins: [
    /*
      Not yet needed
      {
        src: "@/plugins/Anime",
        mode: "client",
      },
    */
    {
      src: "@/plugins/Ripple",
      mode: "client",
    },
  ],
  tailwindcss: {
    configPath: resolve("./tailwind.config.js"),
  },
  pwa: {
    manifest: {
      name: "eggsy.xyz",
      short_name: "eggsy.xyz",
      theme_color: "#f56565",
      lang: "en",
    },
  },
}
