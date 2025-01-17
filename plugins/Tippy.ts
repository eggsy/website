import { plugin as VueTippy } from "vue-tippy"

import "tippy.js/dist/tippy.css"
import "~/assets/css/modules/tippy.scss"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    defaultProps: {
      theme: "discord",
      animation: "discord-anim",
    },
  })
})
