<template>
  <div
    v-ripple
    :class="{
      'rounded-lg shadow-lg hover:shadow-2xl select-none cursor-pointer transition': true,
      [getColorOption]: true,
    }"
  >
    <div class="relative rounded-lg">
      <div
        v-if="image === true"
        class="relative"
        :style="{ background: `url('${getPostInfo.image}') no-repeat center` }"
      >
        <div
          :class="{
            'bg-gradient-to-b from-gray-800 via-gray-900 to-black opacity-25 absolute top-0 left-0 w-full h-full': true,
          }"
        ></div>
        <img
          :src="getPostInfo.image"
          :alt="getPostInfo.title"
          class="invisible"
        />
      </div>

      <div
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
            class="flex justify-center sm:justify-start overflow-x-auto sm:overflow-x-hidden sm:flex-wrap space-x-2 mb-1"
          >
            <span
              v-for="(tag, index) of getPostInfo.tags"
              :key="`tag-${index}`"
              class="bg-gray-700 hover:bg-gray-800 text-gray-200 rounded-md text-sm px-2 py-1"
              >{{ tag }}</span
            >
          </div>

          <h2
            :class="{
              'text-gray-100 font-semibold truncate text-center sm:text-left': true,
              'text-lg sm:text-xl ': !featured,
              'text-xl sm:text-2xl': featured === true,
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
  computed: {
    getPostInfo() {
      return {
        title: this.post.title || "",
        description: this.post.description || "",
        image: this.post.image || "",
        tags: this.post.tags || "",
      }
    },
    getColorOption() {
      const color = this.color

      let option
      switch (color) {
        case "red":
          option = "bg-red-700 hover:bg-red-800"
          break
        case "orange":
          option = "bg-yellow-600 hover:bg-yellow-700"
          break
        case "indigo":
          option = "bg-indigo-700 hover:bg-indigo-800"
          break
        default:
          option = "bg-gray-800 hover:bg-gray-900"
          break
      }

      return option
    },
  },
}
</script>
