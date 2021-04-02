<template>
  <div
    class="p-2 text-gray-900 bg-gray-100 rounded-full cursor-pointer select-none focus:outline-none dark:bg-gray-800 dark:text-gray-100"
    @click="switchTheme"
  >
    <icon
      v-if="getSelectedTheme === 'light'"
      key="sun"
      name="sun"
      class="w-5 h-5"
    />

    <icon v-else key="moon" name="moon" class="w-5 h-5" />
  </div>
</template>

<script>
export default {
  computed: {
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
    switchTheme() {
      this.$colorMode.preference =
        this.getSelectedTheme === "dark" ? "light" : "dark"
    },
  },
}
</script>
