<template>
  <div class="min-h-screen min-w-screen bg-gray-50 dark:bg-gray-900">
    <!-- Colored top bar -->
    <div
      class="absolute top-0 left-0 right-0 w-full py-2 bg-indigo-700 dark:bg-indigo-900"
    />

    <!-- Navbar -->
    <transition name="fade" mode="out-in">
      <NavbarBlog v-if="$route.name.includes('blog')" />
      <NavbarDefault v-else class="pt-8" />
    </transition>

    <!-- Nuxt component -->
    <Nuxt
      class="container w-11/12 min-h-screen pb-8 mx-auto sm:pb-10 sm:w-9/12 md:w-7/12"
    />

    <!-- Footer -->
    <Footer />

    <!-- Go to top button -->
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
    let string = "eggsy.xyz"
    if (this.$route.name.includes("blog")) string = "eggsy.xyz - blog"

    return {
      titleTemplate: `%s - ${string}`,
      htmlAttrs: {
        class: `min-h-screen min-w-screen scrollbar-thin ${this.$colorMode.value}`,
      },
      meta: [
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: string,
        },
      ],
    }
  },
}
</script>
