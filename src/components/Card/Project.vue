<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
  },
})
</script>

<template>
  <div
    class="
      rounded-lg
      cursor-pointer
      bg-gray-200/50
      transition-shadow
      dark:bg-gray-800
      hover:shadow-md
    "
    :class="{ flex: image && (title || description) }"
  >
    <SmartImage
      v-if="image"
      :src="image"
      :class="
        image && (title || description)
          ? 'w-1/3 flex-shrink-0 rounded-tl rounded-bl'
          : 'rounded'
      "
    />

    <div v-if="title || description" class="p-4">
      <h3
        v-if="title"
        class="font-medium text-lg text-gray-700 truncate dark:text-gray-100"
        :title="title"
      >
        {{ title }}
      </h3>

      <p
        v-if="description"
        class="text-gray-500 line-clamp-2 dark:text-gray-300"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
