import consola from "consola"
import { existsSync, mkdirSync, writeFileSync } from "fs"
import { join } from "path"

// Scripts
import getReadingTime from "../plugins/Utils/getReadingTime"
import { generateImage } from "./scripts/generateSatoriImage"
import { getBlogPosts } from "./scripts/getBlogPosts"

// Turkish INTL
const formatter = new Intl.DateTimeFormat("tr-TR", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
})

export const generateOgImages = async () => {
  const folderPath = join(process.cwd(), "public", "og-images")

  const posts = getBlogPosts({
    withBody: true,
  })

  consola.info(`Generating OG images for ${posts.length} posts.`)

  if (!existsSync(folderPath))
    mkdirSync(folderPath, {
      recursive: true,
    })

  for (const post of posts) {
    const readingTime = getReadingTime(JSON.stringify(post.body))
    const postDate = formatter
      .format(new Date(post.createdAt))
      .split(".")
      .join("/")

    const metaImage = await generateImage({
      title: post.title,
      description: post.description,
      subtitles: [postDate, `${readingTime} dakika okuma`, `#${post.tags[0]}`],
    })

    writeFileSync(join(folderPath, `./${post.slug}.png`), metaImage)
  }

  consola.success(`Generated ${posts.length} OG images.`)
}
