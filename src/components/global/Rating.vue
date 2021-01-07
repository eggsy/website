<template>
  <div class="rating">
    <div class="number">{{ rating }}/{{ max }}</div>

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
  },
}
</script>

<style lang="scss" scoped>
.rating {
  @apply flex items-center space-x-2;

  .number {
    @apply w-16 px-2 py-px font-semibold text-center text-gray-100 bg-red-600 rounded-md select-none hover:bg-red-700;
  }

  a {
    @apply hover:underline;
  }
}
</style>
