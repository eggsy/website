<template>
  <div class="pt-6">
    <div v-if="getFilteredPosts === false">
      <h3
        class="font-semibold space-x-2 text-lg text-gray-900 dark:text-gray-100"
      >
        Son gönderiler
      </h3>

      <div class="mt-2 grid gap-2 md:grid-cols-3">
        <template v-if="isFetchPending">
          <SkeletonLoader v-for="i in 3" :key="i" type="repository" />
        </template>

        <template v-else>
          <CardPost
            v-for="(post, index) in posts.latest"
            :key="`latest-${index}`"
            :post="post"
          />
        </template>
      </div>

      <div class="mt-14 grid gap-14 md:(gap-4 grid-cols-2)">
        <div class="flex flex-col space-y-2 overflow-x-hidden md:overflow-visible">
          <SmartLink
            :href="{
              name: 'blog',
              query: {
                etiket: 'discord',
              },
            }"
            title="Discord etiketli gönderileri gör"
            class="flex space-x-2 text-gray-900 items-center dark:text-gray-100"
          >
            <IconBrand brand="discord" class="h-6 w-6" />
            <h3 class="font-semibold text-lg">Discord</h3>
          </SmartLink>

          <template v-if="isFetchPending">
            <SkeletonLoader v-for="i in 3" :key="i" type="repository" />
          </template>

          <template v-else>
            <CardPost
              v-for="(post, index) in posts.discord"
              :key="`discord-${index}`"
              :post="post"
              type="text"
            />
          </template>
        </div>

        <div class="flex flex-col space-y-2 overflow-x-hidden md:overflow-visible">
          <SmartLink
            :href="{
              name: 'blog',
              query: {
                etiket: 'linux',
              },
            }"
            title="Linux etiketli gönderileri gör"
            class="flex space-x-2 text-gray-900 items-center dark:text-gray-100"
          >
            <IconDev brand="linux" class="h-6 w-6" />
            <h3 class="font-semibold text-lg">Linux</h3>
          </SmartLink>

          <template v-if="isFetchPending">
            <SkeletonLoader v-for="i in 3" :key="i" type="repository" />
          </template>

          <template v-else>
            <CardPost
              v-for="(post, index) in posts.linux"
              :key="`linux-${index}`"
              :post="post"
              type="text"
            />
          </template>
        </div>
      </div>

      <div class="mt-16">
        <h3
          class="font-semibold space-x-2 text-lg text-gray-900 dark:text-gray-100"
        >
          Diğer gönderiler
        </h3>

        <div class="mt-4 grid gap-3 md:grid-cols-3">
          <template v-if="isFetchPending">
            <SkeletonLoader v-for="i in 18" :key="i" type="repository" />
          </template>

          <template v-else>
            <CardPost
              v-for="(post, index) in getPaginatedPosts"
              :key="`linux-${index}`"
              :post="post"
              type="text-only-title"
            />
          </template>
        </div>

        <div class="flex flex-wrap space-x-2 mt-4 items-center justify-center">
          <div
            v-for="page in getTotalPages"
            :key="`pagination-${page}`"
            class="rounded-full cursor-pointer flex font-medium bg-gray-200 h-10 ring-1 ring-gray-300 text-gray-900 w-10 items-center justify-center select-none dark:(bg-gray-800
              ring-gray-800
              text-gray-100
              hover:bg-gray-700) hover:bg-gray-300"
            :class="{
              'bg-gray-300 dark:bg-gray-700': pagination + 1 === page,
            }"
            @click="pagination = page - 1"
          >
            {{ page }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="
        typeof getFilteredPosts === 'object' && getFilteredPosts.length > 0
      "
    >
      <div v-if="getFilteredPosts.length === 0" class="space-y-4">
        <h2
          class="font-semibold text-2xl text-gray-900 md:text-4xl dark:text-gray-100"
        >
          Aramanıza uygun herhangi bir gönderi bulunamadı.
        </h2>

        <div class="md:w-4/6">
          <h3 class="text-lg text-gray-900 dark:text-gray-100">
            Deneyebileceğiniz yöntemler:
          </h3>

          <ul class="list-disc pl-4 text-gray-700 dark:text-gray-300">
            <li>Aramanızda anahtar kelimeler kullanmayı deneyin.</li>
            <li>Etiketler kullanmayı deneyin.</li>
            <li>
              Gönderinin başlığında veya açıklamasında olan kelimelerle arama
              yapmayı deneyin.
            </li>
          </ul>
        </div>

        <SmartLink
          :href="{ name: 'blog' }"
          class="rounded flex space-x-2 bg-gray-100 py-2 px-4 ring-1 ring-gray-200 text-gray-900 items-center justify-center md:w-max dark:(bg-gray-800
            ring-gray-700
            text-gray-100
            hover:bg-gray-700) hover:bg-gray-200"
        >
          <IconHome class="h-6 w-6" />
          <span>Bloga Dön</span>
        </SmartLink>
      </div>

      <div v-else class="space-y-2">
        <CardPost
          v-for="(post, index) in getFilteredPosts"
          :key="`linux-${index}`"
          :post="post"
          type="text"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

/* Interfaces */
import { Post } from "@/types/Post"

export default Vue.extend({
  data() {
    return {
      query: this.$route.query,
      pagination: 0,
      posts: {
        latest: [] as Post[],
        discord: [] as Post[],
        linux: [] as Post[],
        rest: [] as Post[],
      },
    }
  },
  async fetch() {
    const latestPosts = await this.$content()
      .sortBy("createdAt", "desc")
      .limit(3)
      .without(["body"])
      .fetch()

    const discordPosts = await this.$content()
      .where({ tags: { $contains: "discord" } })
      .sortBy("createdAt", "desc")
      .limit(3)
      .without(["body"])
      .fetch()

    const linuxPosts = await this.$content()
      .where({ tags: { $contains: "linux" } })
      .sortBy("createdAt", "desc")
      .limit(3)
      .without(["body"])
      .fetch()

    const allPosts = await this.$content()
      .sortBy("createdAt", "desc")
      .skip(3)
      .without(["body"])
      .fetch()

    this.posts = {
      latest: latestPosts || [],
      discord: discordPosts || [],
      linux: linuxPosts || [],
      rest: allPosts || [],
    }
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
    /**
     * Checks if fetch state is pending or error.
     * @returns {boolean}
     */
    isFetchPending(): boolean {
      return this.$fetchState?.pending || this.$fetchState.error
    },
    /**
     * Filters posts with a query variable.
     * @returns {boolean|Post[]} False if no query set, filtered posts array if there are results.
     */
    getFilteredPosts(): boolean | Post[] {
      let { q, search, query, ara, sorgu, etiket } = this.query as Record<
        string,
        string
      >

      if (!q && !search && !query && !ara && !sorgu && !etiket) return false

      q = q?.toLowerCase()
      search = search?.toLowerCase()
      query = query?.toLowerCase()
      ara = ara?.toLowerCase()
      sorgu = sorgu?.toLowerCase()
      etiket = etiket?.toLowerCase()

      const { latest, discord, linux, rest } = this.posts
      const allPosts = [...latest, ...discord, ...linux, ...rest]

      if (etiket)
        return allPosts.filter(
          (post) =>
            post.tags?.filter((tag) =>
              tag?.toLowerCase()?.includes(etiket || "")
            )?.length
        )
      else {
        const filteredPosts = allPosts.filter(
          (post) =>
            post.title
              ?.toLowerCase()
              ?.includes(q || search || query || ara || sorgu || "") ||
            post.description
              ?.toLowerCase()
              ?.includes(q || search || query || ara || sorgu || "")
        )

        console.log([...new Map(filteredPosts.map(item => [item.title, item])).values()])
        return [...new Map(filteredPosts.map(item => [item.title, item])).values()]
      }
    },
    /**
     * Returns the number of pages for the posts.
     * @returns {number} Page amount.
     */
    getTotalPages(): number {
      return Math.ceil(this.posts?.rest?.length / 15)
    },
    /**
     * Returns paginated, sliced posts.
     * @returns {Post[]} The posts array.
     */
    getPaginatedPosts(): Post[] {
      const sliceStart = this.pagination * 15
      const sliceEnd = sliceStart + 15

      return this.posts.rest.slice(sliceStart, sliceEnd)
    },
  },
  watch: {
    "$route.query": "setQuery",
  },
  mounted() {
    this.setQuery()
  },
  methods: {
    /**
     * Updates the query variable in Vue data from Vue Router.
     */
    setQuery() {
      this.query = this.$route.query
    },
  },
})
</script>
