<template>
  <div :class="{ 'flex items-center space-x-2': left !== null }">
    <h3 v-if="left" class="text-5xl font-bold dark:text-gray-200">
      {{ left }}
    </h3>

    <div class="uppercase leading-none text-xl font-semibold">
      <h2 v-if="rightUp" class="block text-gray-500 dark:text-gray-500">
        {{ rightUp }}
      </h2>
      <h1
        :class="{
          'block text-gray-700 dark:text-gray-300': true,
          'text-sm': $route.path == '/blog' && rightUp,
        }"
      >
        {{ rightDown }}
      </h1>
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
