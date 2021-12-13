<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  head() {
    let string = "eggsy.xyz"
    if (this.routeIsBlog) string = "eggsy.xyz - blog"

    return {
      titleTemplate: `%s - ${string}`,
      htmlAttrs: {
        class: `min-h-screen ${this.$colorMode.value}`,
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
  computed: {
    /**
     * Checks if current route is a blog route.
     * @returns {boolean | undefined}
     */
    routeIsBlog(): boolean | undefined {
      return this.$route.name?.includes("blog")
    },
  },
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-neutral-900">
    <!-- Colored top bar -->
    <div class="bg-indigo-700 w-full py-1 dark:bg-neutral-700" />

    <!-- Navbar -->
    <transition name="fade" mode="out-in">
      <NavbarBlog v-if="routeIsBlog" class="pt-4" />
      <NavbarDefault v-else class="pt-4" />
    </transition>

    <!-- Nuxt component -->
    <Nuxt class="container mx-auto min-h-screen pb-8 w-11/12 sm:(pb-10 w-9/12) md:w-7/12 " />

    <!-- Footer -->
    <Footer />

    <!-- Colored bottom bar -->
    <div class="bg-indigo-700 w-full py-1 dark:bg-neutral-700" />

    <!-- Go to top button -->
    <div class="flex space-x-2 mr-6 mb-4 right-0 bottom-0 z-50 fixed items-center sm:space-x-4">
      <GoTop />
    </div>
  </div>
</template>
