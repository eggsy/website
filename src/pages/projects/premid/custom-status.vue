<template>
  <div class="space-y-2">
    <!-- Custom Status Presence will read the data from here -->
    <div id="object" class="hidden">
      {{ getPresenceData }}
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <div
          v-if="presence.installed === false"
          class="hidden mb-2 bg-red-500 sm:block information dark:bg-gray-700"
        >
          You need to install the Custom Status presence from the PreMiD Store
          to be able to use this page.
          <a
            href="https://premid.app/store/presences/Custom%20Status"
            target="_blank"
            rel="noreferrer"
            class="text-blue-200"
          >
            Click here
          </a>
          to visit the store.
        </div>

        <div class="block bg-red-500 sm:hidden information dark:bg-gray-700">
          Are you on mobile? If you are you should know that PreMiD doesn't work
          on mobile, so you can't use this page in any way.
        </div>

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

      <div class="gap-4 mt-4 space-y-4 sm:grid sm:space-y-0 sm:grid-cols-2">
        <div class="space-y-2">
          <h3 class="font-medium text-gray-700 dark:text-gray-100">
            Details (upper text)
          </h3>

          <input
            v-model="presence.details"
            type="text"
            placeholder="Something nice"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <h3 class="font-medium text-gray-700 dark:text-gray-100">
            State (lower text)
          </h3>

          <input
            v-model="presence.state"
            type="text"
            placeholder="This is neat!"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <h3 class="font-medium text-gray-700 dark:text-gray-100">
            Large Image
          </h3>
          <select
            v-model="presence.largeImageKey"
            class="w-full bg-white dark:bg-gray-700"
          >
            <option selected>PreMiD</option>
            <option
              v-for="(image, index) of getImageNames.large"
              :key="`large-image-${index}`"
            >
              {{ image }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
          <h3 class="w-full font-medium text-gray-700 dark:text-gray-100">
            Small Image
          </h3>
          <select
            v-model="presence.smallImageKey"
            class="w-full bg-white dark:bg-gray-700"
          >
            <option selected>None</option>
            <option
              v-for="(image, index) of getImageNames.small"
              :key="`small-image-${index}`"
            >
              {{ image }}
            </option>
          </select>
        </div>

        <div
          v-if="presence.smallImageKey !== 'None'"
          class="w-full col-span-2 space-y-2"
        >
          <h3 class="w-full font-medium text-gray-700 dark:text-gray-100">
            Small Image Text
          </h3>
          <input v-model="presence.smallImageText" type="text" class="w-full" />
        </div>

        <div class="col-span-2 space-y-2">
          <h3 class="w-full font-medium text-gray-700 dark:text-gray-100">
            Buttons
          </h3>

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

        <div class="col-span-2 space-y-2">
          <h3 class="w-full font-medium text-gray-700 dark:text-gray-100">
            Timestamps
          </h3>

          <div class="grid gap-4 sm:grid-cols-2">
            <div
              :class="{
                'timestamp dark:text-gray-200': true,
                'active text-white dark:text-gray-100':
                  presence.timestamp.start.enabled === true,
              }"
              @click="toggleTimestamp('elapsed')"
            >
              Show Time Elapsed
            </div>

            <div
              :class="{
                'timestamp cursor-default': true,
                active: presence.timestamp.end.enabled === true,
              }"
            >
              <span
                :class="{
                  'dark:text-gray-200': true,
                  'text-white dark:text-gray-100':
                    presence.timestamp.end.enabled === true,
                }"
                >Time To:
              </span>
              <input
                v-model="presence.timestamp.end.value"
                type="time"
                @input="endTimestampChange"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div class="space-y-2">
          <div class="bg-green-500 information dark:bg-gray-700">
            Welcome to the new look of PreMiD pages including Custom Status. I
            have completely redesigned my website, please take a look at the
            rest too!
          </div>

          <div>
            <h2
              class="block text-lg font-semibold text-gray-800 dark:text-gray-100"
            >
              How does it work?
            </h2>
            <p class="text-gray-700 dark:text-gray-200">
              When you add our Presence from Presence Store from
              <a
                href="https://premid.app/store/presences/Custom%20Status?utm_source=eggsy.xyz"
                title="PreMiD Store"
                rel="noreferrer"
                target="_blank"
                >this page</a
              >, you will be able to use this page. You just have to set your
              settings and PreMiD will show those settings on your profile just
              like in the preview here.
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <div>
            <h2
              class="block text-lg font-semibold text-gray-800 dark:text-gray-100"
            >
              It's not showing anything!?
            </h2>

            <p class="text-gray-700 dark:text-gray-200">
              If the system isn't working or it isn't displaying anything on
              your profile, it's most likely about you. Please check
              <a
                href="https://premid.app/store/presences/Custom%20Status?utm_source=eggsy.xyz"
                title="PreMiD Docs"
                rel="noreferrer"
                target="_blank"
                >Troubleshooting Documentation</a
              >
              and see if those steps will fix your issue. If nothing works out,
              you can always find me on PreMiD's Discord server and get support
              there!
            </p>
          </div>

          <div>
            <h2
              class="block text-lg font-semibold text-gray-800 dark:text-gray-100"
            >
              Can I donate?
            </h2>

            <p class="text-gray-700 dark:text-gray-200">
              If you want to support my work and make me create better systems
              in the future, you can donate me through Patreon, please visit
              <nuxt-link
                :to="{ name: 'donate' }"
                class="font-medium hover:underline"
              >
                my donate page
              </nuxt-link>
              for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import largeImages from "@/assets/files/premid/largeImages"
import smallImages from "@/assets/files/premid/smallImages"

export default {
  data() {
    return {
      presence: {
        installed: true,
        largeImageKey: "PreMiD",
        smallImageKey: "None",
        smallImageText: "",
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
     * @returns {{ large: string[], small: string[]}} An object with large and small image array.
     */
    getImageNames() {
      const formatName = (name) =>
        name?.match(/[A-Z][a-z]+/g)?.join(" ") || name

      return {
        large: Object.keys(largeImages).map(formatName)?.sort(),
        small: Object.keys(smallImages).map(formatName)?.sort(),
      }
    },
    /**
     * Checks if any of the buttons have label and returns each that has.
     * @returns {object[]} Buttons array.
     */
    getButtons() {
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
    getPresenceData() {
      const data = this.presence
      const timestamps = data.timestamp
      const object = {}

      /* Large and small image */
      if (data.largeImageKey) object.largeImageKey = data.largeImageKey
      else object.largeImageKey = "premid"

      if (data.smallImageKey) object.smallImageKey = data.smallImageKey
      if (data.smallImageKey && data.smallImageText)
        object.smallImageText = data.smallImageText

      // Replace spaces and force lowercase
      object.largeImageKey = object.largeImageKey
        .replace(/\s/g, "")
        .toLowerCase()

      object.smallImageKey = object.smallImageKey
        .replace(/\s/g, "")
        .toLowerCase()

      // Details and state
      if (data.details) object.details = data.details
      if (data.state) object.state = data.state

      // Timestamps
      if (timestamps.start.enabled && timestamps.start.value) {
        object.startTimestamp = timestamps.start.value
      } else if (timestamps.end.enabled && timestamps.end.value) {
        object.endTimestamp = this.$moment(
          timestamps.end.value,
          "HH:mm"
        ).valueOf()
      }

      // Buttons
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
  },
  methods: {
    /**
     * Turns on and off a timestamp value.
     * @param {elapsed|left} option
     */
    toggleTimestamp(option) {
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
      let currentState = target.classList?.contains("presence")

      // Return if it was already set, no need an observer
      if (currentState) return
      else this.presence.installed = false

      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName !== "class") return

          const newClassState = mutation.target.classList.contains("presence")

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
}
</script>

<style lang="scss" scoped>
.information {
  @apply w-full p-4 rounded-md text-white;
}

input,
select {
  @apply rounded-md ring-2 focus:ring-4 focus:outline-none ring-gray-300 ring-opacity-25 px-4 py-2 dark:bg-gray-700 dark:ring-gray-800 dark:text-gray-200;

  &[type="time"] {
    @apply px-2 py-px;
  }
}

.timestamp {
  @apply rounded-md p-2 text-center  select-none ring-2 ring-gray-200 ring-opacity-25 bg-white dark:bg-gray-700 dark:ring-transparent;

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
  @apply text-blue-500 hover:text-blue-600 hover:underline;
}
</style>
