export default {
  liveEdit: false,
  markdown: {
    prism: {
      theme: "prism-themes/themes/prism-coldark-dark.css",
    },
    remarkExternalLinks: {
      target: "_blank",
      rel: "nofollow",
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
