<template>
  <div class="pt-6">
    <div v-if="getFilteredPosts === false">
      <h3
        class="space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100"
      >
        Son gönderiler
      </h3>

      <div class="grid gap-4 mt-2 sm:grid-cols-2">
        <template v-if="isFetchPending">
          <SkeletonLoader v-for="i in 4" :key="i" type="repository" />
        </template>

        <template v-else>
          <CardPost
            v-for="(post, index) in posts.latest"
            :key="`latest-${index}`"
            :post="post"
          />
        </template>
      </div>

      <div class="grid gap-14 sm:gap-4 sm:grid-cols-2 mt-14">
        <div class="grid grid-cols-1 gap-2">
          <nuxt-link
            :to="{
              name: 'blog',
              query: {
                etiket: 'discord',
              },
            }"
            title="Discord etiketli gönderileri gör"
            class="flex items-center space-x-2 text-gray-900 dark:text-gray-100"
          >
            <icon name="discord" class="w-6 h-6" />
            <h3 class="text-lg font-semibold">Discord</h3>
          </nuxt-link>

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

        <div class="grid grid-cols-1 gap-2">
          <nuxt-link
            :to="{
              name: 'blog',
              query: {
                etiket: 'linux',
              },
            }"
            title="Linux etiketli gönderileri gör"
            class="flex items-center space-x-2 text-gray-900 dark:text-gray-100"
          >
            <icon name="linux" class="w-6 h-6" />
            <h3 class="text-lg font-semibold">Linux</h3>
          </nuxt-link>

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
          class="space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100"
        >
          Diğer gönderiler
        </h3>

        <div class="grid gap-3 mt-4 sm:grid-cols-3">
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

        <div class="flex flex-wrap items-center justify-center mt-4 space-x-2">
          <div
            v-for="page in getTotalPages"
            :key="`pagination-${page}`"
            class="flex items-center justify-center w-10 h-10 font-medium text-gray-900 bg-gray-200 rounded-full cursor-pointer select-none ring-1 ring-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-800"
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

    <div v-else-if="getFilteredPosts">
      <div
        v-if="getFilteredPosts !== false && getFilteredPosts.length === 0"
        class="space-y-4"
      >
        <h2
          class="text-2xl font-semibold text-gray-900 sm:text-4xl dark:text-gray-100"
        >
          Aramanıza uygun herhangi bir gönderi bulunamadı.
        </h2>

        <div class="sm:w-4/6">
          <h3 class="text-lg text-gray-900 dark:text-gray-100">
            Deneyebileceğiniz yöntemler:
          </h3>

          <ul class="pl-4 text-gray-700 list-disc dark:text-gray-300">
            <li>Aramanızda anahtar kelimeler kullanmayı deneyin.</li>
            <li>Etiketler kullanmayı deneyin.</li>
            <li>
              Gönderinin başlığında veya açıklamasında olan kelimelerle arama
              yapmayı deneyin.
            </li>
          </ul>
        </div>

        <nuxt-link
          :to="{ name: 'blog' }"
          class="flex items-center justify-center px-4 py-2 space-x-2 text-gray-900 bg-gray-100 rounded ring-1 ring-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:ring-gray-700 sm:w-max dark:text-gray-100"
        >
          <icon name="home" class="w-6 h-6" />
          <span>Bloga Dön</span>
        </nuxt-link>
      </div>

      <div v-else class="space-y-4">
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

<script>
export default {
  data() {
    return {
      query: {},
      pagination: 0,
      posts: {
        latest: [],
        discord: [],
        linux: [],
        rest: [],
      },
    }
  },
  async fetch() {
    const latestPosts = await this.$content()
      .sortBy("createdAt", "desc")
      .limit(4)
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
      .skip(4)
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
    isFetchPending() {
      return this.$fetchState?.pending || this.$fetchState.error
    },
    /**
     * Filters posts with a query variable.
     * @returns {boolean|object[]} False if no query set, filtered posts array if there are results.
     */
    getFilteredPosts() {
      let { q, search, query, ara, sorgu, etiket } = this.query

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
            post.tags?.filter((tag) => tag?.toLowerCase()?.includes(etiket))
              ?.length
        )
      else {
        const filteredPosts = allPosts.filter(
          (post) =>
            post.title
              ?.toLowerCase()
              ?.includes(q || search || query || ara || sorgu) ||
            post.description
              ?.toLowerCase()
              ?.includes(q || search || query || ara || sorgu)
        )

        return filteredPosts
      }
    },
    /**
     * Returns the number of pages for the posts.
     * @returns {number} Page amount.
     */
    getTotalPages() {
      return Math.ceil(this.posts?.rest?.length / 15)
    },
    /**
     * Returns paginated, sliced posts.
     * @returns {object[]} The posts array.
     */
    getPaginatedPosts() {
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
}
</script>
