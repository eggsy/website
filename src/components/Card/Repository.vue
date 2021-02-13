<template>
  <div
    class="p-4 bg-gray-100 rounded-md dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-900"
  >
    <div class="flex items-center space-x-1 text-gray-900 dark:text-gray-100">
      <span class="flex-grow space-x-2 truncate hover:underline">
        {{ name }}
      </span>

      <div class="flex items-center space-x-1">
        <div class="flex items-center space-x-1">
          <span>{{ stars }}</span>
          <icon name="star-filled" class="w-6 h-6 text-yellow-600" />
        </div>

        <icon
          v-if="getLanguageIcon"
          :name="getLanguageIcon"
          :title="language"
          class="w-5 h-5"
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
