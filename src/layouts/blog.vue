<template>
  <div class="bg-gray-50 dark:bg-gray-900 w-full min-h-screen">
    <NavbarBlog />
    <Nuxt class="container mx-2 sm:mx-auto" />

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
