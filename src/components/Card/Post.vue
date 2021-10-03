<script lang="ts">
import Vue, { PropType } from "vue"

/* Interfaces */
import type { Post } from "@/types/Post"

interface PostMeta {
  title?: string
  description?: string
  slug?: string
  special?: boolean
  tag?: string
  image?: string
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
        image,
      }
    },
    /**
     * Returns post formatted post date that is nicer than the pure way.
     * @returns {string| null} The formatted date.
     */
    getPostDate(): string | null {
      if (!this.post || !this.post.createdAt) return null
      return this.$getReadableDate(this.post.createdAt)
    },
  },
})
</script>

<template>
  <SmartLink
    v-if="type === 'normal'"
    :title="getPostMeta.title"
    :href="{
      name: 'blog-gonderi-slug',
      params: { slug: getPostMeta.slug },
    }"
    class="
      p-3
      space-y-2
      transition-all
      transform
      duration-100
      bg-gray-200
      rounded-lg
      cursor-pointer
      bg-opacity-40
      hover:(shadow-md
      scale-102)
      dark:bg-gray-800
    "
  >
    <SmartImage
      :src="getPostMeta.image"
      class="w-full rounded h-34 filter dark:brightness-75"
    />

    <div class="flex flex-col">
      <span
        class="
          text-sm
          font-medium
          leading-tight
          text-gray-600
          uppercase
          dark:text-gray-400
        "
      >
        {{ getPostMeta.tag }}
      </span>

      <h2
        class="
          text-lg
          font-bold
          leading-tight
          text-gray-800
          truncate
          dark:text-gray-200
        "
      >
        {{ getPostMeta.title }}
      </h2>

      <p class="text-gray-700 line-clamp-2 dark:text-gray-300">
        {{ getPostMeta.description }}
      </p>
    </div>
  </SmartLink>

  <SmartLink
    v-else-if="type === 'text'"
    :title="getPostMeta.title"
    :href="{
      name: 'blog-gonderi-slug',
      params: { slug: getPostMeta.slug },
    }"
    class="
      flex
      items-center
      p-3
      space-x-4
      transition-all
      transform
      duration-100
      bg-gray-200
      rounded-lg
      cursor-pointer
      bg-opacity-40
      hover:(shadow-md
      scale-102)
      dark:bg-gray-800
    "
  >
    <SmartImage
      :src="getPostMeta.image"
      class="flex-shrink-0 w-24 h-20 rounded filter dark:brightness-75"
    />

    <div class="flex flex-col overflow-x-hidden">
      <h2
        class="text-lg font-semibold text-gray-800 truncate dark:text-gray-200"
      >
        {{ getPostMeta.title }}
      </h2>

      <p class="text-gray-700 line-clamp-2 dark:text-gray-300">
        {{ getPostMeta.description }}
      </p>
    </div>
  </SmartLink>

  <SmartLink
    v-else-if="type === 'text-only-title'"
    :title="getPostMeta.title"
    :href="{
      name: 'blog-gonderi-slug',
      params: { slug: getPostMeta.slug },
    }"
    class="
      flex flex-col
      p-3
      truncate
      transition-all
      transform
      duration-100
      bg-gray-200
      rounded-lg
      cursor-pointer
      bg-opacity-40
      hover:(shadow-md
      scale-102)
      dark:bg-gray-800
    "
  >
    <h2 class="text-lg text-gray-800 truncate dark:text-gray-200">
      {{ getPostMeta.title }}
    </h2>

    <div class="flex items-center space-x-1">
      <IconFire
        v-if="getPostMeta.special"
        v-tippy="{
          content: 'Popüler gönderi',
          placement: 'bottom',
        }"
        class="w-5 h-5 text-red-600 dark:text-red-500"
      />

      <div class="flex items-center space-x-2 text-gray-700 dark:text-gray-400">
        <IconClock class="w-5 h-5" />
        <span>{{ getPostDate }}</span>
      </div>
    </div>
  </SmartLink>
</template>
