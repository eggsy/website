<template>
  <div
    v-if="type === 'repository'"
    class="bg-gray-100 hover:bg-gray-200 dark:hover:bg-opacity-80 dark:bg-gray-800 dark:hover:bg-gray-800 rounded-md p-4 space-y-1"
  >
    <div
      class="w-7/12 h-4 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse"
    ></div>
    <div class="space-y-px animate-pulse">
      <div class="bg-gray-300 dark:bg-gray-700 h-3 w-full rounded-md"></div>
      <div class="bg-gray-300 dark:bg-gray-700 h-3 w-11/12 rounded-md"></div>
      <div class="bg-gray-300 dark:bg-gray-700 h-3 w-4/12 rounded-md"></div>
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
