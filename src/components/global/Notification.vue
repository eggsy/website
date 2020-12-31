<template>
  <div
    :class="{
      'mb-4 px-4 py-2 rounded-md text-gray-100': true,
      [getBackgroundColor]: true,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: "information",
    },
  },
  computed: {
    getBackgroundColor() {
      let color = "bg-blue-500 dark:bg-blue-600"

      switch (this.type) {
        case "warning":
          color = "bg-yellow-500 dark:bg-yellow-600"
          break
        case "danger":
          color = "bg-red-500 dark:bg-yellow-600"
          break
      }

      return color
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  a {
    @apply text-purple-600 font-medium hover:underline;
  }
}
</style>
