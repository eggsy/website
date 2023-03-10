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
      default: null,
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
  <div class="rounded-lg card-base">
    <div class="space-y-2">
      <div :class="top && 'flex justify-between space-x-2'">
        <h3
          class="text-black/90 dark:text-white/90 items-center truncate space-x-1"
        >
          <span class="text-black/50 dark:text-white/30">eggsy/</span
          ><span>{{ name }}</span>
        </h3>

        <IconStar
          v-if="top === true"
          class="h-6 text-yellow-600 w-6"
          title="Top repository"
          filled
        />
      </div>

      <p class="text-black/50 dark:text-white/30 line-clamp-2">
        {{ description }}
      </p>
    </div>

    <div class="mt-4">
      <div
        class="flex items-center justify-between text-black/50 dark:text-white/30"
      >
        <span>Stars:</span>
        <span>{{ stars }}</span>
      </div>

      <div
        class="flex items-center justify-between text-black/50 dark:text-white/30"
      >
        <span>Language:</span>
        <IconDev :brand="getLanguageIcon" class="h-5 w-5" />
      </div>

      <div
        v-if="license"
        class="flex items-center justify-between text-black/50 dark:text-white/30"
      >
        <span>License:</span>
        <span>{{ license }}</span>
      </div>
    </div>
  </div>
</template>
