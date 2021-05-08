import { NuxtOptionsBuild } from "@nuxt/types/config/build"

const Build: NuxtOptionsBuild = {
  babel: {
    plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]],
  },
}

export default Build
