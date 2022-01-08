<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    type: {
      type: String,
      required: false,
      default: "information",
    },
    title: {
      type: String,
      required: false,
      default: "",
    }
  },
})
</script>

<template>
  <div class="notification" :class="type">
    <h1 v-if="title">{{ title }}</h1>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.notification {
  @apply rounded-md space-y-2 border-l-4 p-4 dark:text-gray-100;

  h1 {
    @apply font-semibold text-lg hover:no-underline;
  }

  /* Background colors for types */
  &.information {
    @apply bg-blue-600 border-blue-500 text-blue-500;

    h1 {
      @apply text-blue-600;
    }

    p,
    p strong {
      @apply text-blue-500 dark:text-blue-400;
    }
  }

  &.warning {
    @apply bg-yellow-500 border-yellow-500 text-yellow-500;

    h1 {
      @apply text-yellow-600;
    }

    p,
    p strong {
      @apply text-yellow-500 dark:text-yellow-400;
    }
  }

  &.danger {
    @apply bg-red-500 border-red-500 text-red-500;

    h1 {
      @apply text-red-600;
    }

    p,
    p strong {
      @apply text-red-500 dark:text-red-400;
    }
  }

  &.success {
    @apply bg-green-500 border-green-500 text-green-500;

    h1 {
      @apply text-green-600;
    }

    p,
    p strong {
      @apply text-green-500 dark:text-green-400;
    }
  }

  &.information,
  &.warning,
  &.danger,
  &.success {
    @apply bg-opacity-25 dark:text-gray-100;
  }

  /* Other stlings */
  a {
    @apply font-medium text-current underline hover:underline;
  }
}
</style>
