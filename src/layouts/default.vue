<template>
  <div :class="{ 'bg-gray-50 dark:bg-gray-900': $route.path === '/' }">
    <Nuxt class="min-h-screen container mx-auto" />
  </div>
</template>

<script>
export default {
  head: {
    titleTemplate: "%s - eggsy.xyz",
  },
}
</script>
