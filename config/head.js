const description =
  "Young JavaScript developer from Turkey, interested in languages, gaming and programming, trying to improve his skills with JavaScript. Check out my portfolio and read my blog posts!"

export default {
  title: "eggsy.xyz",
  htmlAttrs: {
    class: "scrollbar-thin",
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content: description,
    },
    /* Twitter */
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary",
    },
    {
      hid: "twitter:site",
      name: "twitter:site",
      content: "@eggsydev",
    },
    {
      hid: "twitter:creator",
      name: "twitter:creator",
      content: "@eggsydev",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: "eggsy.xyz",
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: description,
    },
    /* Open-Graph */
    {
      hid: "og:type",
      name: "og:type",
      content: "website",
    },
    {
      hid: "og:site_name",
      name: "og:site_name",
      content: "eggsy.xyz",
    },
    {
      hid: "og:description",
      name: "og:description",
      content: description,
    },
    /* Others */
    {
      hid: "theme-color",
      name: "theme-color",
      content: "#111827",
    },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
}
