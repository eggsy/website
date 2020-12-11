<template>
  <div class="space-y-2">
    <h1 class="text-2xl block font-semibold dark:text-gray-100">
      PreMiD Custom Status
    </h1>

    <section class="flex space-x-6">
      <div class="w-6/12">
        <CardDiscord
          :large-image="presence.largeImageKey"
          :small-image="presence.smallImageKey"
          :timestamp="presence.timestamp"
          :details="presence.details"
          :state="presence.state"
          class="shadow-lg"
        />

        <div class="mt-4 space-y-2">
          <div class="flex space-x-2 items-center w-full">
            <h3 class="text-gray-700 dark:text-gray-200 font-medium w-1/4">
              Details (upper text)
            </h3>
            <input v-model="presence.details" class="w-3/4" />
          </div>

          <div class="flex space-x-2 items-center w-full">
            <h3 class="text-gray-700 dark:text-gray-200 font-medium w-1/4">
              State (lower text)
            </h3>
            <input v-model="presence.state" class="w-3/4" />
          </div>

          <div class="flex space-x-2 items-center w-full">
            <h3 class="text-gray-700 dark:text-gray-200 font-medium w-1/4">
              Large Image
            </h3>
            <select v-model="presence.largeImageKey" class="w-3/4">
              <option selected>PreMiD</option>
              <option
                v-for="(image, index) of getImageNames.large"
                :key="`large-image-${index}`"
              >
                {{ image }}
              </option>
            </select>
          </div>

          <div class="flex space-x-2 items-center w-full">
            <h3 class="text-gray-700 dark:text-gray-200 font-medium w-1/4">
              Small Image
            </h3>
            <select v-model="presence.smallImageKey" class="w-3/4">
              <option selected>None</option>
              <option
                v-for="(image, index) of getImageNames.small"
                :key="`small-image-${index}`"
              >
                {{ image }}
              </option>
            </select>
          </div>

          <div class="flex space-x-2 items-center w-full">
            <h3 class="text-gray-700 dark:text-gray-200 font-medium w-1/4">
              Timestamps
            </h3>

            <div class="w-3/4 grid grid-cols-2 gap-4">
              <div
                :class="{
                  'rounded-md transition p-2 text-center cursor-pointer select-none ring-2 ring-gray-200 ring-opacity-25': true,
                  'bg-white dark:bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-300 text-gray-700':
                    presence.timestamp.start.enabled === false,
                  'bg-green-500 hover:bg-green-600 text-white':
                    presence.timestamp.start.enabled === true,
                }"
                @click="toggleTimestamp('elapsed')"
              >
                Show Time Elapsed
              </div>

              <div
                :class="{
                  'rounded-md transition p-2 text-center cursor-pointer select-none ring-2 ring-gray-200 ring-opacity-25': true,
                  'bg-white dark:bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-300 text-gray-700':
                    presence.timestamp.end.enabled === false,
                  'bg-green-500 hover:bg-green-600 text-white':
                    presence.timestamp.end.enabled === true,
                }"
                @click="toggleTimestamp('left')"
              >
                Show Time Left
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="w-6/12 space-y-4">
        <div
          class="bg-green-500 dark:bg-green-600 w-full p-4 rounded-md text-white dark:text-gray-100"
        >
          Welcome to the new look of Custom Status! I've completely reworked on
          this page and all of other pages. Please take a look at other pages
          too!
        </div>

        <div>
          <h2
            class="text-lg block font-semibold text-gray-800 dark:text-gray-100"
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

        <div>
          <h2
            class="text-lg block font-semibold text-gray-800 dark:text-gray-100"
          >
            It's not showing anything!?
          </h2>

          <p class="text-gray-700 dark:text-gray-200">
            If the system isn't working or it isn't displaying anything on your
            profile, it's most likely about you. Please check
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
            class="text-lg block font-semibold text-gray-800 dark:text-gray-100"
          >
            How do I donate?
          </h2>

          <p class="text-gray-700 dark:text-gray-200">
            If you want to support my work here, you can contact with me on
            <a
              href="https://discord.com/users/162969778699501569"
              title="Click to visit my profile"
              rel="noreferrer"
              target="_blank"
              >Discord</a
            >, my name is <strong>EGGSY#3388</strong> and you can find me on
            PreMiD's Discord server. Thank you for your contributions!
          </p>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import largeImages from "@/assets/files/premid/largeImages"
import smallImages from "@/assets/files/premid/smallImages"

export default {
  layout: "premid",
  data() {
    return {
      presence: {
        raw: "",
        largeImageKey: "PreMiD",
        smallImageKey: "None",
        details: "",
        state: "",
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
  head: {
    title: "PreMiD Custom Status",
  },
  computed: {
    getImageNames() {
      const formatName = (name) =>
        name?.match(/[A-Z][a-z]+/g)?.join(" ") || name

      return {
        large: Object.keys(largeImages).map(formatName)?.sort(),
        small: Object.keys(smallImages).map(formatName)?.sort(),
      }
    },
  },
  methods: {
    toggleTimestamp(option) {
      const start = this.presence.timestamp.start
      const end = this.presence.timestamp.end

      if (option === "elapsed") {
        if (start.enabled === false) {
          end.enabled = false

          start.value = Date.now()
          start.enabled = true
        } else {
          start.value = null
          start.enabled = false
        }
      } else if (option === "left") {
        start.enabled = false
        start.value = null

        end.enabled = !end.enabled
      }
    },
  },
}
</script>

<style lang="scss" scoped>
input,
select {
  @apply rounded-md ring-2 focus:ring-4 focus:outline-none ring-gray-300 ring-opacity-25 px-4 py-2 dark:bg-gray-200;
}

a {
  @apply text-blue-500 hover:text-blue-600 hover:underline;
}
</style>
