<template>
  <div
    class="rounded-md bg-gray-100 p-4 ring-1 ring-gray-200 dark:(bg-gray-800 ring-gray-900)"
  >
    <div class="flex space-x-1 text-gray-900 items-center dark:text-gray-100">
      <span class="flex-grow space-x-2 truncate hover:underline">
        {{ name }}
      </span>

      <div class="flex space-x-1 items-center">
        <div class="flex space-x-1 items-center">
          <span>{{ stars }}</span>
          <icon name="star-filled" class="h-6 text-yellow-600 w-6" />
        </div>

        <icon
          v-if="getLanguageIcon"
          :name="getLanguageIcon"
          :title="language"
          class="h-5 w-5"
        />
      </div>
    </div>

    <p class="text-gray-700 line-clamp-2 dark:text-gray-300">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: false,
      default: null,
    },
    stars: {
      type: [String, Number],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  computed: {
    /**
     * Returns proper name for the language icon.
     * @returns {string}
     */
    getLanguageIcon() {
      const icons = {
        Vue: "vuejs",
        TypeScript: "typescript",
        JavaScript: "javascript",
      }

      return icons[this.language] || ""
    },
  },
}
</script>
