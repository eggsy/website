<template>
  <div
    v-if="$fetchState.pending"
    class="flex items-center h-screen overflow-hidden justify-center space-x-2 text-2xl text-gray-900 font-semibold select-none"
  >
    <icon name="sync" class="h-8 w-8 animate-spin" />

    <h3>Gönderiler yükleniyor...</h3>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex items-center h-screen overflow-hidden justify-center space-x-2 text-2xl text-gray-900 font-semibold select-none"
  >
    <icon name="times" class="h-8 w-8" />

    <h3>Gönderiler yüklenemedi.</h3>
  </div>

  <div v-else class="my-8 mx-2 sm:mx-0">
    <!-- Latest Posts -->
    <section v-if="posts.latest && posts.latest.length > 0">
      <div class="hidden sm:flex space-x-2 items-center mb-4">
        <icon name="clock" class="h-8 w-8" />
        <CoolTitle right-down="Son Gönderiler" />
      </div>

      <div class="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
        <nuxt-link
          :to="{
            name: 'blog-gonderi-slug',
            params: { slug: posts.latest[0].slug },
          }"
        >
          <CardPost :post="posts.latest[0]" :featured="true" />
        </nuxt-link>

        <div class="grid gap-2 sm:gap-4 grid-cols-2 grid-rows-2">
          <nuxt-link
            v-for="(post, index) in posts.latest.slice(1, 5)"
            :key="`latest-${index}`"
            :to="{
              name: 'blog-gonderi-slug',
              params: { slug: post.slug },
            }"
          >
            <CardPost :post="post" />
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Discord Posts -->
    <section v-if="posts.discord && posts.discord.length > 0">
      <div class="flex space-x-2 items-center mb-4">
        <icon name="discord" class="h-10 w-10" />
        <CoolTitle right-up="Discord" right-down="İle alakalı gönderiler" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <div class="grid sm:grid-cols-2 sm:grid-rows-2 gap-2">
          <nuxt-link
            v-for="(post, index) in posts.discord.slice(0, 3)"
            :key="`discord-${index}`"
            :to="{
              name: 'blog-gonderi-slug',
              params: { slug: post.slug },
            }"
            :class="{ 'sm:col-span-2': index === 2, truncate: true }"
          >
            <CardPost :post="post" :image="false" color="indigo" />
          </nuxt-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-2">
          <nuxt-link
            v-for="(post, index) in posts.discord.slice(3, 7)"
            :key="`discord-2-${index}`"
            :to="{
              name: 'blog-gonderi-slug',
              params: { slug: post.slug },
            }"
            :class="{ 'sm:col-span-2': index === 0, truncate: true }"
          >
            <CardPost :post="post" :image="false" color="mobile-indigo" />
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Linux and Blog Posts -->
    <section
      v-if="
        posts.linux &&
        posts.blog &&
        posts.linux.length > 0 &&
        posts.blog.length > 0
      "
    >
      <div class="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
        <div>
          <div class="flex space-x-2 items-center mb-4">
            <icon name="linux" class="h-10 w-10" />
            <CoolTitle right-up="Linux" right-down="İle alakalı gönderiler" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-2">
            <nuxt-link
              v-for="(post, index) in posts.linux"
              :key="`linux-${index}`"
              :to="{
                name: 'blog-gonderi-slug',
                params: { slug: post.slug },
              }"
              :class="{ 'sm:col-span-2': index === 0, truncate: true }"
            >
              <CardPost :post="post" :image="false" color="orange" />
            </nuxt-link>
          </div>
        </div>

        <div>
          <div class="flex items-center space-x-2 mb-4">
            <icon name="document" class="h-10 w-10" />
            <CoolTitle right-up="Blog" right-down="İle alakalı gönderiler" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-2">
            <nuxt-link
              v-for="(post, index) in posts.blog"
              :key="`blog-${index}`"
              :to="{
                name: 'blog-gonderi-slug',
                params: { slug: post.slug },
              }"
              :class="{ 'sm:col-span-2': index === 2, truncate: true }"
            >
              <CardPost :post="post" :image="false" color="red" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Posts -->
    <section v-if="posts.rest && posts.rest.length > 0">
      <CoolTitle right-down="Diğer gönderiler" class="block mb-4" />

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <nuxt-link
          v-for="(post, index) in posts.rest"
          :key="`rest-${index}`"
          :to="{
            name: 'blog-gonderi-slug',
            params: { slug: post.slug },
          }"
        >
          <CardPost :post="post" :image="false" :description="true" />
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "blog",
  data() {
    return {
      posts: {
        latest: [],
        discord: [],
        linux: [],
        blog: [],
        rest: [],
      },
    }
  },
  async fetch() {
    const latestPosts = await this.$content()
      .sortBy("createdAt", "desc")
      .limit(5)
      .without(["body"])
      .fetch()

    const discordPosts = await this.$content()
      .where({ tags: { $contains: "discord" } })
      .sortBy("createdAt", "desc")
      .limit(6)
      .without(["body"])
      .fetch()

    const linuxPosts = await this.$content()
      .where({ tags: { $contains: "linux" } })
      .sortBy("createdAt", "desc")
      .limit(3)
      .without(["body"])
      .fetch()

    const blogPosts = await this.$content()
      .where({ tags: { $contains: "blog" } })
      .sortBy("createdAt", "desc")
      .limit(3)
      .without(["body"])
      .fetch()

    const allPosts = await this.$content()
      .sortBy("createdAt", "desc")
      .skip(5)
      .without(["body"])
      .fetch()

    this.posts = {
      latest: latestPosts || [],
      discord: discordPosts || [],
      linux: linuxPosts || [],
      blog: blogPosts || [],
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
}
</script>

<style lang="scss" scoped>
section:not(:first-child) {
  @apply mt-10;
}
</style>
