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
  <Button rounded elevated @click.native="switchTheme">
    <IconSun v-if="getSelectedTheme === 'light'" class="h-5 w-5" />
    <IconMoon v-else class="h-5 w-5" />
  </Button>
</template>
