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
      bodyAttrs: {
        class: "overflow-x-hidden",
      },
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

    <div v-else class="space-x-6 pt-4">
      <div class="mx-auto w-full" :class="post.header && 'space-y-10'">
        <div class="min-h-16 relative">
          <SmartImage
            v-if="post.header"
            :src="post.header"
            class="h-60 -mx-[4.25vw] filter md:-mx-[20.75vw] dark:brightness-75"
          />

          <div
            class="flex space-x-2 text-white right-0 bottom-2 left-0 absolute items-center justify-center select-none whitespace-nowrap sm:justify-start"
          >
            <div
              class="rounded-md flex space-x-1 py-1 items-center backdrop-filter backdrop-blur-lg"
              :class="
                !post.header
                  ? 'pl-0 pr-2 text-gray-500 dark:text-gray-400'
                  : 'px-2'
              "
            >
              <IconClock class="h-4 w-4" />
              <div>{{ getReadingTime }} dakika okuma</div>
            </div>

            <div
              class="rounded-md flex space-x-1 py-1 px-2 items-center backdrop-filter backdrop-blur-lg"
              :class="!post.header && 'text-gray-500 dark:text-gray-400'"
            >
              <IconCalendar class="h-4 w-4" />
              <div>{{ getReadableDate }}</div>
            </div>
          </div>
        </div>

        <article>
          <header class="space-y-4 text-center mb-12 sm:(text-left pr-16) ">
            <div class="space-y-2">
              <h1
                class="font-semibold text-2xl text-gray-700 block sm:text-4xl dark:text-neutral-300"
              >
                {{ post.title }}
              </h1>

              <p class="text-neutral-500">{{ post.description }}</p>
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

        <div class="space-y-12 mt-10">
          <BlogPrevNext :current-slug="post.slug" />

          <!-- Share -->
          <div>
            <h3
              class="font-medium text-lg mb-1 text-gray-400 uppercase dark:text-neutral-700"
            >
              Yazıyı paylaş
            </h3>

            <BlogShare :title="post.title" :path="$route.path" />
          </div>

          <!-- Tags -->
          <div v-if="getTags.length > 0">
            <h3
              class="font-medium text-lg mb-1 text-gray-400 uppercase dark:text-neutral-700"
            >
              Etiketler
            </h3>

            <div class="flex flex-wrap space-x-2">
              <Button
                v-for="(tag, index) in getTags"
                :key="`tag-${index}`"
                :href="{
                  name: 'blog',
                  query: {
                    etiket: tag,
                  },
                }"
                elevated
                tight
              >
                {{ tag }}
              </Button>
            </div>
          </div>

          <!-- Related posts -->
          <div v-if="getRelatedPosts.length > 0">
            <h3
              class="font-medium text-lg mb-1 text-gray-900 dark:text-gray-100"
            >
              Bunlar da hoşunuza gidebilir
            </h3>

            <div class="grid gap-2 sm:grid-cols-3">
              <Card
                v-for="(relatedPost, index) in getRelatedPosts"
                :key="`related-${index}`"
                :href="`/blog/gonderi/${relatedPost.slug}`"
                :title="relatedPost.title"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
/* Mixins */
@mixin code {
  @apply font-sans bg-blue-100 py-px px-1 text-blue-600 dark:(bg-blue-900 bg-opacity-50 text-blue-400) ;

  &::before,
  &::after {
    content: "`";
  }
}

/* Nuxt Content */
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
    @apply leading-relaxed text-gray-800 dark:text-gray-300;

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
      @include code;
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
      @apply rounded-none py-4 px-6;
    }
  }

  /* Ordered and Unordered Lists */
  ol,
  ul {
    @apply text-gray-800 dark:text-gray-300;

    li a {
      @apply text-blue-700 dark:text-blue-400 hover:underline;
    }

    li code {
      @include code;
    }

    li:not(:last-child) {
      @apply mb-1;
    }
  }

  ol {
    @apply list-decimal pl-4;

    li:not(:last-child) {
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
