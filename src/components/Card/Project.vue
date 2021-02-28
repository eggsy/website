<template>
  <div
    class="bg-gray-100 rounded ring-1 ring-gray-200 dark:ring-gray-900 dark:bg-gray-800"
  >
    <SkeletonLoader
      v-if="image"
      type="image"
      :image-url="image"
      class="rounded-tl rounded-tr"
    />

    <div v-if="title || description" class="p-4">
      <h3
        class="text-lg font-medium text-gray-900 truncate hover:underline dark:text-gray-100"
        :title="title"
      >
        {{ title }}
      </h3>

      <p
        v-if="description"
        class="text-gray-700 line-clamp-2 dark:text-gray-300"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
  },
}
</script>
