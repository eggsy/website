import { defineNuxtConfig } from "nuxt/config"

// Base config
import head from "./config/head"

// Hooks
import { generateOgImages } from "./hooks/generateOgImages"
import { getBlogPosts } from "./hooks/scripts/getBlogPosts"

export default defineNuxtConfig({
  nitro: {
    preset: "netlify",
  },

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
    "@nuxtjs/sitemap",
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

  sitemap: {
    exclude: ["/api/content/posts/database.sql"],
    urls: getBlogPosts().map((post) => `https://eggsy.xyz/blog/${post.slug}`),
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
      description:
        "Professional JavaScript developer from Turkey specializing in React.js, Vue.js, TypeScript, Node.js, and Flutter. Passionate about crafting innovative software solutions and continuously improving programming skills.",
      lang: "en",
      icons: [
        {
          src: "/icon.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
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
    "nitro:build:before": async () => {
      if (process.env.NODE_ENV === "production") await generateOgImages()
    },
  },

  compatibilityDate: "2025-01-16",
})
