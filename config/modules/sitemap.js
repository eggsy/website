const { $content } = require("@nuxt/content")

export default async function () {
  const posts = await $content().fetch()

  const routes = []
  for (const post of posts) {
    routes.push(`blog/gonderi/${post.slug}`)
  }

  return {
    hostname: "https://eggsy.xyz",
    gzip: true,
    routes,
  }
}
