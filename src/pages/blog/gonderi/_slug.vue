<template>
  <div
    v-if="$fetchState.pending"
    class="flex items-center justify-center h-screen -mt-10 space-x-2 overflow-hidden text-2xl font-semibold text-gray-900 select-none dark:text-gray-100"
  >
    <icon name="sync" class="w-8 h-8 animate-spin" />
    <h3>Gönderi yükleniyor...</h3>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex items-center justify-center h-screen -mt-10 overflow-hidden select-none"
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

  <div v-else class="px-4 pb-10 space-x-6 pt-14 sm:px-0">
    <div class="w-full mx-auto">
      <article>
        <header class="mb-12 space-y-4 text-center sm:text-left sm:pr-16">
          <h1
            class="block text-2xl font-semibold text-black quicksand sm:text-4xl dark:text-gray-50"
          >
            {{ post.title }}
          </h1>

          <p class="dark:text-gray-100">
            {{ post.description }}
          </p>

          <div
            class="flex items-center justify-center space-x-2 divide-x-2 divide-gray-200 sm:justify-start dark:text-gray-300 whitespace-nowrap"
          >
            <div class="flex items-center space-x-1">
              <icon name="clock" class="w-4 h-4" />
              <div>{{ getReadingTime }} dakika okuma</div>
            </div>

            <div class="flex items-center pl-2 space-x-1">
              <icon name="calendar" class="w-4 h-4" />
              <div>{{ getReadableDate }}</div>
            </div>
          </div>
        </header>

        <div class="mt-4 space-y-4">
          <nuxt-content :document="post"></nuxt-content>
        </div>
      </article>

      <div class="mt-10 space-y-10">
        <BlogPrevNext :current-slug="post.slug" />

        <div>
          <h3 class="mb-1 text-lg font-semibold dark:text-gray-100">
            Yazıyı paylaş
          </h3>

          <BlogShare :title="post.title" :path="$route.path" />
        </div>

        <div v-if="getTags.length > 0">
          <h3 class="mb-1 text-lg font-semibold dark:text-gray-100">
            Etiketler
          </h3>

          <div class="flex flex-wrap space-x-2">
            <nuxt-link
              v-for="(tag, index) in getTags"
              :key="`tag-${index}`"
              :to="{
                name: 'blog',
                query: {
                  etiket: tag,
                },
              }"
              class="px-2 py-1 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-300 dark:text-gray-100"
            >
              {{ tag }}
            </nuxt-link>
          </div>
        </div>

        <div v-if="getRelatedPosts.length > 0">
          <h3 class="mb-1 text-lg font-semibold dark:text-gray-100">
            Bunlar da hoşunuza gidebilir
          </h3>

          <div class="grid gap-2 sm:grid-cols-2">
            <nuxt-link
              v-for="(relatedPost, index) in getRelatedPosts"
              :key="`related-${index}`"
              :to="`/blog/gonderi/${relatedPost.slug}`"
              :class="{
                'p-3 text-center truncate bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-opacity-75 ring-1 ring-opacity-25 ring-gray-300 dark:ring-gray-800 dark:text-gray-100 sm:text-left': true,
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
    const title = this.post?.title
    const description =
      this.post?.description ||
      "EGGSY'nin blogunda bu yazıyı okumaya davet edildin."

    const image = this.getPostImage || false
    const tags = this.getTags?.join(", ") || title || "etiket"
    const href = `https://new.eggsy.xyz${this.$route?.path}`

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
          content: `eggsy, eggsy blog, blog, teknoloji, vue, yazılım, discord, eggsys, gönderi, ${tags}`,
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
          content: href,
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
          href,
        },
      ],
    }

    return object
  },
  computed: {
    /**
     * Returns the tags of the current post, if there's none specified, returns an empty array instead.
     * @returns {string[]} Array of tags.
     */
    getTags() {
      return this.post?.tags || []
    },
    /**
     * Calculates the words and returns the potential maximum reading time.
     * @returns {number|string} Reading time in minutes.
     */
    getReadingTime() {
      return this.$getReadingTime(JSON.stringify(this.post.body))
    },
    /**
     * Returns the date as a readable string.
     * @returns {string} Today, yesterday, x day before, x months before or DD/MM/YYYY.
     */
    getReadableDate() {
      return this.$getReadableDate(this.post?.createdAt)
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
header h1.quicksand {
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
      @apply rounded;
    }

    &:not(:last-child) {
      @apply mb-4;
    }
  }

  /* Ratings */
  .ratings {
    @apply space-y-px mb-4 dark:text-gray-200;
  }

  /* Pre and code block filenames */
  pre {
    @apply rounded-md;
  }

  .nuxt-content-highlight {
    @apply relative;

    .filename {
      @apply absolute right-0 text-gray-300 font-light z-10 mr-3 mt-2 text-sm;
    }
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
