import Vue from "vue";
import VueTippy, { TippyComponent } from "vue-tippy";

Vue.component("tippy", TippyComponent);
Vue.use(VueTippy, {
  directive: "tippy",
  theme: "discord",
  arrow: true,
  inertia: true,
  animation: "discord-anim",
  duration: [100, 100],
  hideOnClick: false,
});
