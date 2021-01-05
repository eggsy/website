<template>
  <div
    v-if="$fetchState.pending"
    class="flex items-center justify-center h-screen space-x-2 overflow-hidden text-2xl font-semibold text-gray-900 select-none dark:text-gray-100"
  >
    <icon name="sync" class="w-8 h-8 animate-spin" />
    <h3>Gönderi yükleniyor...</h3>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex items-center justify-center h-screen overflow-hidden select-none"
  >
    <div class="space-y-2">
      <div
        class="flex items-center justify-center space-x-2 text-2xl font-semibold text-gray-900 dark:text-gray-100"
      >
        <icon name="times" class="w-8 h-8" />
        <h3>Gönderi yüklenemedi.</h3>
      </div>

      <small class="text-sm">Büyük ihtimalle gönderi henüz blogumda yok</small>

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

  <div v-else class="px-4 pb-10 space-x-6 pt-14 sm:pt-14 sm:px-0">
    <div class="w-full mx-auto sm:w-7/12">
      <article>
        <header class="mb-12 space-y-2">
          <h1
            class="block text-4xl font-semibold text-center text-gray-800 sm:text-6xl dark:text-gray-200"
          >
            {{ post.title }}
          </h1>

          <div
            class="flex items-center justify-center w-full space-x-4 dark:text-gray-300 whitespace-nowrap"
          >
            <span>{{ getReadingTime }} dakika okuma</span>
            <span>
              {{ getReadableDate }}
            </span>
          </div>
        </header>

        <div class="mt-4 text-justify">
          <nuxt-content :document="post"></nuxt-content>
        </div>
      </article>

      <div class="mt-10 space-y-10">
        <PrevNext :current-slug="post.slug" />

        <div>
          <h3 class="mb-1 text-lg font-semibold dark:text-gray-100">
            Yazıyı paylaş
          </h3>

          <Share :title="post.title" :path="$route.path" />
        </div>

        <div
          v-if="getRelatedPosts.length > 0"
          class="p-4 bg-gray-100 rounded-md dark:bg-gray-800 ring-1 ring-opacity-75 ring-gray-200 dark:ring-gray-900"
        >
          <CoolTitle
            :left="getRelatedPosts.length"
            right-up="Bunlar da"
            right-down="Hoşunuza gidebilir"
            class="mb-4"
          />

          <div class="grid gap-2 sm:grid-cols-2">
            <nuxt-link
              v-for="(relatedPost, index) in getRelatedPosts"
              :key="`related-${index}`"
              :to="`/blog/gonderi/${relatedPost.slug}`"
              :class="{
                'px-3 py-2 text-center truncate bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-opacity-75 ring-1 ring-opacity-50 ring-gray-300 dark:ring-gray-800 dark:text-gray-300 sm:text-left': true,
                'sm:col-span-2':
                  Number(index) % 2 === 0 &&
                  Number(index) + 1 >= getRelatedPosts.length,
              }"
            >
              {{ relatedPost.title }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "blog",
  data() {
    return {
      post: {},
      related: [],
    }
  },
  async fetch() {
    const post = await this.$content(this.$route.params.slug).fetch()
    if (!post) return this.$router.push("/blog")

    this.post = post

    if (post.related?.length > 0) {
      const array = []
      for (const key of post.related) {
        const { title } = await this.$content(key).only(["title"]).fetch()
        array.push({
          title,
          slug: key,
        })
      }

      this.related = array
    }
  },
  head() {
    const title = this.post?.title || "Gönderi Yükleniyor"
    const description =
      this.post?.description ||
      "EGGSY'nin blogunda bu yazıyı okumaya davet edildin."
    const image = this.getPostImage || false

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
          content: this.getTags || null,
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
          content: `https://new.eggsy.xyz/blog/gonderi/${this.$route?.params?.slug}`,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: image,
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
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
        {
          name: "article:published-time",
          content: this.post?.createdAt || null,
        },
        // PreMiD
        {
          name: "premid-details",
          content: title,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: `https://new.eggsy.xyz/blog/gonderi/${this.$route?.params?.slug}`,
        },
      ],
    }

    return object
  },
  computed: {
    /**
     * Calculates the words and returns the potential maximum reading time.
     * @returns {number|string} Reading time in minutes.
     */
    getReadingTime() {
      const body = JSON.stringify(this.post.body)
      const words = body?.split(" ").length || 0
      return Math.ceil(words / 200).toFixed()
    },
    /**
     * Returns the date as a readable string.
     * @returns {string} Today, yesterday, x day before, x months before or DD/MM/YYYY.
     */
    getReadableDate() {
      const now = this.$moment()
      const createdAt = this.$moment(this.post?.createdAt)
      const diff = now.diff(createdAt, "days")

      if (diff === 0) return "Bugün"
      else if (diff === 1) return "Dün"
      else if (diff <= 30) return `${diff} gün önce`
      else if (diff >= 30 && diff <= 90)
        return `${Math.floor(diff / 30)} ay önce`
      else return createdAt.format("DD/MM/YYYY")
    },
    /**
     * Returns the related posts, if there's no related post, returns an empty array instead.
     * @returns {string[]|object} Related posts' slugs.
     */
    getRelatedPosts() {
      return this.related || []
    },
    /**
     * Returns the post image if explicitly set, if none, looks for a jpg under assets.
     * @returns {string} The URL of the image.
     */
    getPostImage() {
      return this.post?.image || `/assets/images/posts/${this.post?.slug}.jpg`
    },
  },
}
</script>

<style lang="scss">
header h1 {
  font-family: "Quicksand", sans-serif;
}

.nuxt-content {
  /* Headings */
  h1,
  h2,
  h3 {
    @apply font-semibold hover:underline text-gray-900 dark:text-gray-100;
  }

  h1 {
    @apply text-xl;
  }

  h2,
  h3 {
    @apply text-lg;
  }

  /* Paragraphs */
  p {
    @apply text-gray-800 dark:text-gray-300;

    &.text-center {
      @apply flex justify-center;
    }

    strong {
      @apply font-medium text-gray-900 dark:text-gray-200;
    }

    a {
      @apply text-blue-700 hover:text-blue-800 dark:text-blue-600 dark:hover:text-blue-700 hover:underline;
    }

    code {
      @apply bg-gray-800 dark:bg-gray-700 rounded-md text-gray-200 px-1 py-px font-sans;
    }

    img {
      @apply rounded-md;
    }

    &:not(:last-child) {
      @apply mb-4;
    }
  }

  /* Ratings */
  .ratings {
    @apply space-y-px mb-4 dark:text-gray-200;
  }

  /* Pre */
  pre {
    @apply rounded-md;
  }

  /* Ordered and Unordered Lists */
  ol,
  ul {
    @apply text-gray-800 dark:text-gray-300;

    li:not(:last-child) {
      @apply mb-1;
    }
  }

  ol {
    @apply list-decimal pl-4;

    &:not(:last-child) {
      @apply mb-4;
    }
  }

  ul {
    @apply list-disc pl-4;

    &:not(:last-child) {
      @apply mb-4;
    }
  }
}

#titles {
  scroll-behavior: smooth;
  max-height: 90vh;

  @apply text-gray-800 dark:text-gray-200;
}
</style>
