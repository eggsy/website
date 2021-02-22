<template>
  <div
    v-if="type === 'repository'"
    class="p-4 space-y-1 bg-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-opacity-80 dark:bg-gray-800 dark:hover:bg-gray-800"
  >
    <div
      class="w-7/12 h-4 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"
    ></div>
    <div class="space-y-px animate-pulse">
      <div class="w-full h-3 bg-gray-300 rounded-md dark:bg-gray-700"></div>
      <div class="w-11/12 h-3 bg-gray-300 rounded-md dark:bg-gray-700"></div>
      <div class="w-4/12 h-3 bg-gray-300 rounded-md dark:bg-gray-700"></div>
    </div>
  </div>

  <div
    v-else-if="type === 'image' && imageUrl"
    :class="{
      'bg-gray-100 dark:bg-gray-700 animate-pulse': itemLoaded === false,
    }"
    :style="{
      background:
        itemLoaded === true ? `url('${imageUrl}') no-repeat center` : '',
      backgroundSize: itemLoaded === true ? backgroundSize : '',
    }"
  >
    <img
      :src="imageUrl"
      class="invisible"
      draggable="false"
      alt="image"
      width="100%"
      height="100%"
      @load="itemLoaded = true"
    />
  </div>

  <div
    v-else-if="type === 'iframe' && iframeUrl"
    :class="{
      'h-56 w-full': true,
      'bg-gray-100 dark:bg-gray-800 rounded animate-pulse':
        itemLoaded === false,
    }"
  >
    <iframe
      :class="{
        'w-full h-full rounded': true,
        invisible: itemLoaded === false,
      }"
      :src="iframeUrl"
      @load="itemLoaded = true"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
      default: null,
    },
    backgroundSize: {
      type: String,
      required: false,
      default: "cover",
    },
    iframeUrl: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      itemLoaded: false,
    }
  },
}
</script>
