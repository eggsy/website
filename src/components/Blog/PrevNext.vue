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
  <div
    v-if="$fetchState.pending === false && !$fetchState.error"
    class="grid gap-6 grid-cols-1 sm:grid-cols-2 dark:text-gray-200"
  >
    <div>
      <Title :padding="false" lang="tr">Önceki Gönderi</Title>

      <SmartLink v-if="prev" :href="`/blog/gonderi/${prev.slug}`">
        <h5>{{ prev.title }}</h5>
      </SmartLink>

      <h5 v-else class="line-through">Daha Eski Bir Gönderi Yok</h5>
    </div>

    <div class="text-right">
      <Title :padding="false" lang="tr">Sonraki Gönderi</Title>

      <SmartLink v-if="next" :href="`/blog/gonderi/${next.slug}`">
        <h5>{{ next.title }}</h5>
      </SmartLink>

      <h5 v-else class="line-through">Daha Yeni Bir Gönderi Yok</h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div {
  a {
    @apply hover:underline;
  }

  h5 {
    @apply font-light text-xl text-gray-700 truncate dark:text-neutral-300;
  }
}
</style>
