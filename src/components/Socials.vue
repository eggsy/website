<script lang="ts">
import Vue from "vue"

/* Interfaces */
interface Link {
  url: string
  title: string
  icon: string
}

export default Vue.extend({
  data() {
    return {
      pageLoaded: false,
    }
  },
  mounted() {
    this.pageLoaded = true
  },
  computed: {
    /**
     * Returns social links in public runtime config.
     * @returns {Link[]}
     */
    getLinks(): Link[] {
      const social = this.$config.social

      const titles = {
        discord: "Join my Discord server!",
        twitter: "Follow me on Twitter!",
        github: "Follow me on GitHub!",
        instagram: "Follow me on Instagram!",
        trello: "View my Trello board!",
      }

      const array: Link[] = []

      for (const item in social) {
        if (item === "email") continue

        array.push({
          // @ts-ignore-next-line
          url: social[item],
          // @ts-ignore-next-line
          title: titles[item] || `Visit ${item}!`,
          icon: item,
        })
      }

      return array
    },
  },
})
</script>

<template>
  <div class="flex flex-wrap space-x-4">
    <SmartLink
      v-for="(social, index) in getLinks"
      :key="`social-${index}`"
      :title="social.title"
      :href="social.url"
      :utm="false"
      blank
      class="
        rounded-full
        ring-transparent ring-[6px]
        dark:(hover:bg-gray-700
        hover:ring-gray-700)
        hover:(bg-gray-200
        ring-gray-200)
        "
    >
      <IconBrand
        :brand="social.icon"
        class="h-8 text-gray-800 w-8 dark:text-gray-200"
      />
    </SmartLink>

    <SmartLink
      title="Send me an e-mail!"
      :href="pageLoaded ? `mailto:${$config.social.email}` : false"
      :utm="false"
    >
      <IconAt class="h-8 text-gray-800 w-8 dark:text-gray-200" />
    </SmartLink>
  </div>
</template>
