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
      content: process.env.npm_package_description,
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
      content: process.env.npm_package_description,
    },
    /* Open-Graph */
    {
      hid: "og:site_name",
      name: "og:site_name",
      content: "eggsy.xyz",
    },
    {
      hid: "og:description",
      name: "og:description",
      content: process.env.npm_package_description,
    },
    /* Others */
    {
      hid: "theme-color",
      name: "theme-color",
      content: "#111827",
    },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "stylesheet",
      href:
        "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
      async: true,
      defer: true,
    },
  ],
}
