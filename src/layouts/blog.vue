<template>
  <div class="min-h-screen min-w-screen bg-gray-50 dark:bg-gray-900">
    <div
      class="bg-indigo-700 w-full py-2 top-0 right-0 left-0 absolute dark:bg-indigo-900"
    />

    <NavbarBlog class="pt-6" />
    <Nuxt class="container mx-auto pt-6 sm:w-9/12 md:w-7/12" />

    <div
      class="flex space-x-2 mr-6 mb-4 right-0 bottom-0 z-50 fixed items-center sm:space-x-4"
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
        class: `min-h-screen min-w-screen scrollbar-thin ${this.$colorMode.value}`,
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
