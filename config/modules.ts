import { NuxtOptionsModule } from "@nuxt/types/config/module"

/* Import module options */
import content from "./modules/content"
import feed from "./modules/feed"
import pwa from "./modules/pwa"
import sitemap from "./modules/sitemap"
import webfontloader from "./modules/webfontloader"

const Modules: NuxtOptionsModule[] = [
  "@nuxtjs/axios",
  "@nuxtjs/robots",
  ["@nuxtjs/pwa", pwa],
  ["@nuxt/content", content],
  ["@nuxtjs/feed", feed],
  ["@nuxtjs/sitemap", sitemap],
  ["nuxt-webfontloader", webfontloader],
]

export default Modules
