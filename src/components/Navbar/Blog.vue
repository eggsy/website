<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      input: "",
      inputFocused: false,
    }
  },
  computed: {
    /**
     * Returns the target route according to the current route.
     * @returns {{title: string; name: string;}}
     */
    getTargetRoute(): { title: string; name: string } {
      if (this.$route.name === "blog" && !this.isSearching)
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
    isSearching(): boolean {
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
    },
    /**
     * Clears input state on route change (called in watch query).
     */
    routeChange() {
      this.input = ""
    },
  },
})
</script>

<template>
  <nav class="z-40 w-full">
    <div
      class="
        container
        flex
        mx-auto
        space-x-4
        text-gray-200
        w-11/12
        items-center
        justify-between
        sm:(px-0
        w-9/12)
        md:w-7/12
      "
    >
      <SmartLink
        :href="{ name: getTargetRoute.name }"
        class="flex-shrink-0 w-10 h-10"
      >
        <SmartImage
          src="/assets/icons/icon.svg"
          class="transition-transform bg-gray-100 rounded-md  ring-black ring-2 ring-opacity-5 sm:transform hover:-rotate-6"
          width="100"
          height="100"
          :title="getTargetRoute.title"
        />
      </SmartLink>

      <div class="flex items-center justify-end space-x-2 sm:space-x-4">
        <div
          class="flex items-center w-2/3 space-x-2 text-gray-500 bg-gray-100 rounded-lg  md:w-full dark:bg-gray-800"
          :class="{
            'ring-2 ring-gray-300 dark:ring-gray-700': inputFocused === true,
          }"
        >
          <input
            id="search"
            v-model="input"
            placeholder="Gönderi ara..."
            class="
              rounded-tl-lg rounded-bl-lg
              bg-gray-100
              w-full
              py-1.5
              px-3
              placeholder-gray-500
              appearance-none
              focus:outline-none
              dark:bg-gray-800
            "
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            @keydown.enter="search"
          />

          <label for="search" class="pr-2 cursor-pointer" @click="search">
            <IconSearch class="w-4 h-4" />
          </label>
        </div>

        <ColorSwitcher />
      </div>
    </div>
  </nav>
</template>
