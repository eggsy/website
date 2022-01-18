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
    icon="Menu"
    class="hidden md:block"
    rounded
    elevated
    @click.native="togglePalette"
  />
</template>
