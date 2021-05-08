export default {
  social: {
    discord: "https://discord.gg/tHx9ZKG",
    twitter: "https://twitter.com/eggsydev/",
    github: "https://github.com/eggsy/",
    instagram: "https://instagram.com/eggsy_dev/",
    trello: "https://trello.com/b/XtWZFFiH/",
  },
  sponsor: {
    patreon: "https://www.patreon.com/eggsy/",
  },
  links: {
    unblockPlease: {
      webstore:
        "https://chrome.google.com/webstore/detail/unblock-please/lpngbkmgnehdkkobdbieckjpphkohffd/",
      github: "https://github.com/eggsy/unblock-please/",
    },
    isInsideMe: {
      website: "https://is-inside.me/",
      faq: "https://is-inside.me/faq/",
    },
  },
}

/*
  I don't know if there's a better way for this
  Couldn't get Nuxt to recognize these variables via $config
*/
export interface Constants {
  social: Social
  sponsor: Sponsor
  links: Links
}

export interface Sponsor {
  patreon: string
}

export interface Social {
  discord: string
  twitter: string
  github: string
  instagram: string
  trello: string
}

export interface Links {
  unblockPlease: UnblockPlease
  isInsideMe: IsInsideMe
}

export interface IsInsideMe {
  website: string
  faq: string
}

export interface UnblockPlease {
  webstore: string
  github: string
}
