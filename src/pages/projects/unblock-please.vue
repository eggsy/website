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
  <PageLayout
    title="Unblock Please"
    description="Free to use Chrome extension to unblock Imgur and Pastebin bans by
          ISPs, countries, etc."
    class="space-y-12"
  >
    <div class="flex gap-4">
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

    <div class="space-y-2 items-center sm:(flex space-x-2 space-y-0)">
      <Button :href="getLink.webstore" icon="IconInbox" blank>
        Install to Chrome
      </Button>

      <Button :href="getLink.github" blank>
        <template #icon>
          <IconBrand brand="github" class="h-6 w-6" />
        </template>

        Source Code
      </Button>
    </div>
  </PageLayout>
</template>
