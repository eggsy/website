<template>
  <div class="w-full px-6 py-4 rounded-md bg-social-discord-dark">
    <div class="py-2 space-y-2">
      <h1 class="uppercase text-white text-xs font-extrabold">
        Playing a game
      </h1>

      <div class="flex space-x-5 items-center">
        <div class="w-1/5 relative">
          <img
            class="rounded-md"
            :src="getImages.largeImage"
            draggable="false"
            alt="big image"
          />

          <img
            v-if="getImages.smallImage"
            class="rounded-full bg-social-discord-dark box-border absolute -bottom-2 -right-2 w-9 ring-4 ring-social-discord-dark"
            :src="getImages.smallImage"
            draggable="false"
            alt="small image"
          />
        </div>

        <div class="flex-grow leading-none truncate w-4/5 text-gray-100">
          <span class="font-semibold text-white block">Custom Status</span>
          <span class="text-sm block truncate">{{ getText.details }}</span>
          <span class="text-sm block truncate">{{ getText.state }}</span>
          <span v-if="isTimerEnabled === true" class="text-sm block">{{
            getTime
          }}</span>
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
    largeImage: {
      type: String,
      required: false,
      default: () => "PreMiD",
    },
    smallImage: {
      type: String,
      required: false,
      default: () => null,
    },
    details: {
      type: String,
      required: false,
      default: () => "[ENTER SOMETHING]",
    },
    state: {
      type: String,
      required: false,
      default: () => "[ENTER SOMETHING]",
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
        left: {
          instance: null,
          string: "",
        },
      },
    }
  },
  computed: {
    getImages() {
      const largeImageKey = this.largeImage?.replace(/\s/g, "")
      const smallImageKey = this.smallImage?.replace(/\s/g, "")

      return {
        largeImage:
          largeImages[largeImageKey] || "https://i.imgur.com/FowB3D5.png",
        smallImage: smallImages[smallImageKey] || null,
      }
    },
    getText() {
      return {
        details: this.details || "[ENTER SOMETHING]",
        state: this.state || "[ENTER SOMETHING]",
      }
    },
    isTimerEnabled() {
      const start = this.timestamp.start
      const end = this.timestamp.end

      if (start && start.value) {
        this.startElapsedTimer
        return true
      } else if (end && end.value) {
        this.startLeftTimer()
        return true
      } else {
        this.stopTimers()
        return false
      }
    },
    getTime() {
      if (this.isTimerEnabled.value === false) return null
      else if (this.timers.elapsed) return this.timers.elapsed.string
      else if (this.isTimerEnabled.timer === "left")
        return this.timers.left.string
      else return null
    },
  },
  beforeDestory() {
    this.stopTimers()
  },
  methods: {
    stopTimers() {
      const elapsed = this.timers.elapsed
      const left = this.timers.left

      // Clear elapsed timer
      clearInterval(elapsed.instance)
      elapsed.instance = null
      elapsed.string = ""

      // Clear left timer
      clearInterval(left.instance)
      left.instance = null
      left.string = ""
    },
    startElapsedTimer() {
      const target = this.timestamp.start.value
      const timer = this.timers.elapsed

      timer.string = "00:00"
      timer.instance = setInterval(() => {
        const toTime = this.$dayjs(target)
        const fromTime = this.$dayjs()

        let timeArray = [
          Math.round(fromTime.diff(toTime, "hours", true)),
          Math.round(fromTime.diff(toTime, "minutes", true)),
          Math.round(fromTime.diff(toTime, "seconds", true)),
        ]

        if (!timeArray[0]) timeArray = timeArray.slice(1)
        timeArray = timeArray.map((time) =>
          String(time).length === 1 ? "0" + String(time) : time
        )

        timer.string = timeArray.join(":")
      }, 1000)
    },
    // TODO: Finish left timer
    startLeftTimer() {
      const target = this.timestamp.end.value
      const timer = this.timers.end

      timer.string = "--:--"
      timer.instance = setInterval(() => {
        const toTime = this.$dayjs(target)
        const fromTime = this.$dayjs()

        let timeArray = [
          Math.round(fromTime.diff(toTime, "hours", true)),
          Math.round(fromTime.diff(toTime, "minutes", true)),
          Math.round(fromTime.diff(toTime, "seconds", true)),
        ]

        if (!timeArray[0]) timeArray = timeArray.slice(1)
        timeArray = timeArray.map((time) =>
          String(time).length === 1 ? "0" + String(time) : time
        )

        timer.string = timeArray.join(":")
      }, 1000)
    },
  },
}
</script>
