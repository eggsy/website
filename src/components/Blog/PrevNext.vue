<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { FetchReturn } from "@nuxt/content/types/query-builder"

export default Vue.extend({
  props: {
    currentSlug: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      prev: {} as FetchReturn,
      next: {} as FetchReturn,
    }
  },
  async fetch() {
    const [prev, next] = (await this.$content("blog")
      .only(["title", "slug"])
      .sortBy("createdAt", "asc")
      .surround(this.currentSlug)
      .fetch()) as FetchReturn[]

    this.prev = prev
    this.next = next
  },
})
</script>

<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="$fetchState.pending === false && !$fetchState.error"
      class="grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2"
    >
      <component
        :is="prev ? 'SmartLink' : 'div'"
        :href="prev && `/blog/${prev.slug}`"
        class="rounded-lg card-base flex items-center space-x-2"
        :class="
          !prev
            ? 'cursor-not-allowed'
            : 'dark:hover:text-white hover:bg-opacity-40'
        "
      >
        <IconChevron left class="h-4 w-4 flex-shrink-0" />

        <span v-if="prev" class="truncate">{{ prev.title }}</span>
        <span v-else class="truncate">Eski Gönderi Yok</span>
      </component>

      <component
        :is="next ? 'SmartLink' : 'div'"
        :href="next && `/blog/${next.slug}`"
        class="rounded-lg card-base flex items-center space-x-2 justify-end"
        :class="
          !next
            ? 'cursor-not-allowed'
            : 'dark:hover:text-white hover:bg-opacity-40'
        "
      >
        <span v-if="next" class="truncate">{{ next.title }}</span>
        <span v-else class="truncate">Yeni Gönderi Yok</span>

        <IconChevron right class="h-4 w-4 flex-shrink-0" />
      </component>
    </div>
  </transition>
</template>
