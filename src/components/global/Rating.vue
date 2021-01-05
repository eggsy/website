<template>
  <div class="rating">
    <div class="number">
      {{ rating }}
    </div>

    <div class="truncate">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
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
}
</style>
