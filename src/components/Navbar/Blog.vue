<template>
  <nav
    :class="{
      'z-40 w-full': true,
      'bg-indigo-700 dark:bg-indigo-900': searchEnabled === true,
    }"
  >
    <div class="container mx-auto text-gray-200 sm:px-0 sm:w-7/12">
      <div
        v-if="searchEnabled === false"
        class="flex items-center justify-between px-4 py-2 sm:px-0"
      >
        <nuxt-link :to="{ name: getTargetRoute.name }">
          <SkeletonLoader
            type="image"
            image-url="/assets/icons/icon.svg"
            class="w-10 h-10 transition bg-gray-100 rounded-md ring-1 ring-gray-200 sm:transform hover:-rotate-6"
            :title="getTargetRoute.title"
          />
        </nuxt-link>

        <div class="flex items-center space-x-4">
          <div
            class="flex items-center px-2.5 py-2.5 sm:px-3 sm:py-1.5 sm:space-x-2 text-gray-900 rounded-full cursor-pointer dark:text-gray-100 hover:bg-gray-200 focus:outline-none dark:hover:bg-gray-800"
            title="Gönderi ara"
            @click="
              {
                searchEnabled = true
                focusSearch()
              }
            "
          >
            <span class="hidden sm:block">Gönderi Ara</span>
            <icon name="search" class="w-4 h-4" />
          </div>

          <ColorSwitcher />
        </div>
      </div>

      <div v-else-if="searchEnabled === true">
        <div class="relative">
          <label for="search" class="hidden">Ara</label>
          <input
            id="search"
            ref="search"
            v-model="input"
            placeholder="Ne aramak istiyorsunuz?"
            class="w-full py-4 pl-4 pr-24 placeholder-gray-100 bg-indigo-700 rounded-none sm:pr-28 dark:bg-indigo-900 focus:outline-none"
            @keydown="handleSearchKeydown"
          />
          <div
            class="absolute flex items-center space-x-1 text-xs select-none right-4 absolute-align-middle sm:space-x-2 sm:right-1 focus:outline-none"
          >
            <div
              class="p-2 bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-800"
              @click="search()"
            >
              <span class="hidden sm:block">ENTER</span>
              <icon name="search" class="block w-4 h-4 sm:hidden" />
            </div>
            <div
              class="p-2 bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-800"
              @click="searchEnabled = false"
            >
              <span class="hidden sm:block">ESC</span>
              <icon name="x" class="block w-4 h-4 sm:hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      searchEnabled: false,
      links: ["Haber", "Discord", "Linux"],
    }
  },
  computed: {
    /**
     * Returns the target route according to the current route.
     * @returns {{title: string; name: string;}}
     */
    getTargetRoute() {
      if (this.$route.name === "blog")
        return {
          title: "Ana Sayfaya Dön",
          name: "index",
        }
      else
        return {
          title: "Bloga Dön",
          name: "blog",
        }
    },
    /**
     * Checks for common query parameters and returns a boolean.
     * @returns {boolean} Is user searching or not.
     */
    isSearching() {
      const { q, search, query, ara, sorgu, etiket } = this.$route.query
      return !!q || !!search || !!query || !!ara || !!sorgu || !!etiket
    },
  },
  watch: {
    "$route.path": "routeChange",
  },
  methods: {
    /**
     * Changes the current route to search and inserts the input query and closes search input.
     */
    search() {
      if (this.input)
        this.$router.push({ name: "blog", query: { q: this.input } })
      this.searchEnabled = false
    },
    /**
     * Focuses on the search if its reference is available.
     */
    focusSearch() {
      setTimeout(() => this.$refs.search?.focus())
    },
    /**
     * Listener for two different keys in a single method. Switch to default mode if ESC is pressed and redirect to search route if ENTER is pressed.
     * @param {KeyboardEvent} event JSX mousedown event.
     */
    handleSearchKeydown(event) {
      if (event.key === "Escape") this.searchEnabled = false
      else if (event.key === "Enter") this.search()
    },
    /**
     * Clears input state on route change (called in watch query).
     */
    routeChange() {
      this.searchEnabled = false
      this.input = ""
    },
  },
}
</script>
