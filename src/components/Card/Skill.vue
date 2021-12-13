<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
})
</script>

<template>
  <div
    class="flex space-x-2 text-gray-900  items-center overflow-hidden dark:text-neutral-200"
  >
    <IconDev :brand="title" class="flex-shrink-0 h-7 w-7" />
    <span class="truncate">{{ title }}</span>
  </div>
</template>
