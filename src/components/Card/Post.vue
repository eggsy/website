<template>
  <div
    v-if="type === 'normal'"
    class="rounded bg-gray-100 p-4 ring-1 ring-gray-200 dark:(bg-gray-800 ring-gray-800)"
  >
    <div class="flex space-x-3 items-center">
      <SmartLink
        :href="{
          name: 'blog-gonderi-slug',
          params: { slug: getPostMeta.slug },
        }"
        class="flex-shrink-0 w-2/6 relative group"
      >
        <SmartImage
          :src="getPostMeta.image"
          class="rounded-md"
          width="620"
          height="448"
        />

        <div
          class="bg-black rounded-md flex bg-opacity-25 opacity-0 top-0 right-0 bottom-0 left-0 absolute items-center justify-center group-hover:opacity-100"
        >
          <icon name="link" class="h-6 text-white w-6" />
        </div>
      </SmartLink>

      <div class="w-4/6">
        <SmartLink
          :href="{
            name: 'blog-gonderi-slug',
            params: { slug: getPostMeta.slug },
          }"
          class="dark:text-gray-200 hover:underline"
        >
          <h2 class="font-semibold truncate" :title="getPostMeta.title">
            {{ getPostMeta.title }}
          </h2>
        </SmartLink>

        <p class="text-gray-800 line-clamp-3 dark:text-gray-300">
          {{ getPostMeta.description }}
        </p>
      </div>
    </div>

    <div
      class="flex space-x-4 mt-2 text-gray-700 items-center justify-self-end dark:text-gray-400"
    >
      <div class="flex space-x-2 items-center">
        <icon name="hashtag" class="h-4 w-4" />
        <SmartLink
          :href="{
            name: 'blog',
            query: {
              etiket: getPostMeta.tag,
            },
          }"
          class="hover:underline"
        >
          {{ getPostMeta.tag }}
        </SmartLink>
      </div>

      <div class="flex space-x-2 items-center">
        <icon name="clock" class="h-4 w-4" />
        <span>{{ getPostDate }}</span>
      </div>
    </div>
  </div>

  <div
    v-else-if="type === 'text'"
    class="rounded bg-gray-100 p-4 ring-1 ring-gray-200 dark:(bg-gray-800 ring-gray-800)"
  >
    <div class="flex gap-4 items-center">
      <div class="overflow-hidden">
        <SmartLink
          :href="{
            name: 'blog-gonderi-slug',
            params: { slug: getPostMeta.slug },
          }"
          class="truncate dark:text-gray-200 hover:underline"
        >
          <div class="flex font-semibold space-x-2 text-lg items-center">
            <SmartImage
              :src="getPostMeta.image"
              class="rounded-full flex-shrink-0 h-6 w-6"
              width="50"
              height="50"
            />

            <h3 class="text-lg truncate">
              {{ getPostMeta.title }}
            </h3>
          </div>
        </SmartLink>

        <p class="text-gray-700 line-clamp-2 dark:text-gray-300">
          {{ getPostMeta.description }}
        </p>

        <div
          class="flex space-x-2 text-gray-700 items-center dark:text-gray-400"
        >
          <icon name="clock" class="h-4 w-4" />
          <span>{{ getPostDate }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else-if="type === 'text-only-title'"
    class="rounded bg-gray-100 p-4 ring-1 ring-gray-200 truncate dark:(bg-gray-800 ring-gray-800)"
  >
    <SmartLink
      :href="{
        name: 'blog-gonderi-slug',
        params: { slug: getPostMeta.slug },
      }"
      class="truncate dark:text-gray-200 hover:underline"
    >
      <h3 class="text-lg truncate" :title="getPostMeta.title">
        {{ getPostMeta.title }}
      </h3>
    </SmartLink>

    <div class="flex space-x-1 items-center">
      <icon
        v-if="getPostMeta.special"
        v-tippy="{ content: 'Popüler gönderi', placement: 'bottom' }"
        name="fire-solid"
        class="h-5 text-red-600 w-5 dark:text-red-500"
      />

      <div class="flex space-x-2 text-gray-700 items-center dark:text-gray-400">
        <icon name="clock" class="h-5 w-5" />
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
