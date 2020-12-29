<template>
  <div
    v-if="modal === false"
    class="fixed shadow-md bottom-0 z-50 right-0 mb-4 mr-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 rounded-full sm:rounded-md cursor-pointer dark:hover:bg-gray-800 flex items-center sm:space-x-2 text-gray-700 dark:text-gray-300 ring-1 ring-gray-300 dark:ring-gray-800"
    @click="modal = true"
  >
    <span class="hidden sm:block">{{ getColorPreference }}</span>
    <icon
      :key="getIconName"
      :name="getIconName"
      class="h-6 w-6 sm:h-4 sm:w-4"
    />
  </div>

  <div
    v-else
    class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-gray-200 dark:bg-gray-800 rounded-md w-screen h-screen flex flex-col justify-center sm:block sm:w-4/12 sm:h-auto p-6 space-y-4 ring-1 ring-gray-300 dark:ring-gray-900"
    >
      <h1 class="text-gray-700 dark:text-gray-200 text-xl block text-center">
        Please Select Your Color Mode
      </h1>

      <div class="grid sm:grid-cols-3 gap-4 select-none">
        <div
          v-for="(option, index) in options"
          :key="`color-mode-${index}`"
          class="rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 p-4 space-y-2 ring-1 ring-gray-300 dark:ring-gray-900"
          @click="changeColor(index)"
        >
          <icon
            :name="option.icon"
            class="h-14 w-14 mx-auto text-gray-700 dark:text-gray-200"
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
      else if (colorMode === "dark") return "sun"
      else return "moon"
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
