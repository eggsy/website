<template>
  <nav
    :class="{
      'z-40 w-full': true,
      'bg-indigo-700': searchEnabled === true,
    }"
  >
    <div class="container mx-auto text-gray-200 sm:px-0 sm:w-7/12">
      <div
        v-if="searchEnabled === false"
        class="flex items-center justify-between px-4 py-2 sm:px-0"
      >
        <nuxt-link :to="{ name: 'blog' }">
          <div
            :style="{ backgroundImage: `url('/assets/icons/icon-blog.svg')` }"
            class="w-10 h-10 transition bg-gray-100 bg-center bg-contain rounded-md ring-1 ring-gray-200 sm:transform hover:-rotate-6"
            title="EGGSY's Blog"
            alt="blog icon"
          />
        </nuxt-link>

        <div class="flex items-center space-x-4">
          <nuxt-link
            v-if="$route.name === 'blog'"
            v-tippy="{
              content: 'Ana sayfaya dön',
              placement: 'bottom',
            }"
            :to="{
              name: 'index',
            }"
            class="p-2 py-2 text-gray-900 rounded-full cursor-pointer dark:text-gray-100 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
            title="Ana sayfaya dön"
          >
            <icon
              key="double-left"
              name="chevron-double-left"
              class="w-4 h-4"
            />
          </nuxt-link>

          <nuxt-link
            v-else
            v-tippy="{
              content: 'Bloga dön',
              placement: 'bottom',
            }"
            :to="{
              name: 'blog',
            }"
            class="p-2 py-2 text-gray-900 rounded-full cursor-pointer dark:text-gray-100 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
            title="Bloga dön"
          >
            <icon key="single-left" name="chevron-left" class="w-4 h-4" />
          </nuxt-link>

          <div
            v-tippy="{
              content: 'Gönderi ara',
              placement: 'bottom',
            }"
            class="p-2 py-2 text-gray-900 rounded-full cursor-pointer dark:text-gray-100 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
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
            class="w-full py-4 pl-4 pr-24 placeholder-gray-100 bg-indigo-700 rounded-none dark:placeholder-gray-900 sm:pr-28 focus:outline-none"
            @keydown="handleSearchKeydown"
          />
          <div
            class="absolute top-0 flex items-center space-x-1 text-xs select-none sm:space-x-2 right-4 sm:right-1 absolute-align-middle focus:outline-none"
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
