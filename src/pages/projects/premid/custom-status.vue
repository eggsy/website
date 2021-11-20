<script lang="ts">
import Vue from "vue"

/* Interfaces */
interface ImageCategory {
  name: string
  items: {
    name: string
    url: string
  }[]
}

/* Import image lists */
import largeImages from "@/assets/files/premid/largeImages"
import smallImages from "@/assets/files/premid/smallImages"
import { PresenceMetadata } from "~/src/types/PreMiD"

export default Vue.extend({
  data() {
    return {
      observer: null as any,
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
    const image = "https://i.vgy.me/NZdome.png"
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
      } catch (_) { }

      try {
        if (isSecondButton) isUrl.second = !!new URL(secondButton?.url)
      } catch (_) { }

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
    getPresenceData() {
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
      object.largeImageKey = object.largeImageKey
        ?.replace(/\s/g, "")
        ?.toLowerCase()

      object.smallImageKey = object.smallImageKey
        ?.replace(/\s/g, "")
        ?.toLowerCase()

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
  beforeDestroy() {
    this.observer.disconnect()
  },
  mounted() {
    this.setupMutationObserver()
    this.setSavedData()


  },
  watch: {
    "presence": {
      deep: true,
      handler() {
        localStorage.setItem("presenceData", JSON.stringify(this.presence))
      },
    },
  },
  methods: {
    /**
     * Checks if there's a saved data in localStorage and sets it to the Vue data.
     */
    setSavedData() {
      const data = localStorage.getItem("presenceData");

      if (!data) return;

      const jsonData = JSON.parse(data)
      const timestamps = jsonData.timestamp

      this.presence = {
        ...jsonData,
        timestamp: {
          start: {
            enabled: timestamps.start.enabled,
            value: Date.now(),
          },
          end: {
            enabled: false,
            value: null,
          },
        },
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

          const target = mutation.target as HTMLElement
          const newClassState = target?.classList.contains("presence")

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
    <div id="object" class="text-gray-900 hidden dark:text-gray-100">{{ getPresenceData }}</div>

    <div class="space-y-6">
      <div class="space-y-4">
        <BlogNotification v-if="presence.installed === false" type="danger">
          You need to install the Custom Status presence from the PreMiD Store
          to be able to use this page.
          <SmartLink
            href="https://premid.app/store/presences/Custom%20Status"
            class="text-blue-200"
            blank
          >Click here</SmartLink>to visit the store.
        </BlogNotification>

        <BlogNotification type="warning" class="sm:hidden">
          Are you on mobile? If you are you should know that PreMiD doesn't work
          on mobile, so you can't use this page in any way.
        </BlogNotification>

        <CardDiscord
          :small-image-text="presence.smallImageText"
          :large-image="presence.largeImageKey"
          :small-image="presence.smallImageKey"
          :timestamp="presence.timestamp"
          :details="presence.details"
          :state="presence.state"
          :buttons="getButtons"
          class="shadow-lg"
        />
      </div>

      <div class="space-y-4 mt-4 gap-4 sm:(grid space-y-0 grid-cols-2) ">
        <div class="space-y-2">
          <h3 class="font-medium text-gray-700 dark:text-gray-100">Details (upper text)</h3>

          <input v-model="presence.details" type="text" placeholder="Something nice" class="w-full" />
        </div>

        <div class="space-y-2">
          <h3 class="font-medium text-gray-700 dark:text-gray-100">State (lower text)</h3>

          <input v-model="presence.state" type="text" placeholder="This is neat!" class="w-full" />
        </div>

        <div class="space-y-2">
          <h3 class="font-medium text-gray-700 dark:text-gray-100">Large Image</h3>
          <select v-model="presence.largeImageKey" class="bg-white w-full dark:bg-gray-700">
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
              >{{ item.name }}</option>
            </optgroup>
          </select>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium w-full text-gray-700 dark:text-gray-100">Small Image</h3>
          <select v-model="presence.smallImageKey" class="bg-white w-full dark:bg-gray-700">
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
              >{{ item.name }}</option>
            </optgroup>
          </select>
        </div>

        <div v-if="presence.smallImageKey !== 'None'" class="space-y-2 w-full col-span-2">
          <h3 class="font-medium w-full text-gray-700 dark:text-gray-100">Small Image Text</h3>

          <input v-model="presence.smallImageText" type="text" class="w-full" placeholder="[EMPTY]" />
        </div>

        <div class="space-y-4 col-span-2">
          <div>
            <h3 class="font-medium w-full text-gray-700 dark:text-gray-100">Buttons</h3>

            <p class="text-gray-600 dark:text-gray-300">
              You can't click your own buttons from your Discord profile. If
              they appear here, they should also be working for others, blame
              Discord.
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
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
          <h3 class="font-medium w-full text-gray-700 dark:text-gray-100">Timestamps</h3>

          <div class="grid gap-4 sm:grid-cols-2">
            <div
              class="timestamp dark:text-gray-200"
              :class="{
                'active text-white dark:text-gray-100':
                  presence.timestamp.start.enabled === true,
              }"
              @click="toggleTimestamp('elapsed')"
            >Show Time Elapsed</div>

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
              >Time To:</span>
              <input v-model="presence.timestamp.end.value" type="time" @input="endTimestampChange" />
            </div>
          </div>
        </div>
      </div>

      <section class="space-y-6">
        <div>
          <h2
            class="font-semibold text-lg text-gray-800 block dark:text-gray-100"
          >Consider Donating!</h2>

          <p class="text-gray-700 dark:text-gray-200">
            If you want to support my work and make me create better systems in
            the future, you can donate me through Patreon, please visit
            <SmartLink :href="{ name: 'donate' }" class="font-medium hover:underline">my donate page</SmartLink>for more information.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h2
              class="font-semibold text-lg text-gray-800 block dark:text-gray-100"
            >How does it work?</h2>
            <p class="text-gray-700 dark:text-gray-200">
              When you add our Presence from Presence Store which is on
              <SmartLink
                href="https://premid.app/store/presences/Custom%20Status"
                title="PreMiD Store"
                blank
              >this page</SmartLink>, you will be able to use this page. You just have to set your
              settings and PreMiD will show those settings on your profile just
              like in the preview you see up here.
            </p>
          </div>

          <div>
            <h2
              class="font-semibold text-lg text-gray-800 block dark:text-gray-100"
            >It's not showing anything!?</h2>

            <p class="text-gray-700 dark:text-gray-200">
              If the system isn't working or it isn't displaying anything on
              your profile, it's most likely about you. Please check
              <SmartLink
                href="https://docs.premid.app/troubleshooting"
                title="PreMiD Docs"
                blank
              >Troubleshooting Documentation</SmartLink>and see if those steps fixes your issue. If nothing works out, you
              can always find me on PreMiD's Discord server.
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
  @apply rounded-md py-2 px-4 ring-2 ring-gray-300 ring-opacity-25 dark:(bg-gray-700 ring-gray-800 text-gray-200) focus:outline-none focus:ring-4 ;

  &[type="time"] {
    @apply py-px px-2;
  }
}

.timestamp {
  @apply bg-white rounded-md text-center p-2 ring-2 ring-gray-200 ring-opacity-25 select-none dark:(bg-gray-700 ring-transparent) ;

  &:not(.cursor-default) {
    @apply cursor-pointer;
  }

  &:not(.active) {
    @apply text-gray-700 dark:text-gray-200;
  }

  &.active {
    @apply bg-green-500 dark:bg-green-700;
  }
}

a {
  @apply text-blue-500 hover:(text-blue-600 underline) ;
}
</style>
