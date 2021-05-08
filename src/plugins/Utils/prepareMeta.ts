export interface PrepareMetaProps {
  title?: string
  description?: string
  url?: string
  image?: string
  keywords?: string | string[]
}

export interface Meta {
  hid?: string
  name: string
  property?: string
  content: string
}

/**
 * Simple meta tag provider that accepts some parameters and returns a whole meta.
 * @param {{
 *  title: string;
 *  description: string;
 *  url: string;
 *  image: string;
 *  keywords: string;
 * }} options
 * @param {array} rest Other meta tags that you want to get applied.
 * @returns {object} Meta object that includes open-graph and Twitter meta information.
 */
export default function prepareMeta(
  { title, description, url, image, keywords }: PrepareMetaProps,
  rest?: any[]
): Meta[] {
  const meta: Meta[] = []

  if (title)
    meta.push(
      {
        name: "og:title",
        content: title,
      },
      {
        name: "twitter:title",
        content: title,
      }
    )

  if (description)
    meta.push(
      {
        name: "description",
        content: description,
      },
      {
        name: "og:description",
        content: description,
      },
      {
        name: "twitter:description",
        content: description,
      }
    )

  if (url)
    meta.push({
      name: "og:url",
      content: url,
    })

  if (image)
    meta.push(
      {
        name: "og:image",
        content: image,
      },
      {
        name: "twitter:image",
        content: image,
      }
    )

  const defaultKeywords = [
    "technology",
    "turkish",
    "developer",
    "portfolio",
    "vue",
    "nuxt",
    "tailwindcss",
  ]

  if (keywords)
    meta.push({
      name: "keywords",
      content: `${
        typeof keywords === "object" ? keywords.join(",") : keywords
      }, ${defaultKeywords.join(", ")}`,
    })
  else
    meta.push({
      name: "keywords",
      content: defaultKeywords.join(", "),
    })

  if (typeof rest === "object")
    rest.forEach((item) => {
      const { name, content, ...rest } = item
      meta.push({ name, content, ...rest })
    })

  if (meta.length === 0) return []
  else
    return meta.map((item) => {
      if (item.name && !item.property) item.property = item.name
      if ((item.name || item.property) && !item.hid)
        item.hid = item.name || item.property

      return item
    })
}
