<template>
  <div
    class="flex items-center space-x-1 overflow-hidden text-gray-900 dark:text-gray-100"
  >
    <icon :name="getIconName" class="flex-shrink-0 w-7 h-7" />
    <span class="truncate">{{ title }}</span>
  </div>
</template>

<script>
export default {
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
    getIconName() {
      if (this.icon) return this.icon
      else
        return (
          this.title?.toLowerCase()?.replace(/[^a-zA-Z]/g, "") || "arrow-right"
        )
    },
  },
}
</script>
