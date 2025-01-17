<script setup lang="ts">
interface Props {
  title: string
  path: string
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  path: "",
})

const copied = ref(false)
const shareUrlRef = ref<HTMLInputElement>()

/**
 * Creates a window or copies the URL.
 * @param {'url'|'twitter'|'telegram'|'whatsapp'} option The share option.
 */
const share = (option: "url" | "twitter" | "telegram" | "whatsapp") => {
  if (option === "url") {
    let el = shareUrlRef.value

    if (!el) {
      el = document.createElement("input")

      el.value = props.path ? `https://eggsy.xyz${props.path}` : location.href
      document.body.appendChild(el)

      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    } else {
      el.select()
      document.execCommand("copy")
    }

    copied.value = true
    setTimeout(() => (copied.value = false), 3000)
  } else {
    let url = ""

    switch (option) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?via=eggsydev&text=${encodeURIComponent(
          props.title + "\n" + location.href,
        )}`
        break
      case "telegram":
        url = `https://telegram.me/share/url?url=${encodeURIComponent(
          location.href,
        )}`
        break
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          props.title + "\n" + location.href,
        )}`
        break
    }

    window.open(
      url,
      `${option[0].toUpperCase() + option.toLowerCase().slice(1)}`,
      "width=400,height=550",
    )
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <Button rounded @click.native="share('twitter')">
      <Icon name="mdi:twitter" class="text-[#1DA1F2] h-6 w-6 align-middle" />
    </Button>

    <Button rounded @click.native="share('telegram')">
      <Icon name="mdi:telegram" class="text-[#2EAADE] h-6 w-6 align-middle" />
    </Button>

    <Button rounded @click.native="share('whatsapp')">
      <Icon name="mdi:whatsapp" class="text-[#25D366] h-6 w-6 align-middle" />
    </Button>

    <Button rounded @click.native="share('url')">
      <Icon
        v-if="copied === true"
        name="heroicons:check"
        class="text-green-500 h-6 w-6 align-middle"
      />

      <Icon
        v-else
        name="heroicons:link"
        class="text-gray-800 dark:text-gray-200 h-6 w-6 align-middle"
      />
    </Button>

    <input
      ref="shareUrlRef"
      readonly
      :value="`https://eggsy.xyz${path}`"
      class="hidden"
    />
  </div>
</template>
