/* Interfaces */
export interface SponsorLinks {
  github: string
  patreon: string
}

export interface Social {
  discord: string
  twitter: string
  github: string
  instagram: string
  trello: string
  email: string
}

export interface IsInsideMe {
  website: string
  faq: string
}

export interface UnblockPlease {
  webstore: string
  github: string
}

export interface Links {
  unblockPlease: UnblockPlease
  isInsideMe: IsInsideMe
}
declare module "@nuxt/types/config/runtime" {
  interface NuxtRuntimeConfig {
    social: Social
    sponsor: SponsorLinks
    links: Links
  }
}
