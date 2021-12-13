<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { IContentDocument } from "@nuxt/content/types/content"

interface Post {
  title: string
  slug: string
}

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
      prev: {} as IContentDocument,
      next: {} as IContentDocument,
    }
  },
  async fetch() {
    const [prev, next] = (await this.$content()
      .only(["title", "slug"])
      .sortBy("createdAt", "asc")
      .surround(this.currentSlug)
      .fetch()) as IContentDocument[]

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
      <h4 lang="tr">Önceki Gönderi</h4>

      <SmartLink v-if="prev" :href="`/blog/gonderi/${prev.slug}`">
        <h5>{{ prev.title }}</h5>
      </SmartLink>

      <h5 v-else class="line-through">Daha Eski Bir Gönderi Yok</h5>
    </div>

    <div class="text-right">
      <h4 lang="tr">Sonraki Gönderi</h4>

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

  h4 {
    @apply font-medium text-lg text-gray-400 uppercase block dark:text-neutral-700;
  }

  h5 {
    @apply font-light text-xl text-gray-700 truncate dark:text-neutral-300;
  }
}
</style>
