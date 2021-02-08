<template>
  <div
    class="flex items-center text-gray-900 rounded-full cursor-pointer dark:text-gray-100"
  >
    <div
      :class="{
        'p-2 rounded-tl rounded-bl focus:outline-none': true,
        'bg-gray-100 dark:bg-gray-600': getSelectedTheme !== 'light',
        'bg-gray-200 dark:bg-gray-700': getSelectedTheme === 'light',
      }"
      @click="switchTheme('light')"
    >
      <icon name="sun" class="w-4 h-4" />
    </div>

    <div
      :class="{
        'p-2 rounded-tr rounded-br focus:outline-none': true,
        'bg-gray-100 dark:bg-gray-600': getSelectedTheme !== 'dark',
        'bg-gray-200 dark:bg-gray-700': getSelectedTheme === 'dark',
      }"
      @click="switchTheme('dark')"
    >
      <icon name="moon" class="w-4 h-4" />
    </div>
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
    switchTheme(option) {
      this.$colorMode.preference = option
    },
  },
}
</script>
