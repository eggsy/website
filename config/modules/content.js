export default {
  liveEdit: false,
  markdown: {
    prism: {
      theme: "prism-themes/themes/prism-dracula.css",
    },
    remarkExternalLinks: {
      target: "_blank",
      rel: "noreferrer",
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
