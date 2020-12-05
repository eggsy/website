export default {
  middleware: ["redirect"],
  extendRoutes(routes, resolve) {
    routes.push({
      name: "discord",
      path: "/discord/",
      component: resolve("@/pages/index.vue"),
    })
  },
}
