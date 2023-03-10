<script lang="ts">
import Vue from "vue"

/* Import image lists */
import largeImages from "@/assets/files/premid/largeImages"
import smallImages from "@/assets/files/premid/smallImages"

/* Interfaces */
interface ImageCategory {
  name: string
  items: {
    name: string
    url: string
  }[]
}

export default Vue.extend({
  data() {
    return {
      customLargeImage: false,
      customSmallImage: false,
      observer: null as any,
      presenceChecked: false,
      presence: {
        installed: true,
        largeImageKey: "PreMiD",
        smallImageKey: "None",
        smallImageText: "" as string | null,
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
            value: null as number | null,
          },
          end: {
            enabled: false,
            value: null as number | null,
          },
        },
      },
    }
  },
  head() {
    const title = "PreMiD Custom Status"
    const image = "https://i.imgur.com/CuVtvKW.png"
    const description =
      "Tool that allows you do display whatever you want on your Discord profile with PreMiD! Easy and free!"

    return {
      title: "Custom Status",
      meta: this.$prepareMeta({
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
  },
  computed: {
    /**
     * Formats image names, adds spaces and returns all in a single object.
     * @returns {{ large: ImageCategory[], small: ImageCategory[]}} An object with large and small image array.
     */
    getImages(): { large: ImageCategory[]; small: ImageCategory[] } {
      return {
        large: largeImages,
        small: smallImages,
      }
    },
    /**
     * Checks if any of the buttons have label and returns each that has.
     * @returns {object[]} Buttons array.
     */
    getButtons(): any {
      const firstButton = this.presence.buttons[0]
      const secondButton = this.presence.buttons[1]

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
    },
    /**
     * Checks for everything and appends data to Vue, then renders it in template.
     * @returns {Object|String} An empty object or stringified Discord readable object.
     */
    getPresenceData(): object | string {
      const data = this.presence
      const timestamps = data.timestamp
      const object: Record<string, any> = {}

      /* Large and small image */
      if (data.largeImageKey) object.largeImageKey = data.largeImageKey
      else object.largeImageKey = "premid"

      if (data.smallImageKey) object.smallImageKey = data.smallImageKey
      if (data.smallImageKey && data.smallImageText)
        object.smallImageText = data.smallImageText

      /*  Replace spaces and force lowercase */
      object.largeImageKey = object.largeImageKey?.replace(/\s/g, "")
      object.smallImageKey = object.smallImageKey?.replace(/\s/g, "")

      /* Force lowercase unless it's set to a custom url */
      if (!this.customLargeImage)
        object.largeImageKey = object.largeImageKey?.toLowerCase()

      if (!this.customSmallImage)
        object.smallImageKey = object.smallImageKey?.toLowerCase()

      /* Details and state */
      if (data.details) object.details = data.details
      if (data.state) object.state = data.state

      /* Timestamps */
      if (timestamps.start.enabled && timestamps.start.value) {
        object.startTimestamp = timestamps.start.value
      } else if (timestamps.end.enabled && timestamps.end.value) {
        object.endTimestamp = this.$moment(
          timestamps.end.value,
          "HH:mm"
        ).valueOf()
      }

      /* Buttons */
      if (this.getButtons.length > 0) {
        object.buttons = []

        if (this.getButtons[0]?.label && this.getButtons[0]?.url)
          object.buttons.push({
            label: this.getButtons[0].label,
            url: this.getButtons[0].url,
          })

        if (this.getButtons[1]?.label && this.getButtons[1]?.url)
          object.buttons.push({
            label: this.getButtons[1].label,
            url: this.getButtons[1].url,
          })
      }

      // Have to change at least one value because Discord doesn't re-render the data on timestamp changes
      object.smallImageText = data.smallImageText || "NULL"
      if (object.smallImageText === "NULL") delete object.smallImageText

      if (Object.keys(object).length < 1) return {}
      else return JSON.stringify(object)
    },
  },
  watch: {
    presence: {
      deep: true,
      immediate: false,
      handler() {
        if (this.presenceChecked === true) {
          localStorage.setItem(
            "presenceData",
            JSON.stringify({
              customLargeImage: this.customLargeImage,
              customSmallImage: this.customSmallImage,
              presence: this.presence,
            })
          )
        }
      },
    },
  },
  beforeDestroy() {
    this.observer?.disconnect()
  },
  mounted() {
    this.setupMutationObserver()
    this.setSavedData()
  },
  methods: {
    /**
     * Checks if there's a saved data in localStorage and sets it to the Vue data.
     */
    setSavedData() {
      const data = localStorage.getItem("presenceData")

      if (!data) {
        this.presenceChecked = true
      } else {
        const jsonData = JSON.parse(data)

        // Delete saved data if it's from the previous version
        if (!jsonData?.presence) return localStorage.removeItem("presenceData")

        const timestamps = jsonData.presence.timestamp
        this.customLargeImage = jsonData.customLargeImage
        this.customSmallImage = jsonData.customSmallImage

        this.presence = {
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
        }

        this.presenceChecked = true
      }
    },
    toggleCustomImage(type: "large" | "small"): void {
      if (type === "large") {
        this.presence.largeImageKey = this.customLargeImage ? "PreMiD" : ""
        this.customLargeImage = !this.customLargeImage
      } else {
        this.presence.smallImageKey = this.customSmallImage ? "None" : ""
        this.customSmallImage = !this.customSmallImage
      }
    },
    /**
     * Turns on and off a timestamp value.
     * @param {elapsed|left} option
     */
    toggleTimestamp(option: "elapsed" | "left") {
      const start = this.presence.timestamp.start
      const end = this.presence.timestamp.end

      if (option === "elapsed") {
        if (start.enabled === false) {
          end.enabled = false

          start.value = new Date().getTime()
          start.enabled = true

          this.presence.smallImageText = this.presence.smallImageText || null
        } else {
          start.value = null
          start.enabled = false
        }
      } else if (option === "left" && end.enabled === true) {
        end.enabled = false
        end.value = null

        end.enabled = !end.enabled
      }
    },
    /**
     * Gets called when end timestamp value is changed.
     */
    endTimestampChange() {
      this.presence.timestamp.start.enabled = false
      this.presence.timestamp.start.value = null

      this.presence.timestamp.end.enabled = true
    },
    /**
     * Creates a mutation observer that looks for the changes in #__nuxt, which gets mutated by PreMiD Presence to detect if presence is added.
     */
    setupMutationObserver() {
      const target = document.getElementById("__nuxt")
      let currentState = target?.classList?.contains("presence")

      // Return if it was already set, no need an observer
      if (currentState) return
      else this.presence.installed = false

      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName !== "class") return

          const mutTarget = mutation.target as HTMLElement
          const newClassState = mutTarget?.classList.contains("presence")

          if (currentState !== newClassState) {
            currentState = newClassState
            this.presence.installed = newClassState || false

            if (this.presence.installed === true) this.observer?.disconnect()
          }
        })
      })

      this.observer.observe(target, { attributes: true })
    },
  },
})
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
        class="space-y-4 mt-4 gap-x-4 gap-y-8 md:(grid space-y-0 grid-cols-2)"
      >
        <div class="space-y-2">
          <Title :padding="false"> Details (upper text) </Title>

          <input
            v-model="presence.details"
            type="text"
            placeholder="Something nice"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <Title :padding="false"> State (lower text) </Title>

          <input
            v-model="presence.state"
            type="text"
            placeholder="This is neat!"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <div class="flex space-x-2 items-center justify-between">
            <Title :padding="false"> Large Image </Title>

            <div
              class="cursor-pointer flex space-x-1 transition-colors text-neutral-700/40 items-center dark:text-gray-100/40 hover:text-opacity-100 focus:outline-none"
              @click="toggleCustomImage('large')"
            >
              <span class="text-sm">custom</span>

              <IconSync class="h-5 w-5 focus:outline-none" />
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
                v-for="(item, i) of category.items.sort((a, b) =>
                  a.name.localeCompare(b.name)
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
            <Title :padding="false"> Small Image </Title>

            <div
              class="cursor-pointer flex space-x-1 transition-colors text-neutral-700/40 items-center dark:text-gray-100/40 hover:text-opacity-100 focus:outline-none"
              @click="toggleCustomImage('small')"
            >
              <span class="text-sm">custom</span>

              <IconSync class="h-5 w-5 focus:outline-none" />
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
                v-for="(item, i) of category.items.sort((a, b) =>
                  a.name.localeCompare(b.name)
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
            <Title :padding="false"> Buttons </Title>

            <p class="text-sm text-black/50 dark:text-white/30 mt-4">
              You can't click your own buttons from your Discord profile. If
              they appear here, they should also be working for others, blame
              Discord.
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
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
          <Title :padding="false"> Timestamps </Title>

          <div class="grid gap-4 md:grid-cols-2">
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
          <Title :padding="false"> Consider Donating! </Title>

          <p class="text-black/50 text-sm dark:text-white/30 mt-4">
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

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <Title :padding="false"> How does it work? </Title>

            <p class="text-black/50 text-sm dark:text-white/30 mt-4">
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
            <Title :padding="false"> It's not showing anything!? </Title>

            <p class="text-black/50 text-sm dark:text-white/30 mt-4">
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
  @apply bg-black/5 transition-colors dark:(bg-white/10 text-white/70 placeholder-white/30 focus:border-white/10) text-black/70 text-sm rounded-lg px-4  py-2 placeholder-black/50 outline-none focus:border-black/10 border border-transparent;

  &[type="time"] {
    @apply py-px px-2;
  }
}

.timestamp {
  @apply bg-black/5 flex items-center space-x-2 justify-center transition-colors dark:(bg-white/10 text-white/70 placeholder-white/30 focus:border-white/10) text-black/70 text-sm rounded-lg px-4  py-2 placeholder-black/50 outline-none focus:border-black/10 border border-transparent;

  &:not(.cursor-default) {
    @apply cursor-pointer;
  }

  &:not(.active) {
    @apply text-black/50 dark:text-white/70;
  }

  &.active {
    @apply bg-green-500 dark:(bg-green-700) text-white/90 drop-shadow-md;
  }
}

a {
  @apply text-blue-500 hover:(text-blue-600 underline);
}
</style>
