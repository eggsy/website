<template>
  <div class="flex flex-wrap space-x-4">
    <SmartLink
      v-for="(social, index) in getLinks"
      :key="`social-${index}`"
      :title="social.title"
      :href="social.url"
      :utm="false"
      blank
    >
      <icon :name="social.icon" />
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
      const { social } = this.$config

      const titles = {
        discord: "Join my Discord server!",
        twitter: "Follow me on Twitter!",
        github: "Follow me on GitHub!",
        instagram: "Follow me on Instagram!",
        trello: "View my Trello board!",
      }

      const array = []

      for (const item in social) {
        array.push({
          url: social[item],
          title: titles[item] || `Visit ${item}!`,
          icon: item,
        })
      }

      return array
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  @apply rounded-full ring-transparent ring-[6px] hover:(bg-gray-200 ring-gray-200) dark:(hover:bg-gray-700 hover:ring-gray-700);
}

.svg-icon {
  @apply w-8 h-8 text-gray-800 dark:text-gray-200;
}
</style>
