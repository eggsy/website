<template>
  <div :class="{ 'space-x-2 mb-4': true, 'flex items-center': left !== null }">
    <span v-if="left" class="text-5xl font-bold">{{ left }}</span>

    <div class="uppercase leading-none text-xl font-semibold">
      <span v-if="rightUp" class="block text-gray-500">{{ rightUp }}</span>
      <span class="block text-gray-700">{{ rightDown }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: Number,
      required: false,
      default: null,
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
