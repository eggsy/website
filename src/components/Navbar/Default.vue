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
            to: "/blog/",
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
    <div class="container relative w-11/12 mx-auto sm:w-9/12 md:w-7/12">
      <div class="flex items-center justify-between">
        <SmartLink :href="{ name: 'index' }" class="flex-shrink-0 w-10 h-10">
          <SmartImage
            src="/assets/icons/icon.svg"
            class="transition-transform bg-gray-100 rounded-md  ring-black ring-2 ring-opacity-5 sm:transform hover:-rotate-6"
            width="100"
            height="100"
            title="EGGSY's Website"
          />
        </SmartLink>

        <div class="hidden space-x-2 sm:flex sm:items-center">
          <SmartLink
            v-for="(link, index) in getCurrentRouteLinks"
            :key="`link-${index}`"
            :href="link.to"
            class="
              rounded
              py-1
              px-2
              text-gray-800
              dark:(text-gray-200
              hover:bg-gray-700) hover:bg-gray-100
            "
          >
            {{ link.title }}
          </SmartLink>

          <ColorSwitcher />
        </div>

        <!-- Mobile Navbar -->
        <div class="block sm:hidden">
          <div @click="mobileMenu = !mobileMenu">
            <IconMenu class="w-8 h-8 text-gray-900 dark:text-gray-100" />
          </div>

          <transition name="fade" mode="out-in">
            <div
              v-show="mobileMenu === true"
              class="absolute z-20 p-4 space-y-4 bg-gray-200 rounded-md shadow-lg  -top-1 -right-1 -left-1 dark:bg-gray-800"
            >
              <div
                class="flex items-center justify-between text-gray-900  dark:text-gray-100"
              >
                <h3 class="text-lg font-medium">Menu</h3>

                <div @click="mobileMenu = false">
                  <IconX class="w-6 h-6" />
                </div>
              </div>

              <div class="space-y-2">
                <SmartLink
                  v-for="(link, index) in getCurrentRouteLinks"
                  :key="`link-${index}`"
                  :href="link.to"
                  class="
                    rounded-md
                    flex
                    bg-gray-300
                    py-2
                    px-4
                    text-gray-800
                    justify-center
                    dark:(bg-gray-700
                    text-gray-200)
                  "
                >
                  {{ link.title }}
                </SmartLink>
              </div>

              <div class="flex items-center">
                <div
                  class="flex items-center justify-center w-1/2 py-2 space-x-2 text-gray-800  rounded-tl-md rounded-bl-md dark:text-gray-200"
                  :class="{
                    'bg-gray-300 dark:bg-gray-700':
                      getSelectedTheme !== 'light',
                    'bg-gray-400 dark:bg-gray-900':
                      getSelectedTheme === 'light',
                  }"
                  @click="switchTheme('light')"
                >
                  <IconSun class="w-6 h-6" />
                  <span>Light</span>
                </div>

                <div
                  class="
                    rounded-tr-md rounded-br-md
                    flex
                    space-x-2
                    bg-gray-300
                    py-2
                    text-gray-800
                    w-1/2
                    items-center
                    justify-center
                    dark:(text-gray-200
                    bg-gray-700)
                  "
                  :class="{
                    'bg-gray-300 dark:bg-gray-700': getSelectedTheme !== 'dark',
                    'bg-gray-400 dark:bg-gray-900': getSelectedTheme === 'dark',
                  }"
                  @click="switchTheme('dark')"
                >
                  <IconMoon class="w-6 h-6" />
                  <span>Dark</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>
