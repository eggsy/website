import type { UserConfig } from "vite"

const moduleConfig = {
  experimentWarning: false,
}

// Excluding the following modules from optimizing since they don't include a CJS file and already don't get optimized in the bundle.
const viteConfig: UserConfig = {
  build: {
    commonjsOptions: {
      exclude: [
        "vue-notion",
        "nuxt-webfontloader",
        "@eggsydev/vue-lanyard",
        "@nuxtjs/color-mode",
      ],
    },
  },
}

export default {
  ...moduleConfig,
  ...viteConfig,
}
