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
    class="flex items-center space-x-2 overflow-hidden text-gray-900  dark:text-gray-100"
  >
    <IconDev :brand="title" class="flex-shrink-0 h-7 w-7" />
    <span class="truncate">{{ title }}</span>
  </div>
</template>
