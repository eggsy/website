<script lang="ts">
import Vue, { PropType } from "vue"
// Import type
import type { PostMeta } from "./Index.vue"

export default Vue.extend({
  props: {
    meta: {
      type: Object as PropType<PostMeta>,
      required: true,
      default: () => {},
    },
  },
  computed: {
    getPostDate(): string | null {
      if (!this.meta || !this.meta.date) return null
      return this.$getReadableDate(this.meta.date)
    },
  },
})
</script>

<template>
  <SmartLink
    v-if="meta"
    :title="meta.title"
    :href="{
      name: 'blog-slug',
      params: { slug: meta.slug },
    }"
    class="rounded-lg cursor-pointer flex flex-col p-3 px-4 transition-colors focus-ring truncate hover:bg-gray-200/40 dark:hover:bg-neutral-800/40"
  >
    <h2 class="font-medium text-lg text-gray-800 truncate dark:text-gray-200">
      {{ meta.title }}
    </h2>

    <div class="flex space-x-1 items-center">
      <IconFire
        v-if="meta.special"
        v-tippy="{
          content: 'Popüler gönderi',
          placement: 'bottom',
        }"
        class="flex-shrink-0 h-5 text-red-600 w-5 dark:text-red-500"
      />

      <div
        class="flex space-x-2 text-gray-700 truncate items-center dark:text-gray-400"
      >
        <IconClock class="flex-shrink-0 h-5 w-5" />
        <span class="truncate">{{ getPostDate }}</span>
      </div>
    </div>
  </SmartLink>
</template>
