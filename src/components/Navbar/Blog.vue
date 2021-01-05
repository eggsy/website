<template>
  <nav
    :class="{
      'z-40 w-full shadow-sm': true,
      'bg-gray-900 sm:bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800':
        searchEnabled === false,
      'bg-gray-700': searchEnabled === true,
    }"
  >
    <div class="mx-auto text-gray-200 truncate sm:container">
      <div
        v-if="searchEnabled === false"
        class="flex items-center px-4 py-2 space-x-10 sm:px-0 space-between sm:justify-center"
      >
        <nuxt-link
          v-tippy="{
            content:
              $route.name === 'blog'
                ? 'Ana sayfaya geri dön'
                : 'Bloga geri dön',
            placement: 'bottom',
          }"
          :to="{
            name: $route.name === 'blog' ? 'index' : 'blog',
          }"
          class="p-2 py-2 rounded-full hover:underline hover:bg-gray-500 focus:outline-none"
          :title="
            $route.name === 'blog' ? 'Ana sayfaya geri dön' : 'Bloga geri dön'
          "
        >
          <icon
            v-if="$route.name === 'blog'"
            key="double-chevron"
            name="chevron-double-left"
            class="w-4 h-4"
          />

          <icon
            v-else
            key="single-chevron"
            name="chevron-left"
            class="w-4 h-4"
          />
        </nuxt-link>

        <nuxt-link
          to="/blog"
          class="flex-grow text-xl font-semibold text-center sm:flex-grow-0 hover:underline"
        >
          Blog
        </nuxt-link>

        <div
          v-tippy="{
            content: 'Gönderi ara',
            placement: 'bottom',
          }"
          class="p-2 py-2 rounded-full cursor-pointer hover:underline hover:bg-gray-500 focus:outline-none"
          title="Gönderi ara"
          @click="
            {
              searchEnabled = true
              focusSearch()
            }
          "
        >
          <icon name="search" class="w-4 h-4" />
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
            class="w-full py-3 pl-4 pr-24 bg-gray-700 rounded-none sm:pr-28 focus:outline-none"
            @keydown="handleSearchKeydown"
          />
          <div
            class="absolute top-0 flex items-center space-x-1 text-xs select-none sm:space-x-2 right-4 sm:right-1 absolute-align-middle"
          >
            <div
              class="p-2 bg-gray-600 rounded-md cursor-pointer hover:bg-gray-800"
              @click="search()"
            >
              <span class="hidden sm:block">ENTER</span>
              <icon name="search" class="block w-4 h-4 sm:hidden" />
            </div>
            <div
              class="p-2 bg-gray-600 rounded-md cursor-pointer hover:bg-gray-800"
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
    }
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
        this.$router.push({ name: "blog-ara", query: { q: this.input } })

      this.searchEnabled = false
    },
    /**
     * Focuses on the search if its reference is available.
     */
    focusSearch() {
      // Using a timeout, because of a reason I don't know, it doesn't read the ref otherwise.
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
