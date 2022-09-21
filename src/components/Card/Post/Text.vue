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
    class="rounded-lg cursor-pointer flex space-x-4 p-3 transition-colors focus-ring items-center md:px-4 hover:bg-gray-200/40 dark:hover:bg-neutral-800/40"
  >
    <SmartImage
      :src="meta.image"
      class="rounded flex-shrink-0 h-20 w-24 filter dark:brightness-75"
    />

    <div class="flex flex-col overflow-x-hidden">
      <h2 class="font-medium text-lg text-gray-800 truncate dark:text-gray-200">
        {{ meta.title }}
      </h2>

      <p class="text-neutral-500 line-clamp-2">
        {{ meta.description }}
      </p>
    </div>
  </SmartLink>
</template>
