<template>
  <div class="w-full px-6 py-4 overflow-x-hidden rounded-md bg-[#6c82cf]">
    <div class="pt-2">
      <h1 class="text-xs font-bold text-white uppercase dark:text-gray-100">
        Playing a game
      </h1>

      <div
        class="flex flex-col items-center justify-between space-y-3 overflow-x-hidden sm:space-y-0 sm:space-x-3 sm:flex-row"
      >
        <div
          :class="{
            'flex items-center w-full py-2 space-x-3 overflow-x-hidden  md:space-x-5': true,
            'sm:w-2/3': buttons.length > 0,
          }"
        >
          <div class="relative flex-shrink-0 w-32 h-32">
            <img
              class="rounded-md"
              :src="getImages.largeImage"
              draggable="false"
              alt="big image"
            />

            <img
              v-if="getImages.smallImage"
              v-tippy="{
                content: getText.small,
                placement: 'top',
              }"
              class="box-border absolute rounded-full bg-[#6c82cf] -bottom-2 -right-2 w-9 ring-4 ring-[#6c82cf] focus:outline-none"
              :src="getImages.smallImage"
              draggable="false"
              alt="small image"
            />
          </div>

          <div class="overflow-x-hidden text-gray-100">
            <h1 class="block text-xl font-semibold text-white">
              {{ title }}
            </h1>

            <div class="leading-tight">
              <span class="block truncate">{{ getText.details }}</span>
              <span class="block truncate">{{ getText.state }}</span>

              <span v-if="isTimerEnabled === true" class="block text-sm">
                {{ getTime }}
              </span>
            </div>
          </div>
        </div>

        <div
          v-if="buttons.length !== 0"
          class="flex-shrink-0 w-full overflow-x-hidden sm:w-1/3"
        >
          <div class="sm:ml-auto">
            <div class="grid grid-cols-1 gap-2">
              <a
                v-for="(button, index) in buttons"
                :key="`button-${index}`"
                :href="button.url || null"
                :title="button.url ? 'Click to follow your URL' : null"
                class="px-4 py-2 text-sm text-center text-white truncate border border-white rounded-sm cursor-pointer select-none sm:px-3 sm:py-1 focus:bg-opacity-10 focus:bg-white"
                target="_blank"
              >
                {{ button.label }}
              </a>
            </div>
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
      default: "[ENTER SOMETHING]",
    },
    buttons: {
      type: Array,
      required: false,
      default: () => [],
    },
    state: {
      type: String,
      required: false,
      default: "[ENTER SOMETHING]",
    },
    timestamp: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      timers: {
        elapsed: {
          instance: null,
          string: "",
        },
        end: {
          instance: null,
          string: "",
        },
      },
    }
  },
  computed: {
    /**
     * Returns large and small image by replacing the spaces in their name.
     * @returns {{largeImage: string[], smallImage: string[]}}
     */
    getImages() {
      const largeImageKey = this.largeImage?.replace(/\s/g, "")
      const smallImageKey = this.smallImage?.replace(/\s/g, "")

      return {
        largeImage: largeImages[largeImageKey] || "https://i.vgy.me/NZdome.png",
        smallImage: smallImages[smallImageKey],
      }
    },
    /**
     * Returns text related parts for the UI.
     * @returns {{details: string, state: string, small: string}}
     */
    getText() {
      let small

      if (this.smallImage && this.smallImageText) small = this.smallImageText
      else if (this.smallImage && !this.smallImageText) small = "[EMPTY]"

      return {
        details: this.details || "[ENTER SOMETHING]",
        state: this.state || "[ENTER SOMETHING]",
        small,
      }
    },
    /**
     * Checks if timers are enabled, starts or stops timers according to passed props.
     * @returns {boolean} Whether any timer is enabled or not.
     */
    isTimerEnabled() {
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
     * @returns {boolean|string}
     */
    getTime() {
      if (this.isTimerEnabled.value === false) return null
      else if (this.timers.elapsed?.instance) return this.timers.elapsed.string
      else if (this.timers.end?.instance) return this.timers.end.string
      else return null
    },
  },
  beforeDestory() {
    this.stopTimers()
  },
  methods: {
    /**
     * Stops both of the timers.
     */
    stopTimers() {
      const elapsed = this.timers.elapsed
      const end = this.timers.end

      // Clear elapsed timer
      clearInterval(elapsed.instance)
      elapsed.instance = null
      elapsed.string = ""

      // Clear end timer
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
          this.$moment().diff(target, "hours"),
          this.$moment().diff(target, "minutes") % 60,
          this.$moment().diff(target, "seconds") % 60,
        ]

        if (!timeArray[0]) timeArray = timeArray.slice(1)
        timeArray = timeArray.map((time) =>
          String(time).length === 1 ? "0" + String(time) : time
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
          duration.hours(),
          duration.minutes(),
          duration.seconds(),
        ]

        if (!timeArray[0]) timeArray = timeArray.slice(1)
        timeArray = timeArray.map((time) =>
          String(time).length === 1 ? "0" + String(time) : time
        )

        timer.string = `${timeArray.join(":")} left`
      }, 1000)
    },
  },
}
</script>
