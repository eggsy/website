<template>
  <div class="flex flex-wrap justify-center space-x-2">
    <!-- Discord -->
    <a
      :href="getLinks.discord"
      target="_blank"
      rel="noreferrer"
      title="Join my Discord server!"
    >
      <icon name="discord" />
    </a>

    <!-- Twitter -->
    <a
      :href="getLinks.twitter"
      target="_blank"
      rel="noreferrer"
      title="Follow me on Twitter!"
    >
      <icon name="twitter" />
    </a>

    <!-- GitHub -->
    <a
      :href="getLinks.github"
      target="_blank"
      rel="noreferrer"
      title="Follow me on GitHub!"
    >
      <icon name="github" />
    </a>

    <!-- Instagram -->
    <a
      :href="getLinks.instagram"
      target="_blank"
      rel="noreferrer"
      title="Follow me on Instagram!"
    >
      <icon name="instagram" />
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

.svg-icon {
  @apply w-12 h-12 dark:text-gray-300;
}
</style>
