<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      mobileMenu: false,
      links: {
        default: [
          {
            title: "Blog",
            to: "/blog",
          },
          {
            title: "Projects",
            to: "/#projects",
          },
          {
            title: "Daily",
            to: "/daily",
          },
          {
            title: "Donate",
            to: "/donate",
          },
        ],
        premid: [
          {
            title: "Home",
            to: "/projects/premid",
          },
          {
            title: "Custom Status",
            to: "/projects/premid/custom-status",
          },
          {
            title: "Metadata Creator",
            to: "/projects/premid/mdcreator",
          },
        ],
      },
    }
  },
  computed: {
    /**
     * Checks if route has special links and returns the array according to that.
     * @returns {Array.<{title: string; to: string}>}
     */
    getCurrentRouteLinks(): Array<{ title: string; to: string }> {
      if (this.$route.path.startsWith("/projects/premid"))
        return this.links.premid
      else return this.links.default
    },
    /**
     * Returns the selected color mode value.
     * @returns {string} The color mode as "light" or "dark".
     */
    getSelectedTheme(): string {
      return this.$colorMode.value
    },
    /**
     * Return target url.
     */
    getTargetLink(): string {
      const path = this.$route.path

      if (path !== "/projects/premid" && path.startsWith("/projects/premid"))
        return "/projects/premid"
      else return "/"
    },
  },
  methods: {
    /**
     * Updates the color mode value.
     * @param {'light'|'dark'} option The color mode option.
     */
    switchTheme(option: "light" | "dark") {
      this.$colorMode.preference = option
    },
  },
})
</script>

<template>
  <nav class="w-full">
    <div class="container mx-auto w-11/12 relative sm:w-9/12 md:w-7/12">
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
          <ColorSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>
