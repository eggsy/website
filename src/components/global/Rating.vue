<template>
  <div class="flex items-center space-x-2">
    <div
      class="bg-red-600 hover:bg-red-700 select-none w-16 px-2 py-px rounded-md text-gray-100 font-semibold text-center"
    >
      {{ rating }}
    </div>
    <div class="truncate">{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
  },
}
</script>
