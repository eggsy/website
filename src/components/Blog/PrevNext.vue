<template>
  <div
    v-if="$fetchState.pending === false && !$fetchState.error"
    class="grid grid-cols-1 gap-6 sm:grid-cols-2 dark:text-gray-200"
  >
    <div>
      <h4 class="font-medium">Önceki Gönderi</h4>

      <nuxt-link v-if="prev" :to="`/blog/gonderi/${prev.slug}`">
        <h5>
          {{ prev.title }}
        </h5>
      </nuxt-link>

      <h5 v-else class="line-through">Daha Eski Bir Gönderi Yok</h5>
    </div>

    <div class="text-right">
      <h4 class="font-medium">Sonraki Gönderi</h4>

      <nuxt-link v-if="next" :to="`/blog/gonderi/${next.slug}`">
        <h5>
          {{ next.title }}
        </h5>
      </nuxt-link>

      <h5 v-else class="line-through">Daha Yeni Bir Gönderi Yok</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentSlug: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      prev: {},
      next: {},
    }
  },
  async fetch() {
    const [prev, next] = await this.$content()
      .only(["title", "slug"])
      .sortBy("createdAt", "asc")
      .surround(this.currentSlug)
      .fetch()

    this.prev = prev
    this.next = next
  },
}
</script>

<style lang="scss" scoped>
div {
  a {
    @apply hover:underline;
  }

  h4 {
    @apply block text-lg font-medium text-gray-900 dark:text-gray-100;
  }

  h5 {
    @apply text-xl font-light text-gray-700 truncate dark:text-gray-300;
  }
}
</style>
