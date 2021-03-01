<template>
  <div class="relative rating">
    <div
      v-if="isnew === true"
      v-tippy="{ content: 'Yeni!' }"
      class="number focus:outline-none animate-pulse new"
    >
      {{ rating }}/{{ max }}
    </div>

    <div v-else class="number">{{ rating }}/{{ max }}</div>

    <div class="truncate">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: [String, Number],
      required: true,
      default: 0,
    },
    max: {
      type: [String, Number],
      required: false,
      default: 10,
    },
    isnew: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.rating {
  @apply flex items-center space-x-2;

  .number {
    @apply w-16 px-2 py-px font-semibold text-center text-gray-100  rounded-md select-none;

    &:not(.new) {
      @apply bg-red-600 hover:bg-red-700;
    }

    &.new {
      @apply bg-blue-800 hover:bg-blue-900;
    }
  }

  a {
    @apply hover:underline;
  }
}
</style>
