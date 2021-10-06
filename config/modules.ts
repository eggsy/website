import { NuxtOptionsModule } from "@nuxt/types/config/module"

/* Import module options */
import content from "./modules/content"
import firebase from "./modules/firebase"
import pwa from "./modules/pwa"
import sitemap from "./modules/sitemap"
import webfontloader from "./modules/webfontloader"

const Modules: NuxtOptionsModule[] = [
  "@nuxtjs/axios",
  "@nuxtjs/robots",
  ["@nuxtjs/pwa", pwa],
  ["@nuxt/content", content],
  "@nuxtjs/feed",
  ["@nuxtjs/sitemap", sitemap],
  ["@nuxtjs/firebase", firebase],
  ["nuxt-webfontloader", webfontloader],
]

export default Modules
