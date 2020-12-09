<template>
  <div :class="{ 'bg-gray-50 dark:bg-gray-900': $route.path === '/' }">
    <Nuxt class="min-h-screen container mx-auto" />

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
