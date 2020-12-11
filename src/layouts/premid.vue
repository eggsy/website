<template>
  <div class="bg-gray-50 dark:bg-gray-800">
    <NavbarPreMiD />
    <Nuxt class="w-full min-h-screen pt-16 pb-16 mb:pb-8 container mx-auto" />

    <ColorSwitcher />
  </div>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: "%s - eggsy.xyz",
      htmlAttrs: {
        class: `scrollbar-thin ${this.$colorMode.value}`,
      },
    }
  },
}
</script>
