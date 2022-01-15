<script lang="ts">
import Vue from "vue"

// Interface
interface Link {
  url: string
  title: string
  description: string
  icon: string
}

export default Vue.extend({
  data() {
    return {
      pageLoaded: false,
    }
  },
  head() {
    const title = "Contact"
    const description =
      "Need to get in touch with me? Have any questions? Want to join my Discord server? Click here!"

    return {
      title,
      meta: this.$prepareMeta({
        title,
        description,
      }),
    }
  },
  computed: {
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
          title: item?.[0]?.toUpperCase() + item.slice(1),
          // @ts-ignore-next-line
          description: titles[item],
          icon: item,
        })
      }

      return array
    },
  },
  mounted() {
    this.pageLoaded = true
  },
})
</script>

<template>
  <div class="text-gray-500 dark:text-neutral-600">
    <header class="space-y-2 my-12 px-4">
      <h1 class="text-gray-900 text-4xl dark:text-neutral-300">Contact</h1>
      <p>If you have any questions, feel free to contact me.</p>
    </header>

    <div class="grid gap-4 md:grid-cols-2">
      <Card
        v-for="(contact, index) in getLinks"
        :key="index"
        :title="contact.title"
        :href="contact.url"
        blank
      >
        <template #icon>
          <IconBrand :brand="contact.icon" class="h-8 w-8" />
        </template>

        {{ contact.description }}
      </Card>

      <Card
        title="Email"
        :href="pageLoaded ? `mailto:${$config.social.email}` : false"
        icon="IconAt"
        :utm="false"
      >
        <template #icon>
          <IconAt class="h-8 w-8" />
        </template>

        Send me an email!
      </Card>
    </div>
  </div>
</template>
