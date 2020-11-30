<template>
  <div v-ripple>
    <div
      v-if="type === 'post'"
      class="bg-gray-200 rounded-md cursor-pointer w-full transition hover:shadow-lg h-40 relative"
    >
      <div
        class="absolute top-0 left-0 rounded-md bg-gray-400 h-40 w-full animate-pulse"
      >
        <div
          class="absolute bottom-0 left-0 p-4 w-full space-y-1 animate-pulse"
        >
          <div class="bg-gray-300 rounded-md w-3/4 h-6"></div>
          <div class="bg-gray-300 rounded-md w-4/4 h-3"></div>
        </div>
      </div>
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
