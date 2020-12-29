<template>
  <div class="w-full px-6 py-4 rounded-md bg-social-discord-dark">
    <div class="py-2 space-y-2">
      <h1 class="uppercase text-white dark:text-gray-100 text-xs font-bold">
        Playing a game
      </h1>

      <div class="flex space-x-3 md:space-x-5 items-center">
        <div class="w-1/4 md:w-1/5 relative">
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
            class="rounded-full bg-social-discord-dark box-border absolute -bottom-2 -right-2 w-9 ring-4 ring-social-discord-dark focus:outline-none"
            :src="getImages.smallImage"
            draggable="false"
            alt="small image"
          />
        </div>

        <div
          class="flex-grow leading-none truncate w-3/4 md:w-4/5 text-gray-100"
        >
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
    getImages() {
      const largeImageKey = this.largeImage?.replace(/\s/g, "")
      const smallImageKey = this.smallImage?.replace(/\s/g, "")

      return {
        largeImage:
          largeImages[largeImageKey] || "https://i.imgur.com/FowB3D5.png",
        smallImage: smallImages[smallImageKey],
      }
    },
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
