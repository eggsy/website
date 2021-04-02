<template>
  <nav class="w-full">
    <div class="container relative w-11/12 mx-auto sm:w-9/12 md:w-7/12">
      <div class="flex items-center justify-between">
        <nuxt-link :to="{ name: 'index' }">
          <SkeletonLoader
            type="image"
            image-url="/assets/icons/icon.svg"
            class="w-10 h-10 transition bg-gray-100 rounded-md ring-1 ring-gray-200 sm:transform hover:-rotate-6"
            title="EGGSY's Website"
          />
        </nuxt-link>

        <div class="hidden space-x-2 sm:flex sm:items-center">
          <nuxt-link
            v-for="(link, index) in getCurrentRouteLinks"
            :key="`link-${index}`"
            :to="link.to"
            class="px-2 py-1 text-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
          >
            {{ link.title }}
          </nuxt-link>

          <ColorSwitcher />
        </div>

        <!-- Mobile Navbar -->
        <div class="block sm:hidden">
          <div @click="mobileMenu = !mobileMenu">
            <icon
              name="menu"
              class="w-8 h-8 text-gray-900 dark:text-gray-100"
            />
          </div>

          <transition name="fade" mode="out-in">
            <div
              v-if="mobileMenu === true"
              class="absolute z-20 p-4 space-y-4 bg-gray-200 rounded-md shadow-lg -right-1 -top-1 -left-1 dark:bg-gray-800"
            >
              <div
                class="flex items-center justify-between text-gray-900 dark:text-gray-100"
              >
                <h3 class="text-lg font-medium">Menu</h3>

                <div @click="mobileMenu = false">
                  <icon name="x" class="w-6 h-6" />
                </div>
              </div>

              <div class="space-y-2">
                <nuxt-link
                  v-for="(link, index) in getCurrentRouteLinks"
                  :key="`link-${index}`"
                  :to="link.to"
                  class="flex justify-center px-4 py-2 text-gray-800 bg-gray-300 rounded-md dark:text-gray-200 dark:bg-gray-700"
                >
                  {{ link.title }}
                </nuxt-link>
              </div>

              <div class="flex items-center">
                <div
                  :class="{
                    'flex items-center justify-center w-1/2 py-2 space-x-2 text-gray-800  dark:text-gray-200 rounded-tl-md rounded-bl-md': true,
                    'bg-gray-300 dark:bg-gray-700':
                      getSelectedTheme !== 'light',
                    'bg-gray-400 dark:bg-gray-900':
                      getSelectedTheme === 'light',
                  }"
                  @click="switchTheme('light')"
                >
                  <icon name="sun" class="w-6 h-6" />
                  <span>Light</span>
                </div>

                <div
                  :class="{
                    'flex items-center justify-center w-1/2 py-2 space-x-2 text-gray-800 bg-gray-300 dark:text-gray-200 dark:bg-gray-700 rounded-tr-md rounded-br-md': true,
                    'bg-gray-300 dark:bg-gray-700': getSelectedTheme !== 'dark',
                    'bg-gray-400 dark:bg-gray-900': getSelectedTheme === 'dark',
                  }"
                  @click="switchTheme('dark')"
                >
                  <icon name="moon" class="w-6 h-6" />
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

<script>
export default {
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
            title: "Contact",
            to: "/#socials",
          },
          {
            title: "Donate",
            to: "/donate",
          },
        ],
        premid: [
          {
            title: "Home",
            to: "/projects/premid/",
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
     * @returns {Array.<{title: string, to: string}>}
     */
    getCurrentRouteLinks() {
      if (this.$route.path.startsWith("/projects/premid"))
        return this.links.premid
      else return this.links.default
    },
    /**
     * Returns the selected color mode value.
     * @returns {'light'|'dark'} The color mode as "light" or "dark".
     */
    getSelectedTheme() {
      return this.$colorMode.value
    },
  },
  methods: {
    /**
     * Updates the color mode value.
     * @param {'light'|'dark'} option The color mode option.
     */
    switchTheme(option) {
      this.$colorMode.preference = option
    },
  },
}
</script>
