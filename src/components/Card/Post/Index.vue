<script lang="ts">
import Vue, { PropType } from "vue"

/* Interfaces */
import type { Post } from "@/types/Post"

export interface PostMeta {
  title?: string
  description?: string
  slug?: string
  special?: boolean
  tag?: string
  image?: string
  date?: Date
}

export default Vue.extend({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
      default: () => {},
    },
    type: {
      type: String,
      required: false,
      default: "normal",
    },
  },
  data() {
    return {
      hovered: false,
    }
  },
  computed: {
    /**
     * Returns post meta safely.
     * @returns {PostMeta |null}
     */
    getPostMeta(): PostMeta {
      if (!this.post) return {}

      const image =
        this.post?.image || `/assets/images/posts/${this.post?.slug}.jpg` || ""

      return {
        title: this.post.title || "",
        description: this.post.description || "",
        slug: this.post.slug || "",
        special: this.post.special || false,
        tag: this.post?.tags?.[0] || "",
        date: this.post?.createdAt,
        image,
      }
    },
  },
})
</script>

<template>
  <!-- Normal -->
  <CardPostNormal v-if="type === 'normal'" :meta="getPostMeta" />

  <!-- Text -->
  <CardPostText v-else-if="type === 'text'" :meta="getPostMeta" />

  <!-- Text and Title -->
  <CardPostTextTitle
    v-else-if="type === 'text-only-title'"
    :meta="getPostMeta"
  />
</template>
