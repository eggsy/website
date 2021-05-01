<template>
  <div class="flex flex-wrap space-x-4">
    <SmartLink
      v-for="key in Object.keys(getLinks)"
      :key="key"
      :href="getLinks[key]"
      :utm="false"
      blank
    >
      <icon :name="key" />
    </SmartLink>
  </div>
</template>

<script>
export default {
  computed: {
    /**
     * Returns social links in public runtime config.
     * @returns {object}
     */
    getLinks() {
      return this.$config.social
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  @apply rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ring-transparent ring-[6px] hover:ring-gray-200 dark:hover:ring-gray-700;
}

.svg-icon {
  @apply w-8 h-8 text-gray-800 dark:text-gray-200;
}
</style>
