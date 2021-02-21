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
        class="pl-2 space-x-2 text-lg font-semibold text-gray-900 border-l-4 border-gray-800 dark:border-gray-400 dark:text-gray-100"
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
            class="flex items-center pl-2 space-x-2 text-gray-900 border-l-4 border-gray-800 dark:border-gray-400 dark:text-gray-100"
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
            class="flex items-center pl-2 space-x-2 text-gray-900 border-l-4 border-gray-800 dark:border-gray-400 dark:text-gray-100"
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
          class="pl-2 space-x-2 text-lg font-semibold text-gray-900 border-l-4 border-gray-800 dark:border-gray-400 dark:text-gray-100"
        >
          Diğer gönderiler
        </h3>

        <div class="grid gap-4 mt-4 sm:grid-cols-3">
          <CardPost
            v-for="(post, index) in posts.rest"
            :key="`linux-${index}`"
            :post="post"
            type="text-only-title"
          />
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
      query: this.$route.query || {},
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
  head: {
    title: "Blog",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "EGGSY'nin günlük hayattan, tecrübelerinden bahsettiği, göstermek veya anlatmak istediği şeyleri daha düzenli ve profesyonel bir şekilde tuttuğu blog sayfası.",
      },
      // Twitter
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "EGGSY's Blog",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          "EGGSY'nin günlük hayattan, tecrübelerinden bahsettiği, göstermek veya anlatmak istediği şeyleri daha düzenli ve profesyonel bir şekilde tuttuğu blog sayfası.",
      },
      // Open-Graph
      { hid: "og:title", name: "og:title", content: "EGGSY's Blog" },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "EGGSY'nin günlük hayattan, tecrübelerinden bahsettiği, göstermek veya anlatmak istediği şeyleri daha düzenli ve profesyonel bir şekilde tuttuğu blog sayfası.",
      },
      // PreMiD
      { name: "premid-details", content: "Viewing a blog page:" },
      { name: "premid-state", content: "Homepage" },
    ],
  },
  computed: {
    /**
     * Filters posts with a query variable.
     * @returns {boolean|array} False if no query set, filtered posts array if there are results.
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
            post.tags.filter((tag) => tag.toLowerCase().includes(etiket)).length
        )
      else
        return allPosts.filter(
          (post) =>
            post.title
              ?.toLowerCase()
              ?.includes(q || search || query || ara || sorgu) ||
            post.description
              ?.toLowerCase()
              ?.includes(q || search || query || ara || sorgu)
        )
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
     * @returns {object} The router query object.
     */
    setQuery() {
      this.query = this.$route.query
    },
  },
}
</script>
