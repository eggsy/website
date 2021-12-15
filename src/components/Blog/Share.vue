<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    type: {
      type: String,
      required: false,
      default: "horizontal",
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
  <div
    class="flex flex-wrap gap-2"
    :class="{
      'flex-col': type === 'vertical',
    }"
  >
    <Button rounded @click.native="share('twitter')">
      <IconBrand brand="twitter" class="text-[#1DA1F2]" />
    </Button>

    <Button rounded @click.native="share('telegram')">
      <IconBrand brand="telegram" class="text-[#2EAADE]" />
    </Button>

    <Button rounded @click.native="share('whatsapp')">
      <IconBrand brand="whatsapp" class="text-[#25D366]" />
    </Button>

    <Button rounded @click.native="share('url')">
      <IconCheck v-if="copied === true" class="text-green-500" />
      <IconLink v-else class="text-gray-800 dark:text-gray-200" />
    </Button>

    <input
      ref="share-url"
      readonly
      :value="`https://eggsy.xyz${path}`"
      class="hidden"
    />
  </div>
</template>

<style scoped>
.btn svg {
  @apply h-8 w-8;
}
</style>
