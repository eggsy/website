<script lang="ts">
import Vue from "vue"

export default Vue.extend({
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
})
</script>

<template>
  <div
    class="transition-shadow bg-gray-200 rounded-lg cursor-pointer bg-opacity-40 hover:shadow-md dark:bg-gray-800"
  >
    <SmartImage v-if="image" :src="image" class="rounded-tl rounded-tr" />

    <div v-if="title || description" class="p-4">
      <h3
        v-if="title"
        class="text-lg font-medium text-gray-900 truncate dark:text-gray-100"
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
