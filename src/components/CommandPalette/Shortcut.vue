<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      key: "⌘",
    }
  },
  beforeMount() {
    this.key = navigator?.platform?.includes("Mac") ? "⌘" : "Alt"
  },
})
</script>

<template>
  <div
    class="flex space-x-2 inset-x-0 bottom-8 dark items-center justify-center fixed"
  >
    <Kbd>{{ key }}</Kbd> <Kbd>K</Kbd>
  </div>
</template>
