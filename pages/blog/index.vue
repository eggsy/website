<script setup lang="ts">
const { $prepareMeta } = useNuxtApp()

const formatter = new Intl.DateTimeFormat("tr-TR", {
  month: "short",
  day: "numeric",
})

const { data: posts, status } = await useLazyAsyncData("posts", () =>
  queryCollection("posts")
    .select("title", "createdAt", "path")
    .order("createdAt", "DESC")
    .all(),
)

useHead({
  title: "Blog",
  meta: $prepareMeta({
    title: "EGGSY's Blog",
    description:
      "Yazılım, teknoloji, günlük hayat ve maceralarımla ilgili yazdığım yazılar.",
  }),
})

const getYearGroupedPosts = computed(() => {
  const yearsOfPosts = new Map() as Map<number, typeof posts.value>

  if (!posts.value) return new Map()

  for (const post of posts?.value) {
    if (!post.createdAt) continue
    const year = new Date(post.createdAt).getFullYear()

    if (yearsOfPosts.has(year)) {
      yearsOfPosts.get(year)?.push(post)
    } else {
      yearsOfPosts.set(year, [post])
    }
  }

  const years = [...yearsOfPosts.keys()].sort((a, b) => b - a)
  const sortedByYears = new Map() as Map<number, typeof posts.value>

  for (const year of years) {
    sortedByYears.set(year, yearsOfPosts.get(year)!)
  }

  return sortedByYears
})
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <LoadersBlog v-if="status === 'pending'" />

      <div v-else class="mt-12 space-y-10">
        <section
          v-for="[year, posts] in getYearGroupedPosts"
          :key="year"
          class="space-y-4"
        >
          <h1 class="text-3xl font-bold text-black/90 dark:text-white/90">
            {{ year }}
          </h1>

          <div class="space-y-3">
            <NuxtLink
              v-for="post in posts"
              :key="post.path"
              :to="post.path"
              class="flex items-start gap-6 card-base rounded-lg"
            >
              <span
                class="w-[20%] text-black/50 dark:text-white/50 md:w-1/12 flex-shrink-0"
              >
                {{ formatter.format(new Date(post.createdAt)) }}
              </span>

              <span
                class="text-blue-600 dark:text-blue-300 font-medium leading-relaxed"
              >
                {{ post.title }}
              </span>
            </NuxtLink>
          </div>
        </section>
      </div>
    </Transition>
  </div>
</template>
