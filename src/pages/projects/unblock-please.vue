<template>
  <div class="py-6 space-y-6">
    <div class="space-y-4 sm:w-9/12">
      <header class="space-y-2">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Unblock Please
        </h2>

        <p class="text-gray-800 dark:text-gray-200">
          Free to use Chrome extension to unblock Imgur and Pastebin. Some
          countries or ISPs block access to these services but these both
          services are the leaders of their concepts. You are most likely to
          face with an Imgur or Pastebin link but can't open it because it is
          blocked. With Unblock Please, you can
          <i>legally</i> access these two services easily!
        </p>
      </header>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <CardProject image="https://i.vgy.me/OIMc81.png" />

        <CardProject
          image="https://i.vgy.me/Lw6rn5.png"
          class="hidden sm:block"
        />

        <CardProject image="https://i.vgy.me/X10Uid.png" />
      </div>
    </div>

    <div class="items-center space-y-2 sm:flex sm:space-x-2 sm:space-y-0">
      <a
        :href="getLink.webstore"
        target="_blank"
        rel="noreferrer"
        class="button"
      >
        <icon name="inbox-in" class="w-6 h-6" />
        <span>Install to Chrome</span>
      </a>

      <a :href="getLink.github" target="_blank" rel="noreferrer" class="button">
        <icon name="github" class="w-6 h-6" />
        <span>Source Code</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    const title = "Unblock Please"
    const description =
      "Free to use Chrome extension to unblock Imgur and Pastebin using custom and secure proxies!"

    return {
      title,
      meta: this.$prepareMeta({
        title,
        description,
        keywords: "unblock please",
        url: "https://eggsy.xyz/projects/is-inside-me",
      }),
      link: [
        {
          rel: "canonical",
          href: "https://eggsy.xyz/projects/unblock-please",
        },
      ],
    }
  },
  computed: {
    /**
     * Returns the project link from runtime config.
     * @returns {string}
     */
    getLink() {
      return this.$config.links.unblockPlease
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  @apply flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 bg-gray-100 rounded ring-1 ring-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:ring-gray-700 sm:w-max dark:text-gray-100;
}
</style>
