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
    const post = this.post
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
    getTags(): string[] {
      return this.post?.tags || []
    },
    getReadingTime() {
      return this.$getReadingTime(JSON.stringify(this.post.body))
    },
    getReadableDate() {
      return this.$getReadableDate(new Date(this.post?.createdAt))
    },
    getRelatedPosts(): RelatedPost[] {
      return this.related || []
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

    <div v-else class="pt-4 mt-10">
      <article>
        <header class="space-y-8 leading-relaxed text-center mb-18">
          <NuxtImg
            v-if="post.header"
            :src="post.header"
            class="h-30 w-full ring-1 dark:ring-white/10 ring-black/10 hover:object-bottom object-top duration-2000 transition-all object-cover rounded-lg"
            alt="Post header"
          />

          <div class="space-y-4">
            <div
              class="flex items-center justify-center gap-x-6 gap-y-2 flex-wrap dark:text-white/30 text-black/50 sm:text-sm"
            >
              <div class="flex items-center space-x-2">
                <IconCalendar class="h-4 w-4" />
                <span>{{ getReadableDate }}</span>
              </div>

              <div class="flex items-center space-x-2">
                <IconTag class="h-4 w-4" />
                <span>{{ getTags.join(" － ") }}</span>
              </div>

              <div class="flex items-center space-x-2">
                <IconEye class="h-4 w-4" />
                <span>{{ getReadingTime }} dakika okuma</span>
              </div>
            </div>

            <div class="space-y-2">
              <h1
                class="block text-2xl md:w-11/12 mx-auto font-bold text-black sm:text-4xl dark:text-white"
              >
                {{ post.title }}
              </h1>

              <p class="text-black/50 md:w-9/12 mx-auto dark:text-white/50">
                {{ post.description }}
              </p>
            </div>
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

          <NuxtContent :document="post" class="max-w-full prose prose-blue" />
        </div>
      </article>

      <Disqus
        v-if="!$config.isDev"
        :title="post.title"
        :url="`https://eggsy.xyz/blog/${post.slug}`"
        :identifier="`/blog/${post.slug}`"
        :slug="post.slug"
        lang="tr"
        class="mt-10"
      />

      <div class="mt-16 space-y-10">
        <div v-if="getRelatedPosts.length > 0" class="space-y-2">
          <h3 class="dark:text-white/30 text-black/50 text-sm">
            Benzer Gönderiler
          </h3>

          <div v-if="getRelatedPosts.length" class="grid gap-4 sm:grid-cols-2">
            <NuxtLink
              v-for="(relatedPost, index) in getRelatedPosts"
              :key="`related-${index}`"
              :to="`/blog/${relatedPost.slug}`"
              class="rounded-lg border-[0.1px] p-4 bg-opacity-25 bg-neutral-300 border-neutral-200 dark:(bg-neutral-800/30 border-neutral-800) flex items-center space-x-2 hover:bg-opacity-40 transition-colors dark:text-white/80 dark:hover:text-white transition-colors"
            >
              <IconDocument class="h-4 w-4" />
              <span class="truncate">{{ relatedPost.title }}</span>
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="dark:text-white/30 text-black/50 text-sm">
            Okumaya Devam Et
          </h3>

          <BlogPrevNext :current-slug="post.slug" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.dark .nuxt-content-highlight {
  box-shadow: 0 0 0 100vmax #1b1917;
}

.light .nuxt-content-highlight {
  box-shadow: 0 0 0 100vmax #282c34;
}

.nuxt-content {
  .nuxt-content-highlight {
    clip-path: inset(0 -100vmax);

    @apply mb-5 relative;

    .filename {
      @apply font-light mt-3 mr-3 text-xs right-0 text-white/50 z-10 absolute;
    }

    pre {
      @apply rounded-none py-4 px-0;
    }
  }

  ol {
    @apply pl-0;
  }

  video {
    @apply rounded-lg;
  }

  kbd {
    @apply rounded-lg bg-black/10 dark:(bg-white/10 border-white/30) px-2 py-1 text-sm border-b-2 border-black/30 cursor-default;
  }

  code {
    @apply bg-blue-100 py-px px-1 text-blue-600 dark:bg-white/5;

    &::before,
    &::after {
      content: "`";
    }
  }
}
</style>
