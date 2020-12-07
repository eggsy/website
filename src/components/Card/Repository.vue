<template>
  <div class="repository-card">
    <div class="title-container">
      <div class="title">
        {{ name }}
      </div>
      <div class="information">
        <div class="stars">
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

    <p class="description">{{ description }}</p>
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

<style lang="scss" scoped>
.repository-card {
  @apply bg-gray-100 hover:bg-gray-200 rounded-md p-4 text-gray-700;

  .title-container {
    @apply flex space-x-1 items-center mb-2;

    .title {
      @apply flex-grow truncate space-x-2 text-gray-800 hover:underline;
    }

    .information {
      @apply flex items-center space-x-1;

      .stars {
        @apply flex items-center space-x-1;
      }
    }
  }

  .description {
    @apply text-sm text-gray-500;
  }
}
</style>
