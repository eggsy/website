<script setup lang="ts">
const { $applyMediumZoom, $getReadingTime, $getReadableDate, $prepareMeta } =
  useNuxtApp()
const route = useRoute()

const {
  data: post,
  status,
  error,
} = await useAsyncData(route.path, () =>
  queryCollection("posts").path(route.path).first(),
)

const { data: relatedPosts } = await useLazyAsyncData(
  `${route.path}-related`,
  async () => {
    if (!post.value) return

    return queryCollection("posts")
      .where(
        "path",
        "IN",
        post.value?.related.map((path) => `/blog/${path}`),
      )
      .select("title", "path")
      .all()
  },
  {
    watch: [post],
  },
)

const getTags = computed((): string[] => {
  return post.value?.tags || []
})

const getReadingTime = computed(() => {
  return $getReadingTime(JSON.stringify(post.value?.body))
})

// Head meta
useHead(() => {
  const title = post.value?.title
  const description =
    post.value?.description ||
    "EGGSY'nin blogunda bu yazıyı okumaya davet edildin."

  const tags = getTags.value?.join(", ") || title
  const href = `https://eggsy.xyz${route?.path}`
  const image = `/og-images/${post.value?.path.split("/")[1]}.png`

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
    meta: $prepareMeta(
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
          content: post.value?.createdAt || null,
        },
        {
          name: "twitter:label1",
          content: "Tarih",
        },
        {
          name: "twitter:data1",
          content: post.value?.createdAt,
        },
        {
          name: "twitter:label2",
          content: "Okuma Süresi",
        },
        {
          name: "twitter:data2",
          content: `${getReadingTime.value} dakika`,
        },
      ],
    ),
  }
})

const getReadableDate = computed(() => {
  return $getReadableDate(new Date(post.value?.createdAt || Date.now()))
})

watchEffect(async () => {
  if (status.value !== "success" || typeof window === "undefined") return

  await nextTick()
  $applyMediumZoom()
})
</script>

<template>
  <div>
    <Transition name="fade">
      <LoadersContent
        v-if="status === 'pending' || error !== null"
        :error="status !== 'pending' && error !== null"
      />

      <div v-else-if="post" class="pt-4 mt-10">
        <header class="space-y-4 mb-24 mt-12">
          <div
            class="flex flex-wrap items-center gap-x-6 gap-y-2 dark:text-white/30 text-black/50 text-base sm:text-sm"
          >
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:calendar" class="w-4 h-4" />
              <span>{{ getReadableDate }}</span>
            </div>

            <div class="flex items-center space-x-2">
              <Icon name="heroicons:tag" class="w-4 h-4" />
              <span>{{ getTags.join(" － ") }}</span>
            </div>

            <div class="flex items-center space-x-2">
              <Icon name="heroicons:eye" class="w-4 h-4" />
              <span>{{ getReadingTime }} dakika okuma</span>
            </div>
          </div>

          <div class="space-y-2">
            <h1
              class="block text-2xl font-bold text-black text-balance sm:text-4xl dark:text-white"
            >
              {{ post.title }}
            </h1>

            <p class="text-black/50 dark:text-white/50 text-balance">
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
              <BlogReadingIndicator selector=".prose" />
            </div>
          </template>

          <BlogTableOfContents
            v-if="post.body.toc"
            :toc="post.body.toc.links"
          />

          <article
            class="max-w-full prose dark:prose-invert prose-a:no-underline"
          >
            <ContentRenderer v-if="post" :value="post" />
          </article>
        </div>

        <DisqusComments
          v-if="!$config.public.isDev"
          :title="post.title"
          :slug="post.path.split('/')[1]"
          :url="`https://eggsy.xyz/${post.path}`"
          :identifier="post.path"
          lang="tr"
          class="mt-10"
        />

        <div class="mt-16 space-y-10">
          <div v-if="relatedPosts && relatedPosts.length > 0" class="space-y-2">
            <h3 class="text-sm dark:text-white/30 text-black/50">
              Benzer Gönderiler
            </h3>

            <div
              v-if="relatedPosts.length"
              class="grid gap-4 grid-cols-1 sm:grid-cols-2"
            >
              <NuxtLink
                v-for="(relatedPost, index) in relatedPosts"
                :key="`related-${index}`"
                :to="relatedPost.path"
                class="rounded-lg border-[0.1px] p-4 bg-neutral-300 bg-opacity-25 border-neutral-200 flex items-center space-x-2 transition-colors hover:bg-opacity-40 dark:bg-neutral-800/30 dark:border-neutral-800 dark:text-white/80 dark:hover:text-white"
              >
                <Icon name="mdi:document" class="w-4 h-4" />
                <span class="truncate">{{ relatedPost.title }}</span>
              </NuxtLink>
            </div>
          </div>

          <div class="space-y-2">
            <h3 class="text-sm dark:text-white/30 text-black/50">
              Okumaya Devam Et
            </h3>

            <BlogPrevNext :path="post.path" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.dark .prose .shiki {
  box-shadow: 0 0 0 100vmax #0b0b0b;

  pre {
    @apply bg-neutral-800;
  }
}

.light .shiki {
  box-shadow: 0 0 0 100vmax #1f2937;
}

.prose {
  .shiki {
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
    @apply rounded-lg bg-black/10 px-2 py-1 text-sm border-b-2 border-black/30 cursor-default dark:bg-white/10 dark:border-white/30;
  }

  p code {
    @apply bg-blue-100 py-px px-1 text-blue-600 dark:bg-white/5;

    &::before,
    &::after {
      content: "`";
    }
  }
}
</style>
