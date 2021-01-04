<template>
  <div
    class="flex items-center justify-center p-2 space-x-2 bg-gray-200 rounded-md cursor-pointer dark:bg-gray-700 hover:bg-opacity-75 dark:text-white"
  >
    <icon :name="icon" class="w-6 h-6" />
    <h3 class="flex-grow text-center truncate" :title="title">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  @apply truncate;
}
</style>
