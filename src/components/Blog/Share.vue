<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    type: {
      type: String,
      required: false,
      default: "normal",
    },
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
  data() {
    return {
      copied: false,
    }
  },
  methods: {
    /**
     * Creates a window or copies the URL.
     * @param {'url'|'twitter'|'telegram'|'whatsapp'} option The share option.
     */
    share(option: "url" | "twitter" | "telegram" | "whatsapp") {
      if (option === "url") {
        let el = this.$refs["share-url"] as HTMLInputElement

        if (!el) {
          el = document.createElement("input")

          el.value = this.path ? `https://eggsy.xyz${this.path}` : location.href
          document.body.appendChild(el)

          el.select()
          document.execCommand("copy")
          document.body.removeChild(el)
        } else {
          el.select()
          document.execCommand("copy")
        }

        this.copied = true
        setTimeout(() => (this.copied = false), 3000)
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
})
</script>

<template>
  <div v-if="type === 'vertical'" class="grid gap-2 grid-cols-1">
    <div class="button" @click="share('twitter')">
      <IconBrand brand="twitter" class="text-[#1DA1F2]" />
    </div>

    <div class="button" @click="share('telegram')">
      <IconBrand brand="telegram" class="text-[#2EAADE]" />
    </div>

    <div class="button" @click="share('whatsapp')">
      <IconBrand brand="whatsapp" class="text-[#25D366]" />
    </div>

    <div class="button" @click="share('url')">
      <IconCheck v-if="copied === true" class="text-green-500" />
      <IconLink v-else class="text-gray-800 dark:text-gray-200" />
    </div>
  </div>

  <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-3">
    <div class="flex space-x-2 items-center">
      <div class="button" @click="share('twitter')">
        <IconBrand brand="twitter" class="text-[#1DA1F2]" />
      </div>

      <div class="button" @click="share('telegram')">
        <IconBrand brand="telegram" class="text-[#2EAADE]" />
      </div>

      <div class="button" @click="share('url')">
        <IconBrand brand="whatsapp" class="text-[#25D366]" />
      </div>
    </div>

    <div
      v-tippy="{
        content: 'Kopyalandı!',
        trigger: 'click',
      }"
      class="flex space-x-2 relative items-center sm:col-span-2"
    >
      <input
        ref="share-url"
        readonly
        :value="`https://eggsy.xyz${path}`"
        class="rounded-md w-full p-3 ring-1 ring-opacity-25 ring-gray-800 sm:py-3 sm:px-4 dark:(bg-gray-800 text-gray-100) focus:outline-none "
        @click="share('url')"
      />

      <transition name="fade">
        <div v-if="copied === true" class="rounded-full bg-green-500 p-1 right-2 absolute">
          <IconCheck class="h-5 text-gray-100 w-5" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
div.button {
  @apply rounded-full cursor-pointer flex space-x-2 bg-gray-200 bg-opacity-40 h-12 p-2 transition-shadow w-12 dark:bg-gray-800 hover:shadow-md;
}
</style>
