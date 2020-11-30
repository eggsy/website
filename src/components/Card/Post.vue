<template>
  <div
    v-ripple
    :class="{
      'rounded-lg shadow-lg select-none cursor-pointer': true,
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
            'bg-gradient-to-tl opacity-25 absolute top-0 left-0 w-full h-full': true,
            'from-gray-800 via-gray-900 to-black': !featured,
            'from-blue-800 via-blue-900 to-red-900': featured === true,
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

        <p
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
      }
    },
    getColorOption() {
      const color = this.color
      if (!color) return "bg-gray-700"

      let option = "bg-gray-700"
      switch (color) {
        case "red":
          option = "bg-red-700"
          break
        case "orange":
          option = "bg-yellow-600"
          break
        case "indigo":
          option = "bg-indigo-700"
          break
      }

      return option
    },
  },
}
</script>
