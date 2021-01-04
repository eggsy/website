<template>
  <div class="flex items-center w-full truncate">
    <div class="truncate">
      <span v-if="!url" class="block font-bold text-gray-800 dark:text-white">{{
        title
      }}</span>
      <a
        v-else
        class="block font-bold text-gray-800 truncate hover:underline dark:text-gray-100"
        :href="`${url}?utm_source=eggsy.xyz`"
        target="_blank"
        rel="noreferrer"
        >{{ title }}</a
      >
      <span class="block text-gray-600 truncate dark:text-gray-300">{{
        position
      }}</span>
    </div>

    <div class="flex-grow"></div>

    <div class="text-gray-500 dark:text-white">{{ date }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
      default: null,
    },
    position: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: "",
    },
  },
}
</script>
