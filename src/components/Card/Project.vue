<template>
  <div
    class="rounded bg-gray-100 ring-1 ring-gray-200 dark:(ring-gray-900 bg-gray-800)"
  >
    <SmartImage v-if="image" :src="image" class="rounded-tl rounded-tr" />

    <div v-if="title || description" class="p-4">
      <h3
        v-if="title"
        class="font-medium text-lg text-gray-900 truncate dark:text-gray-100 hover:underline"
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
