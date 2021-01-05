<template>
  <div
    v-if="$fetchState.pending"
    class="flex items-center justify-center h-screen space-x-2 overflow-hidden text-2xl font-semibold text-gray-900 select-none dark:text-gray-200"
  >
    <icon name="sync" class="w-8 h-8 animate-spin dark:text-gray-200" />

    <h3>Gönderiler yükleniyor...</h3>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex items-center justify-center h-screen space-x-2 overflow-hidden text-2xl font-semibold text-gray-900 select-none dark:text-gray-200"
  >
    <icon name="times" class="w-8 h-8 dark:text-gray-200" />

    <h3>Gönderiler yüklenemedi.</h3>
  </div>

  <div v-else class="pb-8">
    <!-- Latest Posts -->
    <section v-if="posts.latest && posts.latest.length > 0">
      <div class="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
        <nuxt-link
          :to="{
            name: 'blog-gonderi-slug',
            params: { slug: posts.latest[0].slug },
          }"
        >
          <CardPost :post="posts.latest[0]" :featured="true" />
        </nuxt-link>

        <div class="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-2">
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
      <div class="flex items-center mb-4 space-x-2">
        <icon name="discord" class="w-8 h-8 dark:text-gray-200" />
        <nuxt-link
          :to="{
            name: 'blog-etiket-name',
            params: {
              name: 'discord',
            },
          }"
          class="hover:underline"
        >
          <CoolTitle lang="en" right-down="Discord" />
        </nuxt-link>
      </div>

      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <nuxt-link
            v-for="(post, index) in posts.discord.slice(0, 3)"
            :key="`discord-${index}`"
            :to="{
              name: 'blog-gonderi-slug',
              params: { slug: post.slug },
            }"
            :class="{
              'boxed-post-card': true,
              'col-span-2 sm:col-span-1': index === 2,
            }"
          >
            <p>{{ post.title }}</p>
          </nuxt-link>
        </div>

        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:grid-rows-2">
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
          <div class="flex items-center mb-4 space-x-2">
            <icon name="linux" class="w-8 h-8 dark:text-gray-200" />

            <nuxt-link
              :to="{
                name: 'blog-etiket-name',
                params: {
                  name: 'linux',
                },
              }"
              class="hover:underline"
            >
              <CoolTitle right-down="Linux" lang="en" />
            </nuxt-link>
          </div>

          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:grid-rows-2">
            <nuxt-link
              v-for="(post, index) in posts.linux"
              :key="`linux-${index}`"
              :to="{
                name: 'blog-gonderi-slug',
                params: { slug: post.slug },
              }"
              :class="{ 'sm:col-span-2': index === 0, truncate: true }"
            >
              <CardPost :post="post" :image="false" color="teal" />
            </nuxt-link>
          </div>
        </div>

        <div>
          <div class="flex items-center mb-4 space-x-2">
            <icon name="document" class="w-8 h-8 dark:text-gray-200" />

            <nuxt-link
              :to="{
                name: 'blog-etiket-name',
                params: {
                  name: 'site',
                },
              }"
              class="hover:underline"
            >
              <CoolTitle right-down="Site" />
            </nuxt-link>
          </div>

          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:grid-rows-2">
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
      <div class="flex items-center mb-4 space-x-2">
        <icon name="book-open" class="w-8 h-8 dark:text-gray-200" />
        <CoolTitle right-down="Diğer gönderiler" />
      </div>

      <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
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
.boxed-post-card {
  @apply bg-indigo-700 hover:bg-indigo-800 p-4 text-white rounded-md text-lg text-center sm:text-left sm:text-xl font-semibold dark:hover:bg-opacity-80 dark:bg-gray-800;

  p {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

section:not(:first-child) {
  @apply mt-10;
}
</style>
