<template>
  <div class="min-h-screen min-w-screen bg-gray-50 dark:bg-gray-900">
    <div
      class="absolute top-0 left-0 right-0 w-full py-2 bg-indigo-700 dark:bg-indigo-900"
    />

    <NavbarDefault class="pt-8" />
    <Nuxt class="container w-11/12 pb-10 mx-auto sm:w-9/12 md:w-7/12" />

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
        class: `min-h-screen min-w-screen scrollbar-thin ${this.$colorMode.value}`,
      },
    }
  },
}
</script>
