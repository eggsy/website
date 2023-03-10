<script lang="ts">
/* eslint-disable no-undef */

import Vue, { PropType } from "vue"

/* Import image files */
import largeImages from "@/assets/files/premid/largeImages"
import smallImages from "@/assets/files/premid/smallImages"

/* Interfaces */
interface ImageCategory {
  name: string
  url: string
}

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: false,
      default: "Custom Status",
    },
    largeImage: {
      type: String,
      required: false,
      default: "PreMiD",
    },
    smallImage: {
      type: String,
      required: false,
      default: null,
    },
    smallImageText: {
      type: String,
      required: false,
      default: null,
    },
    details: {
      type: String,
      required: false,
      default: "",
    },
    buttons: {
      type: Array as PropType<{ label: string; url: string }[]>,
      required: false,
      default: () => [],
    },
    state: {
      type: String,
      required: false,
      default: "",
    },
    customImageUrl: {
      type: Object as PropType<{ small: string; large: string }>,
      required: false,
      default: () => ({ small: "", large: "" }),
    },
    timestamp: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      componentReady: false,
      timers: {
        elapsed: {
          instance: null as NodeJS.Timeout | null,
          string: "",
        },
        end: {
          instance: null as NodeJS.Timeout | null,
          string: "",
        },
      },
    }
  },
  computed: {
    /**
     * Returns large and small image by replacing the spaces in their name.
     * @returns {{largeImage: string, smallImage: string}}
     */
    getImages(): { largeImage: string; smallImage: string | null } {
      const { largeImage, smallImage } = this

      /* Map arrays and combine items in all categories */
      const largeAll: ImageCategory[] = []
      const smallAll: ImageCategory[] = []

      /* Loop into all arrays inside items and combine them in a single array */
      largeImages
        .map((item) => item.items)
        .forEach((category) => largeAll.push(...category))

      smallImages
        .map((item) => item.items)
        .forEach((category) => smallAll.push(...category))

      return {
        largeImage: this.customImageUrl.large
          ? largeImage
          : largeAll.find((item) => item.name === largeImage)?.url ||
            "https://i.imgur.com/CuVtvKW.png",
        smallImage: this.customImageUrl.small
          ? smallImage
          : smallAll.find((item) => item.name === smallImage)?.url || null,
      }
    },
    /**
     * Returns text related parts for the UI.
     * @returns {{details: string, state: string, small: string | undefined}}
     */
    getText(): { details: string; state: string; small: string | undefined } {
      const { smallImage, smallImageText, details, state } = this

      let small

      if (smallImage && smallImageText) small = smallImageText
      else if (smallImage && !smallImageText) small = "[EMPTY]"

      return {
        details,
        state,
        small,
      }
    },
    /**
     * Checks if timers are enabled, starts or stops timers according to passed props.
     * @returns {boolean} Whether any timer is enabled or not.
     */
    isTimerEnabled(): boolean {
      const start = this?.timestamp?.start
      const end = this?.timestamp?.end

      if (start?.enabled && start?.value) {
        this.startElapsedTimer()
        return true
      } else if (end?.enabled && end?.value) {
        this.startLeftTimer()
        return true
      } else {
        this.stopTimers()
        return false
      }
    },
    /**
     * Returns the string for enabled timer.
     * @returns {boolean |null | string}
     */
    getTime(): boolean | null | string {
      if (this.isTimerEnabled === false) return null
      else if (this.timers.elapsed?.instance) return this.timers.elapsed.string
      else if (this.timers.end?.instance) return this.timers.end.string
      else return null
    },
  },
  mounted() {
    this.componentReady = true
  },
  beforeDestroy() {
    this.stopTimers()
  },
  methods: {
    /**
     * Stops both of the timers.
     */
    stopTimers() {
      const { elapsed, end } = this.timers

      if (typeof elapsed === "boolean" && typeof end === "boolean") return

      /* Clear elapsed timer */

      // @ts-ignore-next-line
      clearInterval(elapsed.instance)
      elapsed.instance = null
      elapsed.string = ""

      /* Clear end timer */

      // @ts-ignore-next-line
      clearInterval(end.instance)
      end.instance = null
      end.string = ""
    },
    /**
     * Calculates the time difference between now and selected time and starts the elapsed timer.
     */
    startElapsedTimer() {
      const target = this?.timestamp?.start?.value
      const timer = this?.timers?.elapsed

      if (!target || !timer) return
      this.stopTimers()

      timer.string = "00:00 elapsed"
      timer.instance = setInterval(() => {
        let timeArray = [
          String(this.$moment().diff(target, "hours")),
          String(this.$moment().diff(target, "minutes") % 60),
          String(this.$moment().diff(target, "seconds") % 60),
        ]

        if (timeArray[0] === "0") timeArray = timeArray.slice(1)
        timeArray = timeArray.map((time) =>
          time.length === 1 ? `0${time}` : time
        )

        timer.string = `${timeArray.join(":")} elapsed`
      }, 1000)
    },
    /**
     * Calculates the time difference between now and selected time and starts the elapsed timer.
     */
    startLeftTimer() {
      const target = this?.timestamp?.end?.value
      const timer = this?.timers?.end

      if (!target || !timer) return
      this.stopTimers()

      timer.string = "--:-- left"
      timer.instance = setInterval(() => {
        const toTime = this.$moment(target, "HH:mm").unix()
        const fromTime = this.$moment().unix()
        const duration = this.$moment.duration(toTime - fromTime, "seconds")

        if (duration.asSeconds() < 0) return (timer.string = "00:00 left")

        let timeArray = [
          String(duration.hours()),
          String(duration.minutes()),
          String(duration.seconds()),
        ]

        if (timeArray[0] === "0") timeArray = timeArray.slice(1)
        timeArray = timeArray.map((time) =>
          time.length === 1 ? `0${time}` : time
        )

        timer.string = `${timeArray.join(":")} left`
      }, 1000)
    },
  },
})
</script>

<template>
  <div
    v-if="componentReady"
    class="rounded-md bg-[#6c82cf] w-full py-4 px-6 overflow-x-hidden dark:bg-neutral-800/40"
  >
    <div class="pt-2">
      <h1 class="font-semibold text-xs text-white uppercase dark:text-gray-100">
        Playing a game
      </h1>

      <div
        class="flex flex-col space-y-3 items-center justify-between overflow-x-hidden md:(space-y-0 space-x-3 flex-row)"
      >
        <div
          class="flex space-x-3 w-full py-2 items-center overflow-x-hidden md:space-x-5"
          :class="buttons.length > 0 && 'md:w-2/3'"
        >
          <div class="flex-shrink-0 h-32 w-32 relative">
            <SmartImage
              :key="getImages.largeImage"
              :src="getImages.largeImage"
              class="rounded-xl"
              alt="large image"
              height="256"
              width="256"
            />

            <SmartImage
              v-if="getImages.smallImage"
              :key="getImages.smallImage"
              v-tippy="{
                content: getText.small,
                placement: 'top',
              }"
              :src="getImages.smallImage"
              alt="small image"
              class="rounded-full bg-[#6c82cf] h-9 -right-2 -bottom-2 ring-4 ring-[#6c82cf] w-9 overflow-y-hidden absolute box-border dark:(bg-transparent ring-transparent) focus:outline-none"
            />
          </div>

          <div class="text-gray-100 overflow-x-hidden">
            <h1 class="font-medium text-xl text-white block">{{ title }}</h1>

            <div class="leading-tight">
              <span class="block truncate">{{ getText.details }}</span>
              <span class="block truncate">{{ getText.state }}</span>

              <span v-if="isTimerEnabled === true" class="text-sm block">{{
                getTime
              }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="buttons.length > 0"
          class="flex flex-col space-y-2 flex-shrink-0 md:w-1/3"
        >
          <div
            v-for="(button, index) in buttons"
            :key="`button-${index}`"
            class="flex justify-end"
          >
            <SmartLink
              :href="button.url"
              :title="button.url"
              class="border rounded-sm cursor-pointer border-white/40 text-sm py-2 px-4 transition-colors text-gray-300 truncate select-none md:(px-3 py-1) hover:(text-white border-white) focus:(bg-opacity-10 bg-white)"
              blank
              >{{ button.label }}</SmartLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Skeleton load -->
  <div
    v-else
    class="rounded-md bg-[#6c82cf] h-[12.5rem] w-full animate-pulse"
  />
</template>
