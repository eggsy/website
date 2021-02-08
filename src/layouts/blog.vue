<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div
      class="absolute top-0 left-0 right-0 w-full py-2 bg-indigo-700 dark:bg-indigo-900"
    />

    <NavbarBlog class="pt-6" />
    <Nuxt class="container pt-6 mx-auto sm:w-7/12" />

    <div
      class="fixed bottom-0 right-0 z-50 flex items-center mb-4 mr-6 space-x-2 sm:space-x-4"
    >
      <GoTop />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: "%s - eggsy.xyz blog",
      htmlAttrs: {
        lang: "tr",
        class: `scrollbar-thin min-h-screen min-w-screen ${this.$colorMode.value}`,
      },
      meta: [
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: "eggsy.xyz - blog",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/assets/icons/icon-blog-white-bg.ico",
        },
      ],
    }
  },
}
</script>
