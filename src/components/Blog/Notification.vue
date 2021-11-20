<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    type: {
      type: String,
      required: false,
      default: "information",
    },
  },
})
</script>

<template>
  <div class="notification" :class="type">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.notification {
  @apply space-y-2 border-l-4 p-4 dark:text-gray-100;

  /* Background colors for types */
  &.information {
    @apply bg-blue-600 border-blue-500 text-blue-700;

    p,
    p strong {
      @apply text-blue-700;
    }
  }

  &.warning {
    @apply bg-yellow-500 border-yellow-500 text-yellow-700;

    p,
    p strong {
      @apply text-yellow-700;
    }
  }

  &.danger {
    @apply bg-red-500 border-red-500 text-red-700;

    p,
    p strong {
      @apply text-red-700;
    }
  }

  &.success {
    @apply bg-green-500 border-green-500 text-green-700;

    p,
    p strong {
      @apply text-green-700;
    }
  }

  &.information,
  &.warning,
  &.danger,
  &.success {
    @apply bg-opacity-25 dark:text-gray-100;

    p,
    p strong {
      @apply dark:text-gray-100;
    }
  }

  /* Other stlings */
  a {
    @apply font-medium text-blue-500 hover:underline;
  }
}
</style>
