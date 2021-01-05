<template>
  <div class="flex items-center space-x-4">
    <div class="button" @click="share('twitter')">
      <icon name="twitter" class="text-social-twitter" />
    </div>

    <div class="button" @click="share('telegram')">
      <icon name="telegram" class="text-social-telegram" />
    </div>

    <div class="button" @click="share('whatsapp')">
      <icon name="whatsapp" class="text-social-whatsapp" />
    </div>

    <input
      ref="share-url"
      readonly
      :value="`https://new.eggsy.xyz${path}`"
      class="w-6/12 p-3 sm:p-2 sm:w-full ring-1 ring-opacity-25 ring-gray-800 focus:outline-none dark:bg-gray-800 dark:ring-transparent dark:text-gray-100"
      @click="share('url')"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: null,
    },
    path: {
      type: String,
      required: true,
      default: null,
    },
  },
  methods: {
    share(option) {
      if (option === "url") {
        const el = this.$refs["share-url"]

        el.select()
        document.execCommand("copy")
      } else {
        let url = ""

        switch (option) {
          case "twitter":
            url = `https://twitter.com/intent/tweet?via=eggsydev&text=${encodeURIComponent(
              this.title + "\n" + location.href
            )}`
            break
          case "telegram":
            url = `https://telegram.me/share/url?url=${encodeURIComponent(
              location.href
            )}`
            break
          case "whatsapp":
            url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
              this.title + "\n" + location.href
            )}`
            break
        }

        window.open(
          url,
          `${option[0].toUpperCase() + option.toLowerCase().slice(1)}`,
          "width=400,height=550"
        )
      }
    },
  },
}
</script>

<style scoped>
div.button {
  @apply w-12 h-full p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 ring-1 ring-opacity-25 ring-gray-400 dark:bg-gray-800 dark:ring-transparent;
}
</style>
