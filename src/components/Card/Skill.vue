<template>
  <div
    class="flex space-x-2 text-gray-900 items-center overflow-hidden dark:text-gray-100"
  >
    <icon :name="getIconName" class="flex-shrink-0 h-7 w-7" />
    <span class="truncate">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    /**
     * Returns possible icon name if icon prop is not passed.
     * @returns {string}
     */
    getIconName(): string {
      if (this.icon) return this.icon
      else
        return (
          this.title?.toLowerCase()?.replace(/[^a-zA-Z]/g, "") || "arrow-right"
        )
    },
  },
})
</script>
