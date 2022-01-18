<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  methods: {
    togglePalette() {
      this.$store.commit("palette/toggleVisibility")
    },
  },
})
</script>

<template>
  <Button
    v-tippy="{
      content: '⌘/Alt + K',
    }"
    class="hidden md:block"
    rounded
    elevated
    @click.native="togglePalette"
  >
    <IconMenu class="h-5 w-5" />
  </Button>
</template>
