<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { IsInsideMe } from "~/@types/runtimeConfig"

export default Vue.extend({
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
     * @returns {IsInsideMe}
     */
    getLink(): IsInsideMe {
      return this.$config.links.isInsideMe
    },
  },
})
</script>

<template>
  <div class="space-y-6 py-6">
    <div class="space-y-8 text-gray-500 sm:w-9/12 dark:text-neutral-600">
      <header class="space-y-2 my-12 px-4">
        <h1 class="text-gray-700 text-4xl dark:text-neutral-300">
          is-inside.me
        </h1>

        <p>
          Website that was created by me and Tresmos. Free sign up file service.
          Upload images, videos, files and more!
          <SmartLink href="https://getsharex.com/" class="underline" blank
            >ShareX</SmartLink
          >
          (Windows),
          <SmartLink
            href="https://github.com/ArsenArsen/KShare/"
            class="underline"
            blank
            >KShare</SmartLink
          >
          (Linux) and
          <SmartLink href="https://magiccap.me/" class="underline" blank
            >MagicCap</SmartLink
          >
          (Linux, Mac) compatible!
        </p>

        <BlogNotification type="warning">
          This project is now discontinued, it has retired after 3 years of
          service and will no longer accept new users. Thank you for being with
          us all this time.
        </BlogNotification>
      </header>

      <div class="flex flex-wrap space-x-4 px-4">
        <SmartImage
          src="https://i.vgy.me/iXYvCp.jpg"
          height="150"
          width="150"
          class="rounded-md"
        />

        <SmartImage
          src="https://i.vgy.me/zEQpUG.jpg"
          height="150"
          width="150"
          class="rounded-md"
        />
      </div>

      <div class="space-y-2 items-center sm:(flex space-x-2 space-y-0) ">
        <Button :href="getLink.website" icon="IconLink" blank>
          Visit Website
        </Button>

        <Button :href="getLink.website" icon="IconQuestion" blank>
          View FAQ
        </Button>
      </div>
    </div>
  </div>
</template>
