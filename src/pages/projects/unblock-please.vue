<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { UnblockPlease } from "~/@types/runtimeConfig"

export default Vue.extend({
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
     * @returns {UnblockPlease}
     */
    getLink(): UnblockPlease {
      return this.$config.links.unblockPlease
    },
  },
})
</script>

<template>
  <div class="space-y-6 py-6">
    <div class="space-y-4 text-gray-500 sm:w-9/12 dark:text-neutral-600">
      <header class="space-y-2 my-12 px-4">
        <h1 class="text-gray-700 text-4xl dark:text-neutral-300">
          Unblock Please
        </h1>

        <p>
          Free to use Chrome extension to unblock Imgur and Pastebin bans by
          ISPs, countries, etc.
        </p>
      </header>

      <div class="flex px-4 gap-4">
        <SmartImage
          src="https://i.imgur.com/orrLJsI.png"
          class="rounded-md h-32 w-32"
        />

        <SmartImage
          src="https://i.imgur.com/46e28II.png"
          class="rounded-md h-32 w-32"
        />

        <SmartImage
          src="https://i.imgur.com/zwTlbxN.png"
          class="rounded-md h-32 w-32 hidden sm:block"
        />
      </div>
    </div>

    <div class="space-y-2 items-center sm:(flex space-x-2 space-y-0)">
      <Button :href="getLink.webstore" icon="IconInbox" blank>
        <span>Install to Chrome</span>
      </Button>

      <Button :href="getLink.github" blank>
        <template #icon>
          <IconBrand brand="github" class="h-6 w-6" />
        </template>

        <span>Source Code</span>
      </Button>
    </div>
  </div>
</template>
