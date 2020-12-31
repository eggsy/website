<template>
  <div
    class="bg-gray-200 dark:bg-gray-700 hover:bg-opacity-75 p-2 rounded-md dark:text-white flex items-center justify-center space-x-2 cursor-pointer"
  >
    <icon :name="icon" class="h-6 w-6" />
    <h3 class="truncate text-center flex-grow" :title="title">{{ title }}</h3>
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
