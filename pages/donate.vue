<script setup lang="ts">
import type { ISponsor } from "~/types/Response/Sponsors"

const { $config, $prepareMeta } = useNuxtApp()

const {
  status,
  error,
  data: sponsors,
} = await useLazyAsyncData<ISponsor[]>(
  "sponsors",
  () =>
    $fetch(
      "https://raw.githubusercontent.com/eggsy/.github/main/sponsors.json",
      {
        responseType: "json",
      },
    ),
  {
    server: false,
  },
)

useHead({
  title: "Donate",
  meta: $prepareMeta({
    title: "Donate",
    description:
      "Like my projects? You can donate to me to boost my performance and help me create more, better projects in the future!",
    keywords: "donate",
    url: "https://eggsy.xyz/donate",
  }),
  link: [
    {
      rel: "canonical",
      href: "https://eggsy.xyz/donate",
    },
  ],
})

const sortByPrice = (a: ISponsor, b: ISponsor) =>
  b.monthlyDollars - a.monthlyDollars

const getSortedSponsors = computed(() => {
  return {
    oneTime:
      sponsors.value
        ?.filter?.((sponsor) => sponsor.isOneTime)
        .sort(sortByPrice) || [],
    monthly:
      sponsors.value
        ?.filter?.((sponsor) => !sponsor.isOneTime)
        .sort(sortByPrice) || [],
  }
})
</script>

<template>
  <PageLayout
    title="Donate"
    description="If you like my projects and/or what I do and you want to contribute, make me happy, you can donate to me with the information on this page! Thank you ♥"
    class="space-y-12"
  >
    <section class="space-y-4">
      <PageTitle>Support Me On</PageTitle>

      <div class="flex flex-wrap gap-x-4 gap-y-2">
        <Button
          v-if="$config.public?.sponsor?.github"
          :href="$config.public.sponsor.github"
          blank
        >
          <template #icon>
            <Icon name="mdi:github" class="h-5 w-5" />
          </template>

          GitHub Sponsors
        </Button>
      </div>
    </section>

    <section class="space-y-4">
      <PageTitle :padding="false">Sponsors</PageTitle>

      <div>
        <Transition name="fade" mode="out-in">
          <Icon
            v-if="status === 'pending'"
            name="svg-spinners:90-ring-with-bg"
            class="w-5 h-5"
          />

          <p v-else-if="error">An error occured.</p>
          <p
            v-else-if="!error && (!sponsors || (sponsors ?? [])?.length === 0)"
          >
            No sponsors yet :(
          </p>

          <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <CardSponsor
              v-for="(item, index) in getSortedSponsors.monthly"
              :key="`sponsor-monthly-${index}`"
              :sponsor="item.sponsor"
              monthly
            />

            <CardSponsor
              v-for="(item, index) in getSortedSponsors.oneTime"
              :key="`sponsor-oneTime-${index}`"
              :sponsor="item.sponsor"
            />
          </div>
        </Transition>
      </div>
    </section>
  </PageLayout>
</template>
