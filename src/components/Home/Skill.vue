<template>
  <div
    class="bg-gray-200 dark:bg-gray-700 hover:bg-opacity-75 p-2 rounded-md dark:text-white flex items-center justify-center space-x-2 cursor-pointer"
  >
    <icon :name="icon" class="h-8 w-8" />
    <h3 class="truncate flex-grow">{{ title }}</h3>
    <div
      class="text-white bg-green-600 rounded-full font-semibold w-8 h-8 flex justify-center items-center"
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
