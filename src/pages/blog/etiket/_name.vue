<template>
  <div
    v-if="$fetchState.pending"
    class="flex items-center justify-center h-screen space-x-2 overflow-hidden text-2xl font-semibold text-gray-900 select-none"
  >
    <icon name="sync" class="w-8 h-8 animate-spin" />

    <h3>Gönderiler yükleniyor...</h3>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex items-center justify-center h-screen overflow-hidden select-none"
  >
    <div class="space-y-2">
      <div
        class="flex items-center justify-center space-x-2 text-2xl font-semibold text-gray-900"
      >
        <icon name="times" class="w-8 h-8" />

        <h3>Gönderiler yüklenemedi.</h3>
      </div>

      <div class="flex justify-center">
        <nuxt-link
          to="/blog"
          class="px-4 py-2 text-gray-200 bg-gray-700 rounded-md hover:bg-gray-800"
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
        :right-up="$route.params.name"
        right-down="Etiketine sahip gönderi bulunamadı"
        class="block mb-4"
      />

      <a
        class="flex items-center space-x-2 transform rounded-md cursor-pointer select-none hover:translate-x-2 w-max"
        @click="$router.back()"
      >
        <icon name="arrow-left" class="w-8 h-8" />
        <span class="text-xl text-gray-900">Geri Dön</span>
      </a>
    </div>

    <div v-else-if="posts.length > 0">
      <CoolTitle
        :left="posts.length"
        :right-up="$route.params.name"
        right-down="Etiketine sahip gönderiler"
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
      posts: [],
    }
  },
  async fetch() {
    if (!this.$route.params) return

    const posts = await this.$content()
      .where({ tags: { $contains: this.$route.params.name.split(" ") } })
      .without(["body"])
      .sortBy("createdAt", "desc")
      .fetch()

    this.posts = posts
  },
  head() {
    const tagName = this.$route.params?.name
      ? this.$route.params?.name[0].toUpperCase() +
        this.$route.params?.name.slice(1).toLowerCase()
      : "Belirsiz"

    const title = `${tagName} Etiketine Sahip Gönderiler`
    const description = `Blog üzerinde ${tagName} etiketine sahip gönderilere bu adresten ulaşın!`

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
          content: `blog, etiket, eggsy, ${tagName}`,
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
          content: `https://new.eggsy.xyz/blog/etiket/${this.$route?.params?.name}`,
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
          content: tagName,
        },
      ],
    }

    return object
  },
  watch: {
    "$route.params": "refresh",
  },
  created() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.$fetch()
    },
  },
}
</script>
