<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  computed: {
    /**
     * Return target url.
     */
    getTargetLink(): string {
      const path = this.$route.path

      if (path !== "/projects/premid" && path.startsWith("/projects/premid"))
        return "/projects/premid"
      else if (path.includes("/blog/") && this.$route.params) return "/blog"
      else return "/"
    },
  },
})
</script>

<template>
  <nav class="w-full">
    <div class="container mx-auto px-4 w-11/12 relative sm:w-9/12 md:w-7/12">
      <div class="flex items-center justify-between">
        <SmartLink :href="getTargetLink" class="flex-shrink-0 h-10 w-10">
          <SmartImage
            src="/assets/icons/icon.svg"
            class="rounded-md bg-gray-100 ring-black transition-transform ring-2 ring-opacity-5 sm:transform hover:-rotate-6"
            width="100"
            height="100"
            title="EGGSY's Website"
          />
        </SmartLink>

        <div class="flex space-x-2 items-center">
          <OmnibarButton />
          <ColorSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>
