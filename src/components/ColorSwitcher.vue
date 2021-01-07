<template>
  <div
    v-if="modal === false"
    class="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 dark:bg-gray-700 sm:rounded-md dark:hover:bg-gray-800 sm:space-x-2 dark:text-gray-300 ring-1 ring-gray-300 dark:ring-gray-800"
    @click="modal = true"
  >
    <span class="hidden sm:block">{{ getColorPreference }}</span>
    <icon
      :key="getIconName"
      :name="getIconName"
      class="w-6 h-6 sm:h-4 sm:w-4"
    />
  </div>

  <div
    v-else
    class="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50"
  >
    <div
      class="flex flex-col justify-center w-screen h-screen p-6 space-y-4 bg-gray-200 rounded-md dark:bg-gray-800 sm:block sm:w-4/12 sm:h-auto ring-1 ring-gray-300 dark:ring-gray-900"
    >
      <h1 class="block text-xl text-center text-gray-700 dark:text-gray-200">
        Please Select Your Color Mode
      </h1>

      <div class="grid gap-4 select-none sm:grid-cols-3">
        <div
          v-for="(option, index) in options"
          :key="`color-mode-${index}`"
          class="p-4 space-y-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 ring-1 ring-gray-300 dark:ring-gray-900"
          @click="changeColor(index)"
        >
          <icon
            :name="option.icon"
            class="mx-auto text-gray-700 h-14 w-14 dark:text-gray-200"
          />
          <span class="block text-center text-gray-700 dark:text-gray-200">{{
            option.title
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      options: [
        {
          title: "System",
          icon: "computer",
        },
        {
          title: "Dark",
          icon: "moon",
        },
        {
          title: "Light",
          icon: "sun",
        },
      ],
    }
  },
  computed: {
    getColorPreference() {
      const colorMode = this.$colorMode.preference
      return colorMode[0].toUpperCase() + colorMode.slice(1).toLowerCase()
    },
    getIconName() {
      const colorMode = this.$colorMode.preference

      if (colorMode === "system") return "computer"
      else if (colorMode === "dark") return "moon"
      else return "sun"
    },
  },
  methods: {
    changeColor(itemIndex) {
      this.$colorMode.preference =
        this.options[itemIndex]?.title?.toLowerCase() || "system"
      this.modal = false
    },
  },
}
</script>
