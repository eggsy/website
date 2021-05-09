import { NuxtOptionsPlugin } from "@nuxt/types/config/plugin"

const Plugins: NuxtOptionsPlugin[] = [
  "@/plugins/Util",
  "@/plugins/Disqus",
  {
    src: "@/plugins/Lanyard",
    mode: "client",
  },
  {
    src: "@/plugins/Firebase",
    mode: "client",
  },
  {
    src: "@/plugins/Tippy",
    mode: "client",
  },
]

export default Plugins
