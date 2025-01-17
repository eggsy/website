import type { PostsCollectionItem } from "@nuxt/content"
import consola from "consola"
import fm from "front-matter"
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "fs"
import { join } from "path"
import { useNuxt } from "@nuxt/kit"

// Scripts
import getReadingTime from "../../plugins/Utils/getReadingTime"
import { generateImage } from "../../scripts/generateOgImage"

// Functions

// Turkish INTL
const formatter = new Intl.DateTimeFormat("tr-TR", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
})

export const generateDone = async () => {
  const nuxt = useNuxt()

  const generateDir = nuxt.options.dir.public
  const contentDir = nuxt.options.rootDir

  const folderPath = join(generateDir, "og-images")
  const contentPath = join(contentDir, "content", "blog")

  const articles = readdirSync(contentPath)

  if (!articles.length) return

  consola.info(`Generating OG images for ${articles.length} posts.`)

  for (const article of articles) {
    const file = readFileSync(join(contentPath, article), "utf-8")
    const { attributes, body } = fm<PostsCollectionItem>(file)

    const { title, description, createdAt, tags } = attributes

    const readingTime = getReadingTime(JSON.stringify(body))
    const postDate = formatter.format(new Date(createdAt)).split(".").join("/")

    const metaImage = await generateImage({
      title,
      description,
      subtitles: [postDate, `${readingTime} dakika okuma`, `#${tags[0]}`],
    })

    if (!existsSync(folderPath)) mkdirSync(folderPath)

    writeFileSync(join(folderPath, `./${article}.png`), metaImage)
  }

  consola.success(`Generated ${articles.length} OG images.`)
}
