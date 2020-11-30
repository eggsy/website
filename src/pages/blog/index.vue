<template>
  <div
    v-if="$fetchState.pending"
    class="flex items-center h-screen overflow-hidden justify-center space-x-2 text-2xl text-gray-900 font-semibold select-none"
  >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-8 w-8 animate-spin"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </div>

    <h3>Gönderiler yükleniyor...</h3>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex items-center h-screen overflow-hidden justify-center space-x-2 text-2xl text-gray-900 font-semibold select-none"
  >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-8 w-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    <h3>Gönderiler yüklenemedi.</h3>
  </div>

  <div v-else class="my-8 mx-2 sm:mx-0">
    <!-- Latest Posts -->
    <section>
      <CoolTitle right-down="Son Gönderiler" />

      <div class="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
        <CardPost :post="posts.latest[0]" :featured="true" />

        <div class="grid gap-2 sm:gap-4 grid-cols-2 grid-rows-2">
          <CardPost
            v-for="(post, index) in posts.latest.slice(1, 5)"
            :key="`latest-${index}`"
            :post="post"
          />
        </div>
      </div>
    </section>

    <!-- Discord Posts -->
    <section>
      <CoolTitle right-up="Discord" right-down="İle alakalı gönderiler" />

      <div class="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
        <div class="grid grid-cols-2 grid-rows-2 gap-2">
          <CardPost
            v-for="(post, index) in posts.discord.slice(0, 3)"
            :key="`discord-${index}`"
            :class="{ 'col-span-2': index === 2 }"
            :post="post"
            :image="false"
            color="indigo"
          />
        </div>

        <div class="grid grid-cols-2 grid-rows-2 gap-2">
          <CardPost
            v-for="(post, index) in posts.discord.slice(3, 7)"
            :key="`discord-2-${index}`"
            :class="{ 'col-span-2': index === 0 }"
            :post="post"
            :image="false"
          />
        </div>
      </div>
    </section>

    <!-- Linux and Blog Posts -->
    <section>
      <div class="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
        <div>
          <CoolTitle right-up="Linux" right-down="İle alakalı gönderiler" />

          <div
            class="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:gap-2"
          >
            <CardPost
              v-for="(post, index) in posts.linux"
              :key="`linux-${index}`"
              :post="post"
              :class="{ 'col-span-2': index === 0 }"
              :image="false"
              color="orange"
            />
          </div>
        </div>

        <div>
          <CoolTitle right-up="Blog" right-down="İle alakalı gönderiler" />

          <div
            class="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:gap-2"
          >
            <CardPost
              v-for="(post, index) in posts.blog"
              :key="`blog-${index}`"
              :post="post"
              :class="{ 'col-span-2': index === 2 }"
              :image="false"
              color="red"
            />
          </div>
        </div>
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

    this.posts = {
      latest: latestPosts || [],
      discord: discordPosts || [],
      linux: linuxPosts || [],
      blog: blogPosts || [],
    }
  },
}
</script>

<style lang="scss" scoped>
section:not(:first-child) {
  @apply mt-10;
}
</style>
