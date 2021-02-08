<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 min-w-screen">
    <div
      class="absolute top-0 left-0 right-0 w-full py-2 bg-indigo-700 dark:bg-indigo-900"
    />

    <NavbarDefault class="pt-8" />
    <Nuxt class="container w-11/12 pb-10 mx-auto sm:w-7/12" />

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
      titleTemplate: "%s - eggsy.xyz",
      htmlAttrs: {
        class: `scrollbar-thin min-h-screen min-w-screen ${this.$colorMode.value}`,
      },
    }
  },
}
</script>
