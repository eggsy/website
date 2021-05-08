// @ts-nocheck
import Vue from "vue"
import VueTippy, { TippyComponent } from "vue-tippy/dist/vue-tippy.esm"

Vue.component("Tippy", TippyComponent)

Vue.use(VueTippy, {
  animation: "discord-anim",
  duration: [100, 100],
  hideOnClick: false,
  directive: "tippy",
  theme: "discord",
  inertia: true,
  arrow: true,
})
