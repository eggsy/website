import type { IContentOptions } from "@nuxt/content/types/index"

const Content: IContentOptions = {
  liveEdit: false,
  dir: "content",
  markdown: {
    prism: {
      theme: "prism-themes/themes/prism-one-dark.css",
    },
    /* @ts-ignore-next-line */
    remarkExternalLinks: {
      target: "_blank",
      rel: "noreferrer noopener",
    },
    remarkPlugins: [
      [
        "remark-autolink-headings",
        {
          behavior: "append",
        },
      ],
    ],
  },
}

export default Content
