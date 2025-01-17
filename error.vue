<script setup lang="ts">
interface ErrorProps {
  title: string
  statusCode: number
  description: string
}

const props = withDefaults(
  defineProps<{
    error: ErrorProps | null
  }>(),
  {
    error: null,
  },
)

const errors = {
  400: {
    title: "Bad Request",
    description: "Bad, bad request!",
  },
  401: {
    title: "Unauthorized",
    description:
      "This page requires some authorization stuff, or maybe you can't just access this.",
  },
  403: {
    title: "Forbidden",
    description: "Maybe you shouldn't be here!",
  },
  404: {
    title: "Page Not Found",
    description: "Are you sure you entered a right URL?",
  },
  500: {
    title: "Internal Server Error",
    description:
      "Lucky. This is not related to you. It's my fault. Please reach me out so that I can fix this issue.",
  },
}

useHead({
  title: `Error ${props.error?.statusCode}`,
})

/**
 * Checks through the common error object and returns the title-description if exists.
 * @returns {{title: string, description: string}} The object that contains error title and description.
 */
const getErrorMeta = computed((): { title: string; description: string } => {
  const statusCode = props.error?.statusCode

  return {
    // @ts-ignore-next-line
    title: errors[statusCode]?.title || "Unknown",
    // @ts-ignore-next-line
    description: errors[statusCode]?.description || "No description.",
  }
})

onMounted(() => {
  console.error(props.error)
})

/**
 * Refreshes the page.
 */
const refresh = () => {
  window.location.reload()
}
</script>
s

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-neutral-900">
    <Navbar class="pt-10" />

    <!-- Nuxt component -->
    <main class="responsive-screen min-h-screen pb-8">
      <div class="space-y-4 py-8">
        <div class="space-y-2">
          <h1 class="text-black/90 dark:text-white/90 font-semibold text-2xl">
            An error occured
          </h1>

          <p class="text-lg text-black/50 dark:text-white/30">
            Here are the details:
          </p>
        </div>

        <div class="rounded card-base gap-6 flex flex-col md:flex-row">
          <SmartImage
            :src="`https://http.cat/${error?.statusCode}.jpg`"
            class="rounded w-full md:w-80 flex-shrink-0"
          />

          <div class="space-y-6 whitespace-normal">
            <div class="flex flex-col space-y-2">
              <PageTitle> Title </PageTitle>
              <span class="text-black/50 dark:text-white/30">{{
                getErrorMeta.title
              }}</span>
            </div>

            <div class="flex flex-col space-y-2">
              <PageTitle> Description </PageTitle>
              <span class="text-black/50 dark:text-white/30">{{
                getErrorMeta.description
              }}</span>
            </div>

            <div class="flex flex-col space-y-2">
              <PageTitle> Details </PageTitle>
              <pre
                class="whitespace-pre-wrap text-black/50 dark:text-white/30"
                >{{ JSON.stringify(error, null, 2) }}</pre
              >
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between md:justify-start flex-wrap gap-4"
        >
          <Button icon="heroicons:chevron-left" @click.native="$router.back()"
            >Go Back</Button
          >
          <Button icon="heroicons:arrow-path-solid" @click.native="refresh"
            >Refresh Page</Button
          >
        </div>
      </div>
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Go to top button -->
    <GoTop />
  </div>
</template>

<style lang="scss" scoped>
button {
  @apply rounded cursor-pointer bg-gray-200 py-2 px-4 transition-colors text-gray-900 select-none dark:bg-neutral-800 dark:text-gray-100 dark:hover:bg-neutral-700 hover:bg-gray-300 focus:outline-none;
}
</style>
