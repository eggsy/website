<template>
  <div
    :class="{
      'rounded-md select-none cursor-pointer': true,
      'h-full': image === true && featured === true && imageLoaded === false,
      [getColorOption]: true,
    }"
  >
    <div
      :class="{
        relative: true,
        'h-full flex items-center': type === 'boxed',
      }"
    >
      <div
        v-if="image === true && imageLoaded === false"
        :class="{
          'w-full bg-gray-700 animate-pulse rounded-md': true,
          'h-36 sm:h-48': featured === false,
        }"
      >
        <img
          :src="getPostInfo.image"
          :alt="getPostInfo.title"
          class="hidden"
          @load="imageLoaded = true"
        />
      </div>

      <div
        v-else-if="image === true && imageLoaded === true"
        :style="{
          background:
            imageLoaded === true
              ? `url('${getPostInfo.image}') no-repeat center`
              : null,
          backgroundSize: imageLoaded === true ? 'contain' : null,
        }"
        class="rounded-md"
      >
        <div
          class="absolute top-0 left-0 w-full h-full rounded-md opacity-25 bg-gradient-to-b from-gray-800 via-gray-900 to-black"
        />

        <img
          :src="getPostInfo.image"
          :alt="getPostInfo.title"
          class="invisible"
        />
      </div>

      <div
        v-if="image === false || (image === true && imageLoaded == true)"
        :class="{
          'leading-tight p-4': true,
          'absolute bottom-0 left-0 w-full': image === true,
        }"
      >
        <div>
          <div
            v-if="
              featured === true && image === true && getPostInfo.tags.length
            "
            class="flex justify-center mb-1 space-x-2 overflow-x-auto sm:justify-start sm:overflow-x-hidden sm:flex-wrap"
          >
            <span
              v-for="(tag, index) of getPostInfo.tags"
              :key="`tag-${index}`"
              class="px-2 py-1 text-sm text-gray-200 bg-gray-700 rounded-md hover:bg-gray-800"
              >{{ tag }}</span
            >
          </div>

          <h2
            :class="{
              'text-gray-100 font-semibold text-center sm:text-left': true,
              'text-lg sm:text-xl ': !featured,
              'text-xl sm:text-2xl': featured === true,
              'truncate ': type !== 'boxed',
            }"
            :title="getPostInfo.title"
          >
            {{ getPostInfo.title }}
          </h2>
        </div>

        <p
          v-if="image === true || description === true"
          :class="{
            'text-gray-50 text-opacity-75 truncate hidden sm:block': true,
            'text-medium ': !featured,
            'text-lg': featured === true,
          }"
        >
          {{ getPostInfo.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: () => null,
    },
    post: {
      type: Object,
      required: true,
    },
    featured: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    image: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    description: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    color: {
      type: String,
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      imageLoaded: false,
    }
  },
  computed: {
    getPostInfo() {
      const image =
        this.post?.image || `/assets/images/posts/${this.post?.slug}.jpg` || ""

      return {
        title: this.post.title || "",
        description: this.post.description || "",
        tags: this.post.tags || "",
        image,
      }
    },
    getColorOption() {
      const color = this.color

      let option
      switch (color) {
        case "red":
          option = "bg-red-700 hover:bg-red-800"
          break
        case "teal":
          option = "bg-teal-700 hover:bg-teal-800"
          break
        case "indigo":
          option = "bg-indigo-700 hover:bg-indigo-800"
          break
        case "mobile-indigo":
          option =
            "bg-indigo-700 hover:bg-indigo-800 sm:bg-gray-800 sm:hover:bg-gray-900 sm:dark:hover:bg-gray-800 sm:dark:hover:bg-opacity-80"
          break
        default:
          option = "bg-gray-800 hover:bg-gray-900"
          break
      }

      if (this.type === "featured" && this.image === true)
        return `${option} dark:hover:bg-opacity-80`
      else return `${option} dark:hover:bg-opacity-80 dark:bg-gray-800`
    },
  },
}
</script>
