<template>
  <div class="py-6 space-y-6">
    <div class="space-y-4 sm:w-9/12">
      <header class="space-y-2">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          is-inside.me
        </h2>

        <p class="text-gray-800 dark:text-gray-200">
          Website that was created by me and Tresmos. It is a custom uploader
          which everyone can signup for free and start uploading their images,
          videos or files! You can set and start using is-inside.me with desktop
          apps like
          <a
            href="https://getsharex.com/?utm_source=eggsy.xyz"
            class="font-medium hover:underline"
            rel="noreferrer"
            target="_blank"
            >ShareX</a
          >
          (Windows),
          <a
            href="https://github.com/ArsenArsen/KShare/?utm_source=eggsy.xyz"
            class="font-medium hover:underline"
            rel="noreferrer"
            target="_blank"
            >KShare</a
          >
          (Linux),
          <a
            href="https://magiccap.me/?utm_source=eggsy.xyz"
            class="font-medium hover:underline"
            rel="noreferrer"
            target="_blank"
            >MagicCap</a
          >
          (Linux, Mac) or your favourite screen capturing tool that supports
          custom uploaders!
        </p>
      </header>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <CardProject image="https://i.vgy.me/iXYvCp.jpg" />
        <CardProject image="https://i.vgy.me/zEQpUG.jpg" />
      </div>

      <div class="items-center space-y-2 sm:flex sm:space-x-2 sm:space-y-0">
        <a
          :href="getLink.website"
          target="_blank"
          rel="noreferrer"
          class="button"
        >
          <icon name="link" class="w-6 h-6" />
          <span>Visit Website</span>
        </a>

        <a :href="getLink.faq" target="_blank" rel="noreferrer" class="button">
          <icon name="question-circle" class="w-6 h-6" />
          <span>View FAQ</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    const title = "is-inside.me"
    const description =
      "Free to use file service for ShareX, KShare and MagicCap-like apps! Create an account and get started!"

    return {
      title,
      meta: this.$prepareMeta({
        title,
        description,
        keywords: "is-inside.me",
        url: "https://eggsy.xyz/projects/is-inside-me",
      }),
      link: [
        {
          rel: "canonical",
          href: "https://eggsy.xyz/projects/is-inside-me",
        },
      ],
    }
  },
  computed: {
    /**
     * Returns the project link from runtime config.
     * @returns {{website: string, faq: string}}
     */
    getLink() {
      return this.$config.links.isInsideMe
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  @apply flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 bg-gray-100 rounded ring-1 ring-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:ring-gray-700 sm:w-max dark:text-gray-100;
}
</style>
