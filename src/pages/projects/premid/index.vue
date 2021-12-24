<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      pages: [
        {
          title: "Custom Status",
          url: "/projects/premid/custom-status",
          description:
            "Tool that allows you do display whatever you want on your Discord profile with PreMiD! Easy and free!",
        },
        {
          title: "Metadata Creator",
          url: "/projects/premid/mdcreator",
          description:
            "Easy and free to use tool to create PreMiD Presence metadata files easily, without even opening your code editor!",
        },
      ],
    }
  },
  head() {
    const title = "PreMiD"
    const image = "https://i.imgur.com/CuVtvKW.png"
    const description =
      "Custom tools created for your PreMiD experience! Featuring Custom Status and Metadata Creator for free and fresh UI!"

    return {
      title,
      meta: this.$prepareMeta({
        title,
        description,
        image,
        keywords: "premid, custom, status",
        url: "https://eggsy.xyz/projects/premid",
      }),
      link: [
        {
          rel: "canonical",
          href: "https://eggsy.xyz/projects/premid",
        },
      ],
    }
  },
})
</script>

<template>
  <div class="py-4">
    <div class="space-y-6 text-gray-500 sm:w-9/12 dark:text-neutral-700">
      <header class="space-y-2 my-12">
        <h1 class="text-gray-700 text-4xl dark:text-neutral-300">PreMiD</h1>

        <p>
          PreMiD is a simple, configurable utility that allows you to show what
          you're doing on the web in your Discord now playing status.
        </p>
      </header>

      <section class="grid gap-4 sm:grid-cols-2">
        <Card
          v-for="(page, index) in pages"
          :key="`page-${index}`"
          :title="page.title"
          :href="page.url"
        >
          {{ page.description }}
        </Card>
      </section>

      <section class="space-y-4">
        <Button href="https://premid.app" blank>
          <template #icon>
            <IconDev
              brand="premid"
              class="h-6 text-gray-700 w-6 dark:text-neutral-300"
            />
          </template>

          Visit PreMiD
        </Button>
      </section>
    </div>
  </div>
</template>
