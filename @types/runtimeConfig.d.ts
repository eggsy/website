/* Interfaces */
export interface SponsorLinks {
  github: string
}

export interface Social {
  discord: string
  twitter: string
  github: string
  instagram: string
  trello: string
  email: string
}

declare module "@nuxt/types/config/runtime" {
  interface NuxtRuntimeConfig {
    social: Social
    sponsor: SponsorLinks
  }
}
