<template>
  <div
    v-if="type === 'normal'"
    class="p-4 bg-gray-100 rounded ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-800"
  >
    <div class="flex items-center space-x-3">
      <nuxt-link
        :to="{
          name: 'blog-gonderi-slug',
          params: { slug: getPostMeta.slug },
        }"
        class="relative flex-shrink-0 w-2/6 group"
      >
        <SkeletonLoader
          type="image"
          :image-url="getPostMeta.image"
          class="h-24 rounded-md"
        />

        <div
          class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-25 rounded-md opacity-0 group-hover:opacity-100"
        >
          <icon name="link" class="w-6 h-6 text-white" />
        </div>
      </nuxt-link>

      <div class="w-4/6">
        <nuxt-link
          :to="{
            name: 'blog-gonderi-slug',
            params: { slug: getPostMeta.slug },
          }"
          class="dark:text-gray-200 hover:underline"
        >
          <h2 class="font-semibold truncate" :title="getPostMeta.title">
            {{ getPostMeta.title }}
          </h2>
        </nuxt-link>

        <p class="text-gray-800 line-clamp-3 dark:text-gray-300">
          {{ getPostMeta.description }}
        </p>
      </div>
    </div>

    <div
      class="flex items-center mt-2 space-x-4 text-gray-700 justify-self-end dark:text-gray-400"
    >
      <div class="flex items-center space-x-2">
        <icon name="hashtag" class="w-4 h-4" />
        <nuxt-link
          :to="{
            name: 'blog',
            query: {
              etiket: getPostMeta.tag,
            },
          }"
          class="hover:underline"
        >
          {{ getPostMeta.tag }}
        </nuxt-link>
      </div>

      <div class="flex items-center space-x-2">
        <icon name="clock" class="w-4 h-4" />
        <span>{{ getPostDate }}</span>
      </div>
    </div>
  </div>

  <div
    v-else-if="type === 'text'"
    class="p-4 bg-gray-100 rounded ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-800"
  >
    <div class="flex items-center gap-4">
      <div class="overflow-hidden">
        <nuxt-link
          :to="{
            name: 'blog-gonderi-slug',
            params: { slug: getPostMeta.slug },
          }"
          class="truncate dark:text-gray-200 hover:underline"
        >
          <div class="flex items-center space-x-2 text-lg font-semibold">
            <SkeletonLoader
              type="image"
              :image-url="getPostMeta.image"
              class="flex-shrink-0 w-6 h-6 rounded-full"
              background-size="cover"
            />

            <h3 class="text-lg truncate">
              {{ getPostMeta.title }}
            </h3>
          </div>
        </nuxt-link>

        <p class="text-gray-700 dark:text-gray-300 line-clamp-2">
          {{ getPostMeta.description }}
        </p>

        <div
          class="flex items-center space-x-2 text-gray-700 dark:text-gray-400"
        >
          <icon name="clock" class="w-4 h-4" />
          <span>{{ getPostDate }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else-if="type === 'text-only-title'"
    class="p-4 truncate bg-gray-100 rounded ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-800"
  >
    <nuxt-link
      :to="{
        name: 'blog-gonderi-slug',
        params: { slug: getPostMeta.slug },
      }"
      class="truncate dark:text-gray-200 hover:underline"
    >
      <h3 class="text-lg truncate" :title="getPostMeta.title">
        {{ getPostMeta.title }}
      </h3>
    </nuxt-link>

    <div class="flex items-center space-x-1">
      <icon
        v-if="getPostMeta.special"
        v-tippy="{ content: 'Popüler gönderi', placement: 'bottom' }"
        name="fire-solid"
        class="w-5 h-5 text-red-600 dark:text-red-500"
      />

      <div class="flex items-center space-x-2 text-gray-700 dark:text-gray-400">
        <icon name="clock" class="w-5 h-5" />
        <span>{{ getPostDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
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
     * @returns {{title: string, description: string, slug: string, special: boolean, tag: string, image: string}}
     */
    getPostMeta() {
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
     * @returns {string} The formatted date.
     */
    getPostDate() {
      return this.$getReadableDate(this.post.createdAt)
    },
  },
}
</script>
