<template>
  <div class="overflow-hidden">
    <a
      :href="getUrl"
      target="_blank"
      rel="noreferrer"
      class="text-gray-800 dark:text-gray-100 hover:underline"
    >
      <h3 class="text-lg">{{ title }}</h3>
    </a>

    <div
      :class="{
        'flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 divide-x-2 divide-gray-300 dark:divide-gray-700': true,
      }"
    >
      <div class="flex items-center flex-shrink-0 space-x-2">
        <icon name="clock" class="w-4 h-4" />
        <span>{{ date }}</span>
      </div>

      <div v-if="position" class="pl-2 truncate">{{ position }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
    url: {
      type: String,
      required: false,
      default: null,
    },
    date: {
      type: String,
      required: false,
      default: "2020",
    },
    position: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    /**
     * Returns url with utm_source query if it exists.
     * @returns {string|null} Target URL or null.
     */
    getUrl() {
      if (this.url) return `${this.url}?utm_source=eggsy.xyz`
      else return null
    },
  },
}
</script>
