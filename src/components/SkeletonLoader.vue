<template>
  <!-- Repository Card -->
  <div
    v-if="type === 'repository'"
    class="p-4 space-y-1 bg-gray-100 rounded-md ring-1 ring-gray-200 dark:ring-gray-900 dark:bg-gray-800"
  >
    <div class="flex items-center justify-between">
      <div
        class="w-7/12 h-5 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"
      />

      <div
        class="w-2/12 h-5 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"
      />
    </div>

    <div class="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-700" />
    <div class="w-4/12 h-4 bg-gray-300 rounded-md dark:bg-gray-700" />
  </div>

  <!-- Image -->
  <div
    v-else-if="type === 'image' && imageUrl"
    class="focus:outline-none"
    :class="{
      'bg-gray-100 dark:bg-gray-700 animate-pulse bg-no-repeat':
        itemLoaded === false,
    }"
    :style="{
      backgroundImage: itemLoaded === true ? `url('${imageUrl}')` : '',
      backgroundPosition: 'center',
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

  <!-- Iframe -->
  <div
    v-else-if="type === 'iframe'"
    :class="{
      'bg-gray-100 dark:bg-gray-800 rounded animate-pulse':
        itemLoaded === false,
    }"
  >
    <iframe
      v-if="iframeUrl"
      :class="{
        'w-full h-full rounded': true,
        invisible: itemLoaded === false,
      }"
      :src="iframeUrl"
      @load="itemLoaded = true"
    />
  </div>

  <!-- Song Card -->
  <div
    v-else-if="type === 'song'"
    class="flex items-center px-4 py-2 space-x-2 bg-gray-100 rounded-md cursor-pointer select-none ring-1 ring-gray-200 dark:ring-gray-800 dark:bg-gray-800"
  >
    <div
      class="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md animate-pulse dark:bg-gray-700"
    />

    <div class="flex-grow space-y-1">
      <div
        class="w-1/3 h-4 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"
      />

      <div
        class="w-2/3 h-4 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"
      />
    </div>
  </div>

  <!-- Block -->
  <div
    v-else-if="type === 'block'"
    class="bg-gray-100 rounded dark:bg-gray-800 animate-pulse"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: "block",
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
