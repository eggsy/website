<template>
  <div :class="{ 'flex items-center space-x-2': left !== null }">
    <h1 v-if="left" class="text-5xl font-bold dark:text-white">
      {{ left }}
    </h1>

    <div class="uppercase">
      <h2
        v-if="rightUp"
        class="block text-lg leading-none text-gray-500 dark:text-gray-100"
      >
        {{ rightUp }}
      </h2>
      <h3
        :class="{
          'block text-gray-700 dark:text-white text-xl leading-none font-semibold': true,
          'text-sm': $route.path == '/blog' && rightUp,
        }"
      >
        {{ rightDown }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: [Number, String],
      required: false,
      default: "",
    },
    rightUp: {
      type: String,
      required: false,
      default: null,
    },
    rightDown: {
      type: String,
      required: true,
    },
  },
}
</script>
