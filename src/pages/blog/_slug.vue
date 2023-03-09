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
    const post = (await this.$content(
      "blog",
      this.$route.params.slug
    ).fetch()) as Post

    if (!post) this.$router.push("/blog")
    else {
      this.post = post

      if (post.related && post.related?.length > 0) {
        const array = []

        for (const key of post.related) {
          const { title }: any = await this.$content("blog", key)
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
    const { getTags } = this as {
      getTags: string[]
    }

    const title = post.title
    const description =
      post.description || "EGGSY'nin blogunda bu yazıyı okumaya davet edildin."

    const tags = getTags?.join(", ") || title
    const href = `https://eggsy.xyz${this.$route?.path}`
    const image = `/og-images/${post.slug}.png`

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
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "article:published-time",
            content: post?.createdAt || null,
          },
          {
            name: "twitter:label1",
            content: "Tarih",
          },
          {
            name: "twitter:data1",
            content: post?.createdAt,
          },
          {
            name: "twitter:label2",
            content: "Okuma Süresi",
          },
          {
            name: "twitter:data2",
            content: `${this.getReadingTime} dakika`,
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
            class="h-60 -mx-[4.25vw] filter md:-mx-[20.75vw] dark:brightness-75"
          />

          <div
            class="absolute left-0 right-0 flex flex-wrap items-center justify-center px-4 space-x-2 text-white select-none bottom-2 whitespace-nowrap sm:justify-start"
          >
            <div
              class="flex items-center py-1 space-x-1 rounded-md backdrop-filter backdrop-blur-lg"
              :class="
                !post.header
                  ? 'pl-0 pr-2 text-gray-500 dark:text-gray-400'
                  : 'px-2'
              "
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

        <article class="px-4">
          <header class="space-y-4 text-center mb-12 sm:(text-left pr-16)">
            <div class="space-y-2">
              <h1
                class="block text-2xl font-bold text-black sm:text-4xl dark:text-white"
              >
                {{ post.title }}
              </h1>

              <p class="text-black/50 dark:text-white/50">
                {{ post.description }}
              </p>
            </div>
          </header>

          <div class="mt-4">
            <template v-if="!post.indicatorsHidden">
              <div
                class="sticky z-10 hidden float-left -ml-20 text-right top-4 md:block"
              >
                <BlogShare
                  type="vertical"
                  :title="post.title"
                  :path="$route.path"
                />
              </div>

              <div
                class="sticky z-10 hidden float-right text-left -mr-14 top-4 md:block"
              >
                <BlogReadingIndicator selector=".nuxt-content" />
              </div>
            </template>

            <BlogTableOfContents :toc="post.toc" />

            <NuxtContent :document="post" />
          </div>
        </article>

        <Disqus
          v-if="!$config.isDev"
          :title="post.title"
          :url="`https://eggsy.xyz/blog/gonderi/${post.slug}`"
          :identifier="`/blog/gonderi/${post.slug}`"
          :slug="post.slug"
          lang="tr"
          class="px-4 mt-10"
        />

        <div class="px-4 mt-10 space-y-12">
          <!-- Related posts -->
          <div v-if="getRelatedPosts.length > 0" class="space-y-2">
            <Title :padding="false">Benzer İçerikler</Title>

            <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <CardPost
                v-for="(relatedPost, index) in getRelatedPosts"
                :key="`related-${index}`"
                :post="relatedPost"
              />
            </div>
          </div>

          <BlogPrevNext :current-slug="post.slug" />

          <!-- Share -->
          <div class="space-y-2">
            <Title :padding="false">Yazıyı paylaş</Title>

            <BlogShare :title="post.title" :path="$route.path" />
          </div>

          <!-- Tags -->
          <div v-if="getTags.length > 0" class="space-y-2">
            <Title :padding="false" lang="tr">Etiketler</Title>

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
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
/* Mixins */
@mixin code {
  @apply font-sans bg-blue-100 py-px px-1 text-blue-600 dark:(bg-blue-900 bg-opacity-50 text-blue-400);

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
    @apply font-semibold mb-2 transition-all text-gray-900 dark:text-gray-200;

    &:hover {
      a .icon.icon-link {
        @apply text-neutral-500 hover:text-neutral-200;

        &::before {
          content: "#";
          @apply text-lg pl-2 transition-colors;
        }
      }
    }
  }

  h1 {
    @apply text-3xl;
  }

  h2 {
    @apply text-2xl;
  }

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
      @apply font-semibold text-gray-900 dark:text-gray-200;
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

  /* Block quotes */
  blockquote {
    @apply rounded-md bg-gray-100 ml-0 w-full py-2 px-4 md:w-max dark:bg-neutral-800;
  }

  /* Smart image */
  div[smart-image] {
    @apply rounded mx-auto max-w-full mb-7 w-max;

    &.caption {
      @apply mb-12;
    }
  }

  /* Ratings */
  .ratings {
    @apply space-y-px mb-4 dark:text-gray-300;
  }

  /* Pre and code block filenames */

  .nuxt-content-highlight {
    box-shadow: 0 0 0 100vmax #282c34;
    clip-path: inset(0 -100vmax);
    @apply mb-5 relative text-sm;

    .filename {
      @apply font-light mt-3 mr-3 text-sm right-0 text-gray-300 z-10 absolute;
    }

    pre {
      @apply rounded-none py-4 px-0;
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

  /* Keyboard */
  kbd {
    @apply rounded-lg cursor-pointer bg-neutral-300 py-1 px-2 transition-colors text-neutral-600 select-none dark:(bg-neutral-800 text-neutral-400 hover:bg-neutral-700) hover:bg-neutral-200;
  }

  /* Video */
  video {
    @apply rounded w-full;
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
