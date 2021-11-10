<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { Post } from "~/src/types/Post"

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

<template>
  <transition name="fade">
    <LoadersContent
      v-if="$fetchState.pending === true || $fetchState.error !== null"
      :error="$fetchState.pending === false && $fetchState.error !== null"
    />

    <div v-else class="pt-4 space-x-6">
      <div class="w-full mx-auto" :class="post.header && 'space-y-10'">
        <div class="relative min-h-16">
          <SmartImage
            v-if="post.header"
            :src="post.header"
            class="h-60 -mx-[4.25vw] filter sm:-mx-[20.75vw] dark:brightness-75"
          />

          <div
            class="absolute left-0 flex items-center justify-center space-x-2 text-white select-none bottom-2 whitespace-nowrap sm:justify-start"
          >
            <div
              class="flex items-center py-1 space-x-1 rounded-md backdrop-filter backdrop-blur-lg"
              :class="!post.header ? 'pl-0 pr-2 text-gray-500 dark:text-gray-400' : 'px-2'"
            >
              <IconClock class="w-4 h-4" />
              <div>{{ getReadingTime }} dakika okuma</div>
            </div>

            <div
              class="flex items-center px-2 py-1 space-x-1 rounded-md backdrop-filter backdrop-blur-lg"
              :class="!post.header && 'text-gray-500 dark:text-gray-400'"
            >
              <IconCalendar class="w-4 h-4" />
              <div>{{ getReadableDate }}</div>
            </div>
          </div>
        </div>

        <article>
          <header class="space-y-4 text-center mb-12 sm:(text-left pr-16)">
            <div class="space-y-2">
              <h1
                class="block text-2xl font-semibold text-gray-900 sm:text-4xl dark:text-gray-100"
              >{{ post.title }}</h1>

              <p class="dark:text-gray-100">{{ post.description }}</p>
            </div>
          </header>

          <div class="mt-4">
            <div class="sticky hidden float-left -ml-20 text-right top-4 md:block">
              <BlogShare type="vertical" :title="post.title" :path="$route.path" />
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

        <div class="mt-10 space-y-10">
          <BlogPrevNext :current-slug="post.slug" />

          <div>
            <h3 class="mb-1 text-lg font-medium text-gray-900 dark:text-gray-100">Yazıyı paylaş</h3>

            <BlogShare :title="post.title" :path="$route.path" />
          </div>

          <div v-if="getTags.length > 0">
            <h3 class="mb-1 text-lg font-medium text-gray-900 dark:text-gray-100">Etiketler</h3>

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
                class="rounded-lg bg-gray-200 bg-opacity-40 text-center py-1 px-2 transition-shadow text-gray-800 truncate dark:(bg-gray-800 text-gray-200) hover:shadow-md"
              >{{ tag }}</SmartLink>
            </div>
          </div>

          <div v-if="getRelatedPosts.length > 0">
            <h3
              class="mb-1 text-lg font-medium text-gray-900 dark:text-gray-100"
            >Bunlar da hoşunuza gidebilir</h3>

            <div class="grid gap-2 sm:grid-cols-3">
              <SmartLink
                v-for="(relatedPost, index) in getRelatedPosts"
                :key="`related-${index}`"
                :href="`/blog/gonderi/${relatedPost.slug}`"
                class="rounded-lg bg-gray-200 bg-opacity-40 text-center p-4 transition-shadow text-gray-800 truncate dark:(bg-gray-800 text-gray-200) hover:shadow-md"
              >{{ relatedPost.title }}</SmartLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.nuxt-content {
  /* Headings */
  h1,
  h2,
  h3 {
    @apply font-semibold mb-2 text-gray-900 dark:text-gray-200 hover:underline;
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
    @apply text-gray-800 leading-relaxed dark:text-gray-300;

    &.text-center {
      @apply flex justify-center;
    }

    strong {
      @apply font-medium text-gray-900 dark:text-gray-200;
    }

    a {
      @apply text-blue-700 dark:text-blue-400 hover:underline;
    }

    code {
      @apply font-sans bg-gray-100 text-fuchsia-600 py-px px-2 dark:bg-gray-700;
    }

    &:not(:last-child) {
      @apply mb-6;
    }
  }

  /* Smart image */
  div[smart-image] {
    @apply rounded mx-auto max-w-full mb-5 w-max;
  }

  /* Ratings */
  .ratings {
    @apply space-y-px mb-4 dark:text-gray-300;
  }

  /* Pre and code block filenames */

  .nuxt-content-highlight {
    @apply mb-5 relative;

    .filename {
      @apply font-light mt-3 mr-3 text-sm right-0 text-gray-300 z-10 absolute;
    }

    pre {
      @apply rounded-md py-4 px-6;
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
    @apply list-disc pl-6;

    &:not(:last-child) {
      @apply mb-5;
    }

    li::marker {
      @apply text-gray-600;
    }
  }

  /* Horizontal line */
  hr {
    @apply border-dashed border-gray-300 my-8 dark:border-gray-700;
  }

  /* Notification */
  .notification {
    @apply mb-4;
  }
}
</style>
