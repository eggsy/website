<template>
  <div class="space-y-1">
    <div class="w-16 h-16 mx-auto relative">
      <div
        class="absolute -right-2 -top-2 text-gray-100 bg-green-600 shadow-lg rounded-full w-8 h-8 font-bold flex justify-center items-center"
      >
        {{ level }}
      </div>

      <icon :name="icon" />
    </div>

    <div class="text-gray-700 dark:text-gray-300 font-semibold text-center">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.svg-ico {
  @apply w-16 h-16 rounded-md;
}
</style>
