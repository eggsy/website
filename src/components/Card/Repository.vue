<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: false,
      default: null,
    },
    stars: {
      type: [String, Number],
      required: true,
    },
    top: {
      type: Boolean,
      required: false,
      default: false,
    },
    license: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  computed: {
    /**
     * Returns proper name for the language icon.
     * @returns {string}
     */
    getLanguageIcon(): string {
      const icons = {
        Vue: "Vue.js",
      }

      // @ts-ignore-next-line
      return icons[this.language] || this.language
    },
  },
})
</script>

<template>
  <div
    class="rounded-lg cursor-pointer flex flex-col h-full p-4 transition-colors text-gray-500 justify-between focusRing dark:text-neutral-500 hover:bg-gray-200/40 dark:hover:bg-neutral-800/40"
  >
    <div class="space-y-2">
      <div :class="top && 'flex justify-between space-x-2'">
        <h3 class="text-gray-700 items-center truncate dark:text-neutral-400">
          <span class="text-gray-400 dark:text-neutral-700">eggsy/</span
          >{{ name }}
        </h3>

        <IconStar
          v-if="top === true"
          class="h-6 text-yellow-600 w-6"
          title="Top repository"
          filled
        />
      </div>

      <p class="text-gray-500 line-clamp-2 dark:text-neutral-500">
        {{ description }}
      </p>
    </div>

    <div class="mt-4">
      <div class="flex items-center justify-between">
        <span>Stars:</span>
        <span>{{ stars }}</span>
      </div>

      <div class="flex items-center justify-between">
        <span>Language:</span>
        <IconDev :brand="getLanguageIcon" class="h-5 w-5" />
      </div>

      <div v-if="license" class="flex items-center justify-between">
        <span>License:</span>
        <span>{{ license }}</span>
      </div>
    </div>
  </div>
</template>
