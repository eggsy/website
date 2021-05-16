<template>
  <div
    v-if="$fetchState.pending"
    class="flex font-semibold h-screen space-x-2 -mt-10 text-2xl text-gray-900 items-center justify-center overflow-hidden select-none dark:text-gray-100"
  >
    <IconSync class="h-8 animate-spin w-8" />
    <h3>Gönderi yükleniyor...</h3>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex h-screen -mt-10 text-gray-900 items-center justify-center overflow-hidden select-none dark:text-gray-100"
  >
    <div class="space-y-2">
      <div
        class="flex font-semibold space-x-2 text-2xl items-center justify-center"
      >
        <IconTimes class="h-8 w-8" />
        <h3>Gönderi yüklenemedi.</h3>
      </div>

      <small class="text-sm">Büyük ihtimalle gönderi henüz blogumda yok</small>

      <div class="flex justify-center">
        <SmartLink
          href="/blog"
          class="rounded-md bg-gray-700 py-2 px-4 text-gray-200 hover:bg-gray-800"
          title="bloga dön"
        >
          Bloga Dön
        </SmartLink>
      </div>
    </div>
  </div>

  <div v-else class="space-x-6 pt-14">
    <div class="mx-auto w-full">
      <article>
        <header class="space-y-4 text-center mb-12 sm:text-left sm:pr-16">
          <div class="space-y-2">
            <h1
              class="font-semibold text-black text-2xl block sm:text-4xl dark:text-gray-50"
            >
              {{ post.title }}
            </h1>

            <p class="dark:text-gray-100">
              {{ post.description }}
            </p>
          </div>

          <div
            class="flex space-x-2 items-center justify-center whitespace-nowrap sm:justify-start dark:text-gray-300"
          >
            <div
              class="rounded-lg flex space-x-1 bg-gray-200 py-1 px-2 text-gray-700 items-center dark:(bg-gray-700 text-gray-300)"
            >
              <IconClock class="h-4 w-4" />
              <div>{{ getReadingTime }} dakika okuma</div>
            </div>

            <div
              class="rounded-lg flex space-x-1 bg-gray-200 py-1 px-2 pl-2 text-gray-700 items-center dark:(bg-gray-700 text-gray-300)"
            >
              <IconCalendar class="h-4 w-4" />
              <div>{{ getReadableDate }}</div>
            </div>
          </div>
        </header>

        <div class="mt-4">
          <div
            class="text-right -ml-20 top-4 sticky hidden float-left md:block"
          >
            <BlogShare
              type="vertical"
              :title="post.title"
              :path="$route.path"
            />
          </div>

          <nuxt-content :document="post" />
        </div>
      </article>

      <Disqus
        :title="post.title"
        :url="`https://eggsy.xyz/blog/gonderi/${post.slug}`"
        :identifier="`/blog/gonderi/${post.slug}`"
        :slug="post.slug"
        lang="tr"
        class="mt-10"
      />

      <div class="space-y-10 mt-10">
        <BlogPrevNext :current-slug="post.slug" />

        <div>
          <h3 class="font-medium text-lg mb-1 text-gray-900 dark:text-gray-100">
            Yazıyı paylaş
          </h3>

          <BlogShare :title="post.title" :path="$route.path" />
        </div>

        <div v-if="getTags.length > 0">
          <h3 class="font-medium text-lg mb-1 text-gray-900 dark:text-gray-100">
            Etiketler
          </h3>

          <div class="flex flex-wrap space-x-2">
            <SmartLink
              v-for="(tag, index) in getTags"
              :key="`tag-${index}`"
              :href="{
                name: 'blog',
                query: {
                  etiket: tag,
                },
              }"
              class="rounded-md bg-gray-200 py-1 px-2 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              {{ tag }}
            </SmartLink>
          </div>
        </div>

        <div v-if="getRelatedPosts.length > 0">
          <h3 class="font-medium text-lg mb-1 text-gray-900 dark:text-gray-100">
            Bunlar da hoşunuza gidebilir
          </h3>

          <div class="grid gap-2 sm:grid-cols-3">
            <SmartLink
              v-for="(relatedPost, index) in getRelatedPosts"
              :key="`related-${index}`"
              :href="`/blog/gonderi/${relatedPost.slug}`"
              class="rounded bg-gray-200 text-center p-4 ring-1 ring-opacity-25 ring-gray-300 truncate dark:(bg-gray-800 hover:bg-gray-700 text-gray-100 hover:bg-opacity-75 ring-gray-800) hover:bg-gray-300"
            >
              {{ relatedPost.title }}
            </SmartLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

/* Interfaces */
import { Post } from "~/src/types/Post"

interface RelatedPost {
  title: string
  slug: string
}

export default Vue.extend({
  data() {
    return {
      post: {} as Post,
      related: [] as RelatedPost[],
    }
  },
  async fetch() {
    const post = (await this.$content(this.$route.params.slug).fetch()) as Post

    if (!post) this.$router.push("/blog")
    else {
      this.post = post

      if (post.related && post.related?.length > 0) {
        const array = []

        for (const key of post.related) {
          const { title }: any = await this.$content(key)
            .only(["title"])
            .fetch()

          array.push({
            title,
            slug: key,
          })
        }

        this.related = array
      }
    }
  },
  head() {
    const post = this.post as Post
    const { getPostImage, getTags } = this as {
      getPostImage: string
      getTags: string[]
    }

    const title = post.title
    const description =
      post.description || "EGGSY'nin blogunda bu yazıyı okumaya davet edildin."

    const image = getPostImage
    const tags = getTags?.join(", ") || title
    const href = `https://eggsy.xyz${this.$route?.path}`

    return {
      title,
      link: [
        {
          rel: "canonical",
          href,
        },
      ],
      meta: this.$prepareMeta(
        {
          title,
          description,
          image,
          keywords: `${tags}, eggsy blog, blog, teknoloji, vue, yazılım, discord, eggsys`,
          url: href,
        },
        [
          {
            name: "article:published-time",
            content: post?.createdAt || null,
          },
        ]
      ),
    }
  },
  computed: {
    /**
     * Returns the tags of the current post, if there's none specified, returns an empty array instead.
     * @returns {string[]} Array of tags.
     */
    getTags(): string[] {
      return this.post?.tags || []
    },
    /**
     * Calculates the words and returns the potential maximum reading time.
     * @returns {string} Reading time in minutes.
     */
    getReadingTime(): string {
      return this.$getReadingTime(JSON.stringify(this.post.body))
    },
    /**
     * Returns the date as a readable string.
     * @returns {string} Today, yesterday, x day before, x months before or DD/MM/YYYY.
     */
    getReadableDate(): string {
      return this.$getReadableDate(this.post?.createdAt || new Date())
    },
    /**
     * Returns the related posts, if there's no related post, returns an empty array instead.
     * @returns {RelatedPost[]} Related posts' slugs.
     */
    getRelatedPosts(): RelatedPost[] {
      return this.related || []
    },
    /**
     * Returns the post image if explicitly set, if none, looks for a jpg under assets.
     * @returns {string} The URL of the image.
     */
    getPostImage(): string {
      return this.post?.image
        ? `https://eggsy.xyz/${this.post?.image}`
        : `https://eggsy.xyz/assets/images/posts/${this.post?.slug}.jpg`
    },
  },
})
</script>

<style lang="scss">
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
    @apply text-gray-800 dark:text-gray-200;

    &.text-center {
      @apply flex justify-center;
    }

    strong {
      @apply font-medium text-gray-900 dark:text-gray-100;
    }

    a {
      @apply text-blue-700 dark:text-blue-600 hover:underline;
    }

    code {
      @apply bg-gray-800 dark:bg-gray-700 rounded-md text-gray-200 px-1 py-px font-sans;
    }

    &:not(:last-child) {
      @apply mb-5;
    }
  }

  /* Smart image */
  div[smart-image] {
    @apply mx-auto w-max max-w-full rounded mb-5;
  }

  /* Ratings */
  .ratings {
    @apply space-y-px mb-4 dark:text-gray-200;
  }

  /* Pre and code block filenames */

  .nuxt-content-highlight {
    @apply relative mb-5;

    .filename {
      @apply absolute right-0 text-gray-300 font-light z-10 mr-3 mt-3 text-sm;
    }

    pre {
      @apply rounded-md px-6 py-4;
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
      @apply mb-5;
    }
  }

  ul {
    @apply list-disc pl-5;

    &:not(:last-child) {
      @apply mb-5;
    }

    li::marker {
      @apply text-gray-600;
    }
  }

  /* Horizontal line */
  hr {
    @apply border-gray-300 dark:border-gray-700 my-8 border-dashed;
  }

  /* Notification */
  .notification {
    @apply mb-4;
  }
}
</style>
