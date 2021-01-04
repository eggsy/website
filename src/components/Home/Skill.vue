<template>
  <div
    class="flex items-center justify-center p-2 space-x-2 bg-gray-200 rounded-md cursor-pointer dark:bg-gray-700 hover:bg-opacity-75 dark:text-white"
  >
    <icon :name="icon" class="w-8 h-8" />
    <h3 class="flex-grow truncate" :title="title">{{ title }}</h3>
    <div
      class="flex items-center justify-center w-8 h-8 font-semibold text-white bg-green-600 rounded-full"
    >
      {{ level }}
    </div>
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
      required: true,
    },
    level: {
      type: Number,
      required: true,
      default: 0,
    },
  },
}
</script>
