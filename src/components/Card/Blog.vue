<template>
  <div>
    <div
      v-if="loading"
      class="px-6 py-4 bg-gray-300 shadow-md rounded-md cursor-pointer w-full space-y-2 transition hover:shadow-lg"
    >
      <div class="rounded-md bg-gray-400 h-16 w-full shadow-lg animate-pulse" />

      <div class="flex flex-wrap gap-2">
        <span
          v-for="index in 2"
          :key="index"
          class="bg-gray-400 py-px px-2 w-1/4 h-4 rounded-lg transition shadow-sm animate-pulse"
        ></span>
      </div>

      <h2 class="bg-gray-400 rounded-md animate-pulse w-3/4 h-6"></h2>
    </div>

    <div
      v-else
      class="px-6 py-4 bg-gray-300 shadow-md rounded-md cursor-pointer w-full space-y-2 transition hover:shadow-lg"
    >
      <img
        class="rounded-md shadow-lg"
        :src="post.image"
        :alt="post.title"
        :title="post.title"
      />

      <div class="flex gap-1 truncate">
        <span
          v-for="tag in post.tags.split(', ')"
          :key="tag"
          class="bg-gray-800 py-px px-2 text-gray-200 rounded-lg cursor-pointer hover:bg-gray-900 transition shadow-sm text-sm"
          >#{{ tag }}</span
        >
      </div>

      <h2 class="text-gray-800 font-semibold text-xl truncate">
        {{ post.title }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    post: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
}
</script>
