import { defineNuxtConfig } from "nuxt/config"

// Base config
import head from "./config/head"

// Hooks
import { generateDone } from "./hooks/generate/done"

export default defineNuxtConfig({
  app: {
    head,
    pageTransition: { name: "fade", mode: "out-in" },
  },

  css: ["~/assets/css/main.scss"],

  modules: [
    "@vite-pwa/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@nuxt/content",
    [
      "@nuxtjs/sitemap",
      {
        disableNuxtContentIntegration: true,
      },
    ],
    [
      "@nuxtjs/robots",
      {
        disableNuxtContentIntegration: true,
      },
    ],
    [
      "@nuxtjs/google-fonts",
      {
        display: "swap",
        families: {
          Inter: [400, 500, 600, 700],
        },
      },
    ],
    [
      "@nuxtjs/tailwindcss",
      {
        viewer: false,
        config: "~/tailwind.config.ts",
      },
    ],
    [
      "nuxt-disqus",
      {
        shortname: "eggsy-xyz",
      },
    ],
    [
      "nuxt-gtag",
      {
        enabled: process.env.NODE_ENV === "production",
        id: process.env.GOOGLE_ANALYTICS_ID,
      },
    ],
  ],

  content: {
    build: {
      markdown: {
        highlight: {
          themes: ["vitesse-dark", "vitesse-light"],
          theme: {
            default: "vitesse-dark",
            light: "vitesse-light",
            dark: "vitesse-dark",
          },
        },
        toc: {
          depth: 5,
        },
        rehypePlugins: {
          "rehype-external-links": {
            target: "_blank",
            rel: "noreferrer noopener",
          },
          "rehype-autolink-headings": {
            behavior: "append",
          },
        },
      },
    },
  },

  site: {
    url: "https://eggsy.xyz",
    name: "eggsy.xyz",
  },

  pwa: {
    manifest: {
      name: "eggsy.xyz",
      short_name: "eggsy.xyz",
      theme_color: "#f56565",
      lang: "en",
    },
  },

  runtimeConfig: {
    public: {
      social: {
        twitter: "https://twitter.com/eggsydev/",
        github: "https://github.com/eggsy/",
        linkedIn: "https://linkedin.com/in/abdulbaki-dursun",
        email: "eggsydev@gmail.com",
      },
      sponsor: {
        github: "https://github.com/sponsors/eggsy",
      },
      isDev: process.env.NODE_ENV === "development",
    },
  },

  hooks: {
    "build:done": async () => {
      if (process.env.NODE_ENV === "production") await generateDone()
    },
  },

  compatibilityDate: "2025-01-16",
})
