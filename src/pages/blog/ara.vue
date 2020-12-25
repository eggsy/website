<template>
  <div
    v-if="$fetchState.pending || !fetchCalled"
    class="flex items-center h-screen overflow-hidden justify-center space-x-2 text-2xl text-gray-900 font-semibold select-none"
  >
    <icon name="sync" class="h-8 w-8 animate-spin" />

    <h3>Gönderiler yükleniyor...</h3>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex items-center justify-center h-screen overflow-hidden select-none"
  >
    <div class="space-y-2">
      <div
        class="flex items-center justify-center text-gray-900 font-semibold text-2xl space-x-2"
      >
        <icon name="times" class="h-8 w-8" />

        <h3>Gönderiler yüklenemedi.</h3>
      </div>

      <div class="flex justify-center">
        <nuxt-link
          to="/blog"
          class="rounded-md px-4 py-2 bg-gray-700 hover:bg-gray-800 text-gray-200"
          title="bloga dön"
        >
          Bloga Dön
        </nuxt-link>
      </div>
    </div>
  </div>

  <div v-else class="pt-20 pb-10 sm:pt-16 sm:pb-8">
    <div v-if="posts.length === 0">
      <CoolTitle
        left="X"
        :right-up="query"
        right-down="İçin herhangi bir sonuç bulunamadı"
        class="block mb-4"
      />

      <a
        class="flex items-center space-x-2 rounded-md transform transition hover:translate-x-2 cursor-pointer select-none w-max"
        @click="$router.back()"
      >
        <icon name="arrow-left" class="h-8 w-8" />
        <span class="text-xl text-gray-900">Geri Dön</span>
      </a>
    </div>

    <div v-else-if="posts.length > 0">
      <CoolTitle
        :left="posts.length"
        :right-up="query"
        right-down="İçin arama sonuçları"
        class="block mb-4"
      />

      <div
        :class="{
          'grid gap-2 grid-cols-1': true,
          'sm:grid-cols-3': posts.length <= 6,
          'sm:grid-cols-4': posts.length > 6,
        }"
      >
        <nuxt-link
          v-for="(post, index) in posts"
          :key="`search-post-${index}`"
          :to="{
            name: 'blog-gonderi-slug',
            params: { slug: post.slug },
          }"
        >
          <CardPost :post="post" :image="false" :description="true" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "blog",
  data() {
    return {
      query:
        this.$route?.query?.q ||
        this.$route?.query?.search ||
        this.$route?.query?.query ||
        this.$route?.query?.sorgu ||
        "",
      fetchCalled: false,
      posts: [],
    }
  },
  async fetch() {
    if (!this.query) return

    const foundByTitle = await this.$content()
      .search(this.query)
      .without(["body"])
      .sortBy("createdAt", "desc")
      .fetch()

    const foundByTags = await this.$content()
      .where({ tags: { $contains: this.query } })
      .without(["body"])
      .sortBy("createdAt", "desc")
      .fetch()

    let posts = [...foundByTitle, ...foundByTags]
    posts = posts.filter(
      (post, index, self) =>
        index === self.findIndex((p) => p.slug === post.slug)
    )

    this.posts = posts
  },
  head() {
    const query = this.query
      ? this.query[0].toUpperCase() + this.query.slice(1).toLowerCase()
      : "Belirsiz"

    const title = `${query} Araması İçin Sonuçlar`
    const description = `Blog üzerinde "${query}" arayın ve bu sorguyu içeren blog yazılarına ulaşın!`

    const object = {
      title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `blog, etiket, arama, eggsy, ${query}`,
        },
        // Open-Graph
        {
          hid: "og:title",
          name: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: description,
        },
        {
          hid: "og:url",
          name: "og:url",
          content: `https://eggsy.xyz/blog/ara`,
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
        // PreMiD
        {
          name: "premid-details",
          content: "Bir Etikete Göz Atıyor:",
        },
        {
          name: "premid-state",
          content: query,
        },
      ],
    }

    return object
  },
  watch: {
    "$route.query": "refresh",
  },
  beforeMount() {
    this.refresh()
  },
  methods: {
    refresh() {
      const query =
        this.$route?.query?.q ||
        this.$route?.query?.search ||
        this.$route?.query?.query ||
        this.$route?.query?.sorgu ||
        ""

      this.query = query

      if (query) {
        this.query = query
        this.$fetch()
        this.fetchCalled = true
      } else {
        this.fetchCalled = true
      }
    },
  },
}
</script>
