<template>
  <div
    v-if="$fetchState.pending"
    class="flex items-center justify-center h-screen -mt-10 space-x-2 overflow-hidden text-2xl font-semibold text-gray-900 select-none dark:text-gray-200"
  >
    <icon name="sync" class="w-8 h-8 animate-spin dark:text-gray-200" />

    <h3>Gönderiler yükleniyor...</h3>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex items-center justify-center h-screen -mt-10 space-x-2 overflow-hidden text-2xl font-semibold text-gray-900 select-none dark:text-gray-200"
  >
    <icon name="times" class="w-8 h-8 dark:text-gray-200" />

    <h3>Gönderiler yüklenemedi.</h3>
  </div>

  <div v-else class="px-4 pb-16 sm:px-0">
    <div v-if="getFilteredPosts === false">
      <h3
        class="space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100"
      >
        Son gönderiler
      </h3>

      <div class="grid gap-4 mt-4 sm:grid-cols-2">
        <CardPost
          v-for="(post, index) in posts.latest"
          :key="`latest-${index}`"
          :post="post"
        />
      </div>

      <div class="grid gap-14 sm:gap-6 sm:grid-cols-2 mt-14">
        <div class="grid grid-cols-1 gap-4">
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

          <CardPost
            v-for="(post, index) in posts.discord"
            :key="`discord-${index}`"
            :post="post"
            type="text"
          />
        </div>

        <div class="grid grid-cols-1 gap-4">
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

          <CardPost
            v-for="(post, index) in posts.linux"
            :key="`linux-${index}`"
            :post="post"
            type="text"
          />
        </div>
      </div>

      <div class="mt-16">
        <h3
          class="space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100"
        >
          Diğer gönderiler
        </h3>

        <div class="grid gap-4 mt-4 sm:grid-cols-3">
          <CardPost
            v-for="(post, index) in getPaginatedPosts"
            :key="`linux-${index}`"
            :post="post"
            type="text-only-title"
          />
        </div>

        <div class="flex flex-wrap items-center justify-center mt-4 space-x-2">
          <div
            v-for="page in getTotalPages"
            :key="`pagination-${page}`"
            class="flex items-center justify-center w-10 h-10 font-medium text-gray-900 bg-gray-200 rounded-full cursor-pointer select-none ring-1 ring-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-100"
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
        class="text-xl font-semibold"
      >
        Aramanıza uygun herhangi bir gönderi bulunamadı.
      </div>

      <div v-else class="space-y-6">
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
  layout: "blog",
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
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        // Twitter
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        // Open-Graph
        { hid: "og:title", name: "og:title", content: title },
        {
          hid: "og:description",
          name: "og:description",
          content: description,
        },
        // PreMiD
        { name: "premid-details", content: "Viewing a blog page:" },
        { name: "premid-state", content: "Home" },
      ],
    }
  },
  computed: {
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
