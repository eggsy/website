<template>
  <div
    v-if="type === 'repository'"
    class="p-4 space-y-1 bg-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-opacity-80 dark:bg-gray-800 dark:hover:bg-gray-800"
  >
    <div
      class="w-7/12 h-4 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"
    ></div>
    <div class="space-y-px animate-pulse">
      <div class="w-full h-3 bg-gray-300 rounded-md dark:bg-gray-700"></div>
      <div class="w-11/12 h-3 bg-gray-300 rounded-md dark:bg-gray-700"></div>
      <div class="w-4/12 h-3 bg-gray-300 rounded-md dark:bg-gray-700"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
}
</script>
