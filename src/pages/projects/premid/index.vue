<template>
  <div class="py-4">
    <div class="space-y-6 sm:w-9/12">
      <header class="space-y-4">
        <div class="space-y-1">
          <h1
            class="text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-gray-100"
          >
            PreMiD
          </h1>

          <div class="space-y-2">
            <p class="text-gray-800 dark:text-gray-200">
              Welcome to the landing page of my PreMiD tools! From here, you can
              access the tools that I've created for PreMiD for free. If you
              like my work, please consider following me on social media and
              <nuxt-link :to="{ name: 'donate' }" class="font-medium underline"
                >donate</nuxt-link
              >
              if you liked my work.
            </p>
            <p class="text-gray-800 dark:text-gray-200">
              PreMiD is a simple, configurable utility that allows you to show
              what you're doing on the web in your Discord now playing status.
            </p>
          </div>
        </div>
      </header>

      <section class="grid gap-4 sm:grid-cols-2">
        <nuxt-link
          v-for="(page, index) in pages"
          :key="`page-${index}`"
          :to="page.url"
        >
          <CardProject :title="page.title" :description="page.description" />
        </nuxt-link>
      </section>

      <section class="space-y-4">
        <a
          href="https://premid.app/?utm_source=eggsy.xyz"
          target="_blank"
          rel="noreferrer"
          class="flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 bg-gray-100 rounded ring-1 ring-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:ring-gray-700 sm:w-max dark:text-gray-100"
        >
          <icon name="premid" class="w-6 h-6" />
          <span>Visit PreMiD</span>
        </a>
      </section>
    </div>
  </div>
</template>

<script>
export default {
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
    const image = "https://i.vgy.me/NZdome.png"
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
}
</script>
