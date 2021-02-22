import content from "./modules/content"
import firebase from "./modules/firebase"
import pwa from "./modules/pwa"
import sitemap from "./modules/sitemap"
import webfontloader from "./modules/webfontloader"

export default [
  "@nuxtjs/axios",
  "@nuxtjs/robots",
  ["@nuxtjs/pwa", pwa],
  ["@nuxt/content", content],
  ["@nuxtjs/sitemap", sitemap],
  ["@nuxtjs/firebase", firebase],
  ["nuxt-webfontloader", webfontloader],
]
