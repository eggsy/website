<script setup lang="ts">
import type { Repository } from "~/types/Response/GitHub"

const { $prepareMeta } = useNuxtApp()

const { data: repos, status } = await useLazyAsyncData(
  "repos",
  async () => {
    const filter = ["eggsy", "DBM", "eggsywashere.github.io"]

    const repos = await $fetch<Repository[]>(
      "https://api.github.com/users/eggsy/repos?per_page=100",
    )

    return repos
      ?.filter((repo) => repo.fork === false && !filter.includes(repo.name))
      ?.sort((a, b) => b?.stargazers_count - a?.stargazers_count)
  },
  {
    server: false,
  },
)

useHead({
  title: "GitHub Repositories",
  meta: $prepareMeta({
    title: "GitHub Repositories",
    description: "My open-source projects' GitHub repositories.",
  }),
})
</script>

<template>
  <PageLayout title="Repositories" description="My public projects on GitHub.">
    <div v-if="status === 'pending'" class="grid gap-4 md:grid-cols-2">
      <SkeletonLoader v-for="i in 9" :key="`skeleton-${i}`" type="repository" />
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2">
      <SmartLink
        v-for="(repo, index) in repos"
        :key="`repo-${index}`"
        :href="repo.html_url"
        blank
      >
        <CardRepository
          :name="repo.name"
          :language="repo.language"
          :stars="repo.stargazers_count"
          :description="repo.description"
          :license="repo.license && repo.license.spdx_id"
          :top="index === 0"
          class="h-full"
        />
      </SmartLink>
    </div>
  </PageLayout>
</template>
