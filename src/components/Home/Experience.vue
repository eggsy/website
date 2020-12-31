<template>
  <div class="w-full flex items-center truncate">
    <div class="truncate">
      <span v-if="!url" class="block font-bold text-gray-800 dark:text-white">{{
        title
      }}</span>
      <a
        v-else
        class="block truncate hover:underline font-bold text-gray-800 dark:text-gray-100"
        :href="`${url}?utm_source=eggsy.xyz`"
        target="_blank"
        rel="noreferrer"
        >{{ title }}</a
      >
      <span class="block truncate text-gray-600 dark:text-gray-300">{{
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
