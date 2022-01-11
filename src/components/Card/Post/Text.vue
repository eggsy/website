<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    meta: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
})
</script>

<template>
  <SmartLink
    :title="meta.title"
    :href="{
      name: 'blog-gonderi-slug',
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
