<template>
  <div class="bg-gray-50 dark:bg-gray-800">
    <NavbarPreMiD />
    <Nuxt class="w-full min-h-screen pt-16 pb-8 container mx-2 sm:mx-auto" />

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
