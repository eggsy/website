export default ({ $moment }, inject) => {
  /**
   * Returns the date as a readable string.
   * @param {Date} date The target date to compare.
   * @returns {string} Today, yesterday, x day before, x months before or DD/MM/YYYY.
   */
  function getReadableDate(date) {
    const now = $moment()
    const createdAt = $moment(date)
    const diff = now.diff(createdAt, "days")

    if (diff === 0) return "Bugün"
    else if (diff === 1) return "Dün"
    else if (diff <= 30) return `${diff} gün önce`
    else if (diff >= 30 && diff <= 90) return `${Math.floor(diff / 30)} ay önce`
    else return createdAt.format("DD/MM/YYYY")
  }

  /**
   * Calculates the words and returns the potential maximum reading time.
   * @param {Date} words Words to calculate.
   * @param {Number} [wpm=200] Words per minute, defaults to 200.
   * @returns {number|string} Reading time in minutes.
   */
  function getReadingTime(words, wpm = 200) {
    const splitted = words?.split(" ").length || 0
    return Math.ceil(splitted / wpm).toFixed()
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
  function prepareMeta({ title, description, url, image, keywords }, rest) {
    const meta = []

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

  inject("getReadableDate", getReadableDate)
  inject("getReadingTime", getReadingTime)
  inject("prepareMeta", prepareMeta)
}
