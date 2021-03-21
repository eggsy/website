<template>
  <div class="flex flex-wrap space-x-4">
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

    <!-- Trello -->
    <a
      :href="getLinks.trello"
      target="_blank"
      rel="noreferrer"
      title="Visit my Trello board!"
    >
      <icon name="trello" />
    </a>
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
