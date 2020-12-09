<template>
  <div class="bg-gray-50 dark:bg-gray-900 w-full min-h-screen">
    <div class="container mx-auto">
      <Navbar />
      <Nuxt class="pt-10 px-2" />
    </div>

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
