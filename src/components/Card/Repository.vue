<template>
  <div
    class="bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-80 rounded-md p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-900"
  >
    <div class="flex space-x-1 items-center mb-2">
      <div
        class="flex-grow truncate space-x-2 text-gray-800 dark:text-gray-200 hover:underline"
      >
        {{ name }}
      </div>
      <div class="flex items-center space-x-1">
        <div class="flex items-center space-x-1">
          <span>{{ stars }}</span>
          <icon name="star-filled" class="h-6 w-6 text-yellow-600" />
        </div>

        <icon
          v-if="getLanguageIcon"
          :name="getLanguageIcon"
          :title="language"
          class="h-5 w-5"
        />
      </div>
    </div>

    <p class="text-sm text-gray-500 dark:text-gray-400">{{ description }}</p>
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
      default: () => null,
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
    getLanguageIcon() {
      const icons = {
        Vue: "vuejs",
        TypeScript: "typescript",
        JavaScript: "javascript",
      }

      return icons[this.language] || false
    },
  },
}
</script>
