import { existsSync, writeFileSync, mkdirSync } from "fs"
import consola from "consola"
import { join } from "path"

// Scripts
import { generateImage } from "../../scripts/generateOgImage"

// Functions
import getReadingTime from "../../src/plugins/Utils/getReadingTime"

// Turkish INTL
const formatter = new Intl.DateTimeFormat("tr-TR", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
})

export const generateDone = async (generator: any) => {
  const generateDir = generator.nuxt.options.generate.dir
  const folderPath = join(generateDir, "./og-images/")

  const { $content } = require("@nuxt/content")
  const articles = await $content("blog").fetch()

  if (!articles.length) return

  consola.info(`Generating OG images for ${articles.length} posts.`)

  for (const article of articles) {
    const { title, description, slug, body, createdAt, tags } = article

    const readingTime = getReadingTime(JSON.stringify(body))
    const postDate = formatter.format(new Date(createdAt)).split(".").join("/")

    const metaImage = await generateImage({
      title,
      description,
      subtitles: [postDate, `${readingTime} dakika okuma`, `#${tags[0]}`],
    })

    if (!existsSync(folderPath)) mkdirSync(folderPath)

    writeFileSync(join(folderPath, `./${slug}.png`), metaImage)
  }

  consola.success(`Generated ${articles.length} OG images.`)
}
