import type { PostsCollectionItem } from "@nuxt/content"
import fm from "front-matter"
import { readdirSync, readFileSync } from "fs"
import { join } from "path"

export const getBlogPosts = (
  options: {
    withBody?: boolean
  } = {
    withBody: false,
  },
) => {
  const contentDir = join(process.cwd(), "content", "blog")

  const articles = readdirSync(contentDir)

  if (!articles.length) return []

  const posts = []

  for (const article of articles) {
    const file = readFileSync(join(contentDir, article), "utf-8")
    const { attributes, body } = fm<PostsCollectionItem>(file)

    const { title, description, createdAt, tags } = attributes

    const object = {
      slug: article.replace(/\.md$/, ""),
      title,
      description,
      createdAt,
      tags,
    } as Omit<PostsCollectionItem, "body"> & { body: string; slug: string }

    if (options.withBody) object.body = body

    posts.push(object)
  }

  return posts
}
