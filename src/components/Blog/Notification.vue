<template>
  <div class="notification" :class="type">
    <slot />
  </div>
</template>

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

<style lang="scss" scoped>
.notification {
  @apply p-4 space-y-2 border-l-4 dark:text-gray-100;

  /* Background colors for types */
  &.information {
    @apply border-blue-500 bg-blue-600 text-blue-700;

    p,
    p strong {
      @apply text-blue-700;
    }
  }

  &.warning {
    @apply border-yellow-500 bg-yellow-500 text-yellow-700;

    p,
    p strong {
      @apply text-yellow-700;
    }
  }

  &.danger {
    @apply border-red-500 bg-red-500 text-red-700;

    p,
    p strong {
      @apply text-red-700;
    }
  }

  &.success {
    @apply border-green-500 bg-green-500 text-green-700;

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
    @apply text-blue-500 font-medium hover:underline;
  }
}
</style>
