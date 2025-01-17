<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  description: "",
})

const { $prepareMeta } = useNuxtApp()

const pages = [
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
]

useHead(() => {
  const title = "PreMiD"
  const image = "https://i.imgur.com/CuVtvKW.png"
  const description =
    "Custom tools created for your PreMiD experience! Featuring Custom Status and Metadata Creator for free and fresh UI!"

  return {
    title,
    meta: $prepareMeta({
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
})
</script>

<template>
  <PageLayout
    title="PreMiD"
    description="PreMiD is a simple, configurable utility that allows you to show what
          you're doing on the web in your Discord now playing status."
    class="space-y-12"
  >
    <section class="grid gap-4 sm:grid-cols-2">
      <Card
        v-for="(page, index) in pages"
        :key="`page-${index}`"
        :title="page.title"
        :href="page.url"
      >
        <span class="text-black opacity-50 dark:text-white dark:opacity-30">
          {{ page.description }}
        </span>
      </Card>
    </section>

    <section class="space-y-4">
      <Button href="https://premid.app" blank>
        <template #icon>
          <Icon
            name="mdi:link"
            class="h-6 w-6 text-gray-700 dark:text-neutral-300"
          />
        </template>

        Visit PreMiD
      </Button>
    </section>
  </PageLayout>
</template>
