<script lang="ts">
import Vue, { PropType } from "vue"

export default Vue.extend({
  layout: "default",
  props: {
    error: {
      type: Object as PropType<{
        title: string
        statusCode: number
        description: string
      }>,
      default: null,
    },
  },
  data() {
    return {
      errors: {
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
      },
    }
  },
  head() {
    return {
      title: `Error ${this.$props.error.statusCode}`,
    }
  },
  computed: {
    /**
     * Checks through the common error object and returns the title-description if exists.
     * @returns {{title: string, description: string}} The object that contains error title and description.
     */
    getErrorMeta(): { title: string; description: string } {
      const statusCode = this.error.statusCode

      return {
        // @ts-ignore-next-line
        title: this.errors[statusCode]?.title || "Unknown",
        // @ts-ignore-next-line
        description: this.errors[statusCode]?.description || "No description.",
      }
    },
  },
  mounted() {
    console.error(this.$props.error)
  },
  methods: {
    /**
     * Refreshes the page.
     */
    refresh() {
      window.location.reload()
    },
  },
})
</script>

<template>
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
        :src="`https://http.cat/${error.statusCode}.jpg`"
        class="rounded w-full md:w-80"
      />

      <div class="space-y-6 whitespace-normal">
        <div class="flex flex-col space-y-2">
          <Title> Title </Title>
          <span class="text-black/50 dark:text-white/30">{{
            getErrorMeta.title
          }}</span>
        </div>

        <div class="flex flex-col space-y-2">
          <Title> Description </Title>
          <span class="text-black/50 dark:text-white/30">{{
            getErrorMeta.description
          }}</span>
        </div>

        <div class="flex flex-col space-y-2">
          <Title> Details </Title>
          <pre class="whitespace-pre-wrap text-black/50 dark:text-white/30">{{
            JSON.stringify(error, null, 2)
          }}</pre>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-between md:justify-start flex-wrap gap-4"
    >
      <Button icon="IconBack" @click.native="$router.back()">Go Back</Button>
      <Button icon="IconSync" @click.native="refresh">Refresh Page</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  @apply rounded cursor-pointer bg-gray-200 py-2 px-4 transition-colors text-gray-900 select-none dark:(bg-neutral-800 text-gray-100 hover:bg-neutral-700) hover:bg-gray-300 focus:outline-none;
}
</style>
