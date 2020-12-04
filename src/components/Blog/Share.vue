<template>
  <div class="share">
    <div @click="share('twitter')">
      <icon name="twitter" class="h-full w-full text-social-twitter" />
    </div>

    <div @click="share('telegram')">
      <icon name="telegram" class="h-full w-full text-social-telegram" />
    </div>

    <div @click="share('whatsapp')">
      <icon name="whatsapp" class="h-full w-full text-social-whatsapp" />
    </div>

    <div @click="share('url')">
      <icon
        v-if="copied === true"
        key="check"
        name="check"
        class="h-full w-full text-green-600"
      />

      <icon v-else key="link" name="link" class="h-full w-full text-gray-700" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    share(option) {
      if (option === "url") {
        const el = document.createElement("textarea")
        el.value = document.location.href

        document.body.appendChild(el)

        el.select()

        document.execCommand("copy")
        document.body.removeChild(el)

        this.copied = true
        setTimeout(() => (this.copied = false), 3000)
      } else {
        let url = ""

        switch (option) {
          case "twitter":
            url = `https://twitter.com/intent/tweet?via=eggsydev&text=${encodeURIComponent(
              this.post.title + "\n" + location.href
            )}`
            break
          case "telegram":
            url = `https://telegram.me/share/url?url=${encodeURIComponent(
              location.href
            )}`
            break
          case "whatsapp":
            url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
              this.post.title + "\n" + location.href
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
.share > div {
  @apply bg-gray-100 cursor-pointer hover:bg-gray-200 p-3 ring-1 ring-opacity-25 ring-gray-300 rounded-full w-14 h-14 ml-auto;
}
</style>
