<script lang="ts">
import Vue from "vue"

// Import type
import type { Repository } from "~/src/types/Response/GitHub"

export default Vue.extend({
  data() {
    return {
      repos: [] as Repository[],
    }
  },
  fetchOnServer: false,
  async fetch() {
    const filter = ["eggsy", "DBM", "eggsywashere.github.io"]

    const repos: Repository[] = (
      await this.$axios.get(
        "https://api.github.com/users/eggsy/repos?per_page=100"
      )
    ).data

    this.repos = repos
      ?.filter((repo) => repo.fork === false && !filter.includes(repo.name))
      ?.sort((a, b) => b?.stargazers_count - a?.stargazers_count)
  },
  head() {
    const title = "GitHub Repositories"
    const description = "My public projects hosted on GitHub."

    return {
      title,
      meta: this.$prepareMeta({
        title,
        description,
      }),
    }
  },
})
</script>

<template>
  <PageLayout title="Repositories" description="My public projects on GitHub.">
    <div v-if="$fetchState.pending === true" class="grid gap-4 md:grid-cols-2">
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
