<template>
  <div class="space-y-6 py-6">
    <div class="space-y-4 sm:w-9/12">
      <header class="space-y-2">
        <h2 class="font-bold text-2xl text-gray-900 dark:text-gray-100">
          is-inside.me
        </h2>

        <p class="text-gray-800 dark:text-gray-200">
          Website that was created by me and Tresmos. It is a custom uploader
          which everyone can signup for free and start uploading their images,
          videos or files! You can set and start using is-inside.me with desktop
          apps like
          <SmartLink
            href="https://getsharex.com/"
            class="font-medium hover:underline"
            blank
            >ShareX</SmartLink
          >
          (Windows),
          <SmartLink
            href="https://github.com/ArsenArsen/KShare/"
            class="font-medium hover:underline"
            blank
            >KShare</SmartLink
          >
          (Linux),
          <SmartLink
            href="https://magiccap.me/"
            class="font-medium hover:underline"
            blank
            >MagicCap</SmartLink
          >
          (Linux, Mac) or your favourite screen capturing tool that supports
          custom uploaders!
        </p>
      </header>

      <div class="flex flex-wrap space-x-4">
        <SmartImage
          src="https://i.vgy.me/iXYvCp.jpg"
          height="150"
          width="150"
          class="rounded-md ring-2 ring-gray-200 dark:ring-gray-800"
        />

        <SmartImage
          src="https://i.vgy.me/zEQpUG.jpg"
          height="150"
          width="150"
          class="rounded-md ring-2 ring-gray-200 dark:ring-gray-800"
        />
      </div>

      <div class="space-y-2 items-center sm:(flex space-x-2 space-y-0)">
        <SmartLink :href="getLink.website" class="button" blank>
          <icon name="link" class="h-6 w-6" />
          <span>Visit Website</span>
        </SmartLink>

        <SmartLink :href="getLink.faq" class="button" blank>
          <icon name="question-circle" class="h-6 w-6" />
          <span>View FAQ</span>
        </SmartLink>
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
  @apply flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 bg-gray-100 rounded ring-1 ring-gray-200 dark:(ring-gray-700 bg-gray-800 text-gray-100 hover:bg-gray-700) hover:bg-gray-200 sm:w-max;
}
</style>
