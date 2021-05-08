import { IContentOptions } from "@nuxt/content/types/index"

const Content: IContentOptions = {
  liveEdit: false,
  markdown: {
    prism: {
      theme: "prism-themes/themes/prism-dracula.css",
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
          behavior: "wrap",
        },
      ],
    ],
  },
}

export default Content
