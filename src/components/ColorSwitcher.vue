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

<template>
  <Button
    rounded
    elevated
    :icon="getSelectedTheme === 'light' ? 'Sun' : 'Moon'"
    @click.native="switchTheme"
  />
</template>
