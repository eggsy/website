<template>
  <div>
    <div class="dark:text-gray-200">
      <icon :name="icon" />
    </div>

    <span
      :title="title"
      class="text-sm font-semibold text-gray-700 dark:text-gray-300"
      >{{ title }}</span
    >
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
      required: false,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  @apply truncate text-center;

  .svg-ico {
    @apply w-16 h-16 mx-auto;
  }
}
</style>
