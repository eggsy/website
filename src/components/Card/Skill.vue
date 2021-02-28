<template>
  <div class="flex items-center space-x-2">
    <div
      class="flex items-center flex-shrink-0 w-2/6 space-x-1 overflow-hidden text-gray-900 dark:text-gray-100"
    >
      <icon :name="icon" class="flex-shrink-0 w-6 h-6" />
      <span class="truncate">{{ title }}</span>
    </div>

    <div
      v-if="level"
      class="w-full h-full bg-gray-100 rounded dark:bg-gray-800"
    >
      <div
        :class="{
          'bg-green-500 dark:bg-green-700 relative h-6 rounded': true,
          [getSkillWidth]: true,
        }"
      >
        <span
          class="absolute top-0 bottom-0 right-0 px-2 text-white dark:text-gray-200"
        >
          {{ level }}%
        </span>
      </div>
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
    level: {
      type: [String, Number],
      required: true,
      default: 10,
    },
    icon: {
      type: String,
      required: false,
      default: "arrow-right",
    },
  },
  computed: {
    /**
     * Calculates the level and returns a width value according to it.
     * @returns {string} The TailwindCSS width class.
     */
    getSkillWidth() {
      const level = Number(this.level)

      if (level >= 100) return "w-full"
      else if (level >= 95) return "w-11/12"
      else if (level >= 90) return "w-11/12"
      else if (level >= 85) return "w-10/12"
      else if (level >= 80) return "w-9/12"
      else if (level >= 70) return "w-8/12"
      else if (level >= 60) return "w-7/12"
      else if (level >= 50) return "w-6/12"
      else if (level >= 40) return "w-5/12"
      else return "w-3/12"
    },
  },
}
</script>
