<script setup lang="ts">
import moment from "moment"

/* Import image lists */
import largeImages from "@/assets/files/premid/largeImages"
import smallImages from "@/assets/files/premid/smallImages"

interface Presence {
  installed: boolean
  largeImageKey: string
  smallImageKey: string
  smallImageText: string | null
  details: string
  state: string
  buttons: {
    label: string
    url: string
  }[]
  timestamp: {
    start: {
      enabled: boolean
      value: number | null
    }
    end: {
      enabled: boolean
      value: number | null
    }
  }
}

const { $prepareMeta } = useNuxtApp()

const customLargeImage = ref(false)
const customSmallImage = ref(false)
const observer = ref<MutationObserver | null>(null)
const presenceChecked = ref(false)

const presence = reactive<Presence>({
  installed: true,
  largeImageKey: "PreMiD",
  smallImageKey: "None",
  smallImageText: null,
  details: "",
  state: "",
  buttons: [
    {
      label: "",
      url: "",
    },
    {
      label: "",
      url: "",
    },
  ],
  timestamp: {
    start: {
      enabled: false,
      value: null,
    },
    end: {
      enabled: false,
      value: null,
    },
  },
})

// Head config
useHead(() => {
  const title = "PreMiD Custom Status"
  const image = "https://i.imgur.com/CuVtvKW.png"
  const description =
    "Tool that allows you do display whatever you want on your Discord profile with PreMiD! Easy and free!"

  return {
    title: "Custom Status",
    meta: $prepareMeta({
      title,
      description,
      image,
      keywords: "premid, custom, status",
      url: "https://eggsy.xyz/projects/premid/custom-status",
    }),
    link: [
      {
        rel: "canonical",
        href: "https://eggsy.xyz/projects/premid/custom-status",
      },
      {
        rel: "prefetch",
        href: image,
      },
    ],
  }
})

// Watch for changes
watch(
  () => presence,
  () => {
    if (presenceChecked.value === true) {
      localStorage.setItem(
        "presenceData",
        JSON.stringify({
          customLargeImage: customLargeImage.value,
          customSmallImage: customSmallImage.value,
          presence: toRaw(presence),
        }),
      )
    }
  },
  { deep: true },
)

// Computed
const getImages = computed(() => {
  return {
    large: largeImages,
    small: smallImages,
  }
})

const getButtons = computed(() => {
  const firstButton = presence.buttons[0]
  const secondButton = presence.buttons[1]

  const isFirstButton = firstButton?.label && firstButton?.url
  const isSecondButton = secondButton?.label && secondButton?.url

  if (!isFirstButton && !isSecondButton) return []

  const isUrl = {
    first: false,
    second: false,
  }

  try {
    if (isFirstButton) isUrl.first = !!new URL(firstButton?.url)
  } catch (_) {}

  try {
    if (isSecondButton) isUrl.second = !!new URL(secondButton?.url)
  } catch (_) {}

  const buttonsArray = []

  if (isFirstButton && isUrl.first)
    buttonsArray.push({
      label: firstButton.label.slice(0, 30),
      url: firstButton.url,
    })

  if (isSecondButton && isUrl.second)
    buttonsArray.push({
      label: secondButton.label.slice(0, 30),
      url: secondButton.url,
    })

  return buttonsArray
})

const getPresenceData = computed(() => {
  const timestamps = presence.timestamp
  const object: Record<string, any> = {}

  /* Large and small image */
  if (presence.largeImageKey) object.largeImageKey = presence.largeImageKey
  else object.largeImageKey = "premid"

  if (presence.smallImageKey) object.smallImageKey = presence.smallImageKey
  if (presence.smallImageKey && presence.smallImageText)
    object.smallImageText = presence.smallImageText

  /*  Replace spaces and force lowercase */
  object.largeImageKey = object.largeImageKey?.replace(/\s/g, "")
  object.smallImageKey = object.smallImageKey?.replace(/\s/g, "")

  /* Force lowercase unless it's set to a custom url */
  if (!customLargeImage.value)
    object.largeImageKey = object.largeImageKey?.toLowerCase()

  if (!customSmallImage.value)
    object.smallImageKey = object.smallImageKey?.toLowerCase()

  /* Details and state */
  if (presence.details) object.details = presence.details
  if (presence.state) object.state = presence.state

  /* Timestamps */
  if (timestamps.start.enabled && timestamps.start.value) {
    object.startTimestamp = timestamps.start.value
  } else if (timestamps.end.enabled && timestamps.end.value) {
    object.endTimestamp = moment(timestamps.end.value, "HH:mm").valueOf()
  }

  /* Buttons */
  if (getButtons.value.length > 0) {
    object.buttons = []

    if (getButtons.value[0]?.label && getButtons.value[0]?.url)
      object.buttons.push({
        label: getButtons.value[0].label,
        url: getButtons.value[0].url,
      })

    if (getButtons.value[1]?.label && getButtons.value[1]?.url)
      object.buttons.push({
        label: getButtons.value[1].label,
        url: getButtons.value[1].url,
      })
  }

  // Have to change at least one value because Discord doesn't re-render the data on timestamp changes
  object.smallImageText = presence.smallImageText || "NULL"
  if (object.smallImageText === "NULL") delete object.smallImageText

  if (Object.keys(object).length < 1) return {}
  else return JSON.stringify(object)
})

onBeforeUnmount(() => {
  observer.value?.disconnect()
})

onMounted(() => {
  setupMutationObserver()
  setSavedData()
})

// Methods
const setSavedData = () => {
  const data = localStorage.getItem("presenceData")

  if (!data) {
    presenceChecked.value = true
  } else {
    const jsonData = JSON.parse(data)

    // Delete saved data if it's from the previous version
    if (!jsonData?.presence) return localStorage.removeItem("presenceData")

    const timestamps = jsonData.presence.timestamp
    customLargeImage.value = jsonData.customLargeImage
    customSmallImage.value = jsonData.customSmallImage

    Object.assign(presence, {
      ...jsonData.presence,
      timestamp: {
        start: {
          enabled: timestamps.start.enabled,
          value: timestamps.start.enabled ? Date.now() : null,
        },
        end: {
          enabled: false,
          value: null,
        },
      },
    })

    presenceChecked.value = true
  }
}

const toggleCustomImage = (type: "large" | "small"): void => {
  if (type === "large") {
    presence.largeImageKey = customLargeImage.value ? "PreMiD" : ""
    customLargeImage.value = !customLargeImage.value
  } else {
    presence.smallImageKey = customSmallImage.value ? "None" : ""
    customSmallImage.value = !customSmallImage.value
  }
}

const toggleTimestamp = (option: "elapsed" | "left") => {
  const start = presence.timestamp.start
  const end = presence.timestamp.end

  if (option === "elapsed") {
    if (start.enabled === false) {
      end.enabled = false

      start.value = new Date().getTime()
      start.enabled = true

      presence.smallImageText = presence.smallImageText || null
    } else {
      start.value = null
      start.enabled = false
    }
  } else if (option === "left" && end.enabled === true) {
    end.enabled = false
    end.value = null

    end.enabled = !end.enabled
  }
}

const endTimestampChange = () => {
  presence.timestamp.start.enabled = false
  presence.timestamp.start.value = null

  presence.timestamp.end.enabled = true
}

const setupMutationObserver = () => {
  const target = document.getElementById("__nuxt")
  let currentState = target?.classList?.contains("presence")

  // Return if it was already set, no need an observer
  if (currentState) return
  else presence.installed = false

  observer.value = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName !== "class") return

      const mutTarget = mutation.target as HTMLElement
      const newClassState = mutTarget?.classList.contains("presence")

      if (currentState !== newClassState) {
        currentState = newClassState
        presence.installed = newClassState || false

        if (presence.installed === true) observer.value?.disconnect()
      }
    })
  })

  observer.value.observe(target!, { attributes: true })
}
</script>

<template>
  <div class="space-y-2 mt-4">
    <!-- Custom Status Presence will read the data from here -->
    <div id="object" class="text-gray-900 hidden dark:text-gray-100">
      {{ getPresenceData }}
    </div>

    <div class="space-y-12">
      <div class="space-y-4">
        <BlogNotification v-if="presence.installed === false" type="danger">
          You need to install the Custom Status presence from the PreMiD Store
          to be able to use this page.
          <SmartLink
            href="https://premid.app/store/presences/Custom%20Status"
            class="text-blue-200"
            blank
            >Click here</SmartLink
          >
          {{ "" }} to visit the store.
        </BlogNotification>

        <BlogNotification type="warning" class="md:hidden">
          Are you on mobile? If you are you should know that PreMiD doesn't work
          on mobile, so you can't use this page in any way.
        </BlogNotification>

        <CardDiscord
          :small-image-text="presence.smallImageText"
          :large-image="presence.largeImageKey"
          :small-image="presence.smallImageKey"
          :custom-image-url="{
            large: customLargeImage,
            small: customSmallImage,
          }"
          :timestamp="presence.timestamp"
          :details="presence.details"
          :state="presence.state"
          :buttons="getButtons"
          class="shadow-lg"
        />
      </div>

      <div
        class="space-y-4 mt-4 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 md:space-y-0"
      >
        <div class="space-y-2">
          <PageTitle :padding="false"> Details (upper text) </PageTitle>

          <input
            v-model="presence.details"
            type="text"
            placeholder="Something nice"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <PageTitle :padding="false"> State (lower text) </PageTitle>

          <input
            v-model="presence.state"
            type="text"
            placeholder="This is neat!"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <div class="flex space-x-2 items-center justify-between">
            <PageTitle :padding="false"> Large Image </PageTitle>

            <div
              class="cursor-pointer flex space-x-1 transition-colors text-neutral-700/40 items-center dark:text-gray-100/40 hover:text-opacity-100 focus:outline-none"
              @click="toggleCustomImage('large')"
            >
              <span class="text-sm">custom</span>

              <Icon
                name="heroicons:arrow-path-solid"
                class="h-5 w-5 focus:outline-none"
              />
            </div>
          </div>

          <input
            v-if="customLargeImage"
            v-model="presence.largeImageKey"
            type="text"
            class="w-full"
            placeholder="Type an image url"
          />

          <select
            v-else
            v-model="presence.largeImageKey"
            class="bg-white w-full dark:bg-neutral-700"
          >
            <option selected>PreMiD</option>
            <optgroup
              v-for="(category, index) in getImages.large"
              :key="`large-group-${index}`"
              :label="category.name"
            >
              <option
                v-for="(item, i) of category.items.sort((a: any, b: any) =>
                  a.name.localeCompare(b.name),
                )"
                :key="`large-option-${i}`"
              >
                {{ item.name }}
              </option>
            </optgroup>
          </select>
        </div>

        <div class="space-y-2">
          <div class="flex space-x-2 items-center justify-between">
            <PageTitle :padding="false"> Small Image </PageTitle>

            <div
              class="cursor-pointer flex space-x-1 transition-colors text-neutral-700/40 items-center dark:text-gray-100/40 hover:text-opacity-100 focus:outline-none"
              @click="toggleCustomImage('small')"
            >
              <span class="text-sm">custom</span>

              <Icon
                name="heroicons:arrow-path-solid"
                class="h-5 w-5 focus:outline-none"
              />
            </div>
          </div>

          <input
            v-if="customSmallImage"
            v-model="presence.smallImageKey"
            type="text"
            class="w-full"
            placeholder="Type an image url"
          />

          <select
            v-else
            v-model="presence.smallImageKey"
            class="bg-white w-full dark:bg-neutral-700"
          >
            <option selected>None</option>
            <optgroup
              v-for="(category, index) in getImages.small"
              :key="`small-group-${index}`"
              :label="category.name"
            >
              <option
                v-for="(item, i) of category.items.sort((a: any, b: any) =>
                  a.name.localeCompare(b.name),
                )"
                :key="`small-image-${i}`"
              >
                {{ item.name }}
              </option>
            </optgroup>
          </select>
        </div>

        <div
          v-if="presence.smallImageKey !== 'None'"
          class="space-y-2 w-full col-span-2"
        >
          <h3 class="font-medium w-full text-gray-700 dark:text-gray-100">
            Small Image Text
          </h3>

          <input
            v-model="presence.smallImageText"
            type="text"
            class="w-full"
            placeholder="[EMPTY]"
          />
        </div>

        <div class="space-y-4 col-span-2">
          <div>
            <PageTitle :padding="false"> Buttons </PageTitle>

            <p class="text-sm text-black/50 dark:text-white/30 mt-4">
              You can't click your own buttons from your Discord profile. If
              they appear here, they should also be working for others, blame
              Discord.
            </p>
          </div>

          <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div class="space-y-2">
              <input
                v-model="presence.buttons[0].label"
                type="text"
                class="w-full"
                placeholder="Visit This Cool Website"
              />

              <input
                v-model="presence.buttons[0].url"
                type="text"
                class="w-full"
                placeholder="https://eggsy.xyz"
              />
            </div>

            <div class="space-y-2">
              <input
                v-model="presence.buttons[1].label"
                type="text"
                class="w-full"
                placeholder="Visit PreMiD"
              />

              <input
                v-model="presence.buttons[1].url"
                type="text"
                class="w-full"
                placeholder="https://premid.app"
              />
            </div>
          </div>
        </div>

        <div class="space-y-2 col-span-2">
          <PageTitle :padding="false"> Timestamps </PageTitle>

          <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div
              class="timestamp dark:text-gray-200"
              :class="{
                'active text-white dark:text-gray-100':
                  presence.timestamp.start.enabled === true,
              }"
              @click="toggleTimestamp('elapsed')"
            >
              Show Time Elapsed
            </div>

            <div
              class="cursor-default timestamp"
              :class="{
                active: presence.timestamp.end.enabled === true,
              }"
            >
              <span
                class="dark:text-gray-200"
                :class="{
                  'text-white dark:text-gray-100':
                    presence.timestamp.end.enabled === true,
                }"
                >Time To:</span
              >
              <input
                v-model="presence.timestamp.end.value"
                type="time"
                @input="endTimestampChange"
              />
            </div>
          </div>
        </div>
      </div>

      <section class="space-y-12">
        <div>
          <PageTitle :padding="false"> Consider Donating! </PageTitle>

          <p class="text-sm text-black/50 dark:text-white/30 mt-4">
            If you want to support my work and make me create better systems in
            the future, you can donate me through GitHub Sponsors, please visit
            <SmartLink
              :href="{ name: 'donate' }"
              class="font-medium hover:underline"
              >my donate page</SmartLink
            >
            {{ "" }} for more information.
          </p>
        </div>

        <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div>
            <PageTitle :padding="false"> How does it work? </PageTitle>

            <p class="text-sm text-black/50 dark:text-white/30 mt-4">
              When you add our Presence from Presence Store which is on
              <SmartLink
                href="https://premid.app/store/presences/Custom%20Status"
                title="PreMiD Store"
                blank
                >this page</SmartLink
              >, you will be able to use this page. You just have to set your
              settings and PreMiD will show those settings on your profile just
              like in the preview you see up here.
            </p>
          </div>

          <div>
            <PageTitle :padding="false">
              It's not showing anything!?
            </PageTitle>

            <p class="text-sm text-black/50 dark:text-white/30 mt-4">
              If the system isn't working or it isn't displaying anything on
              your profile, it's most likely about you. Please check
              <SmartLink
                href="https://docs.premid.app/troubleshooting"
                title="PreMiD Docs"
                blank
                >Troubleshooting Documentation</SmartLink
              >
              {{ "" }} and see if those steps fixes your issue. If nothing works
              out, you can always find me on PreMiD's Discord server.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input,
select {
  @apply bg-black/5 text-black/70 text-sm rounded-lg px-4 py-2 placeholder-black/50 outline-none focus:border-black/10 border border-transparent transition-colors;
  @apply dark:bg-white/10 dark:text-white/70 dark:placeholder-white/30 dark:focus:border-white/10;

  &[type="time"] {
    @apply py-px px-2;
  }
}

.timestamp {
  @apply bg-black/5 text-black/70 text-sm rounded-lg px-4 py-2 placeholder-black/50 outline-none focus:border-black/10 border border-transparent transition-colors flex items-center space-x-2 justify-center;
  @apply dark:bg-white/10 dark:text-white/70 dark:placeholder-white/30 dark:focus:border-white/10;

  &:not(.cursor-default) {
    @apply cursor-pointer;
  }

  &:not(.active) {
    @apply text-black/50 dark:text-white/70;
  }

  &.active {
    @apply bg-green-500 text-white/90 drop-shadow-md dark:bg-green-700;
  }
}

a {
  @apply text-blue-500;
  @apply hover:text-blue-600 hover:underline;
}
</style>
