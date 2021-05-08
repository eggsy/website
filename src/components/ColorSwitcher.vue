<template>
  <div
    class="rounded-full cursor-pointer bg-gray-100 p-2 text-gray-900 select-none dark:(bg-gray-800 text-gray-100) focus:outline-none"
    @click="switchTheme"
  >
    <icon
      v-if="getSelectedTheme === 'light'"
      key="sun"
      name="sun"
      class="h-5 w-5"
    />

    <icon v-else key="moon" name="moon" class="h-5 w-5" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  computed: {
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
     */
    switchTheme() {
      this.$colorMode.preference =
        this.getSelectedTheme === "dark" ? "light" : "dark"
    },
  },
})
</script>
