<template>
  <div class="flex flex-wrap justify-center space-x-2">
    <!-- Discord -->
    <a
      :href="getLinks.discord"
      target="_blank"
      rel="noreferrer"
      title="Join my Discord server!"
    >
      <icon name="discord" class="dark:text-gray-300 h-12 w-12" />
    </a>

    <!-- Twitter -->
    <a
      :href="getLinks.twitter"
      target="_blank"
      rel="noreferrer"
      title="Follow me on Twitter!"
    >
      <icon name="twitter" class="dark:text-gray-300 h-12 w-12" />
    </a>

    <!-- GitHub -->
    <a
      :href="getLinks.github"
      target="_blank"
      rel="noreferrer"
      title="Follow me on GitHub!"
    >
      <icon name="github" class="dark:text-gray-300 h-12 w-12" />
    </a>

    <!-- Instagram -->
    <a
      :href="getLinks.instagram"
      target="_blank"
      rel="noreferrer"
      title="Follow me on Instagram!"
    >
      <icon name="instagram" class="dark:text-gray-300 h-12 w-12" />
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    getLinks() {
      return this.$config.social
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  @apply transform transition sm:hover:-translate-y-1;
}
</style>
