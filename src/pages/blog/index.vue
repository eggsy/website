<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { Post } from "@/types/Post"
import type { FetchReturn } from "@nuxt/content/types/query-builder"

export default Vue.extend({
  data() {
    return {
      formatter: new Intl.DateTimeFormat("tr-TR", {
        month: "short",
        day: "numeric",
      }),
      query: this.$route.query,
      posts: [] as (Post[] & FetchReturn) | (Post[] & FetchReturn)[],
    }
  },
  async fetch() {
    const posts = await this.$content("blog")
      .sortBy("createdAt", "desc")
      .without(["body"])
      .fetch<Post[]>()

    this.posts = posts
  },
  head() {
    const title = "EGGSY's Blog"
    const description =
      "EGGSY'nin günlük hayattan, tecrübelerinden bahsettiği, göstermek veya anlatmak istediği şeyleri daha düzenli ve profesyonel bir şekilde tuttuğu blog sayfası."

    return {
      title: "Blog",
      meta: this.$prepareMeta({
        title,
        description,
      }),
    }
  },
  computed: {
    isFetchPending() {
      return (
        this.$fetchState?.pending === true && this.$fetchState.error !== null
      )
    },
    getYearGroupedPosts() {
      const yearsOfPosts = new Map() as Map<number, Post[]>

      for (const post of this.posts) {
        if (!post.createdAt) continue
        const year = new Date(post.createdAt).getFullYear()

        if (yearsOfPosts.has(year)) {
          yearsOfPosts.get(year)?.push(post as Post)
        } else {
          yearsOfPosts.set(year, [post as Post])
        }
      }

      const years = [...yearsOfPosts.keys()].sort((a, b) => b - a)
      const sortedByYears = new Map() as Map<number, Post[]>

      for (const year of years) {
        sortedByYears.set(year, yearsOfPosts.get(year)!)
      }

      return sortedByYears
    },
  },
  watch: {
    "$route.query": "setQuery",
  },
  mounted() {
    this.setQuery()
  },
  methods: {
    setQuery() {
      this.query = this.$route.query
    },
  },
})
</script>

<template>
  <div class="pt-12 space-y-10">
    <section
      v-for="[year, posts] in getYearGroupedPosts"
      :key="year"
      class="space-y-4"
    >
      <h1 class="text-3xl font-bold text-black/90 dark:text-white/90">
        {{ year }}
      </h1>

      <div class="space-y-3">
        <NuxtLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="flex items-start gap-6 card-base rounded-lg"
        >
          <span
            class="w-[20%] text-black/50 dark:text-white/50 md:w-1/12 flex-shrink-0"
          >
            {{ formatter.format(new Date(post.createdAt)) }}
          </span>

          <span
            class="text-blue-600 dark:text-blue-300 font-medium leading-relaxed"
          >
            {{ post.title }}
          </span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
