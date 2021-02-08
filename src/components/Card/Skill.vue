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
          'w-3/12': level <= 30,
          'w-4/12': level >= 40,
          'w-6/12': level >= 50,
          'w-8/12': level >= 60,
          'w-9/12': level >= 70,
          'w-10/12': level >= 80,
          'w-11/12': level >= 90,
          'w-full': level >= 95,
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
}
</script>
