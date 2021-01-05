<template>
  <div class="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
    <NavbarBlog />
    <Nuxt class="container px-4 pt-6 sm:pt-10 sm:mx-auto" />

    <ColorSwitcher />
  </div>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: "%s - eggsy.xyz",
      htmlAttrs: {
        lang: "tr",
        class: `scrollbar-thin ${this.$colorMode.value}`,
      },
      meta: [
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: "eggsy.xyz - blog",
        },
      ],
    }
  },
}
</script>
