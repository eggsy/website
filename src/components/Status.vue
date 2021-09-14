<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type {
  LanyardData,
  Activity,
} from "@eggsydev/vue-lanyard/@types/lanyard"

export default Vue.extend({
  data() {
    return {
      finished: false,
      lanyard: {} as LanyardData,
      socket: null as WebSocket | null,
    }
  },
  computed: {
    /**
     * Returns status detail as string.
     * @returns {string}
     */
    getStatusDetails(): string {
      const lanyard = this.lanyard
      if (!lanyard) return "Couldn't fetch data from Lanyard"

      const filtered: Activity | null =
        lanyard.activities?.filter((activity) => activity.type !== 4)?.pop() ||
        null

      // Offline
      if (this.lanyard?.discord_status === "offline") return "Offline"
      else if (!filtered) return "Online"
      // Visual Studio Code
      else if (filtered.name === "Visual Studio Code") {
        const replaced =
          filtered.state?.replace("📁 ", "")?.split(" | ")?.[0] || "a file"
        return `Editing ${replaced} in Visual Studio Code`
      }
      // YouTube Music
      else if (
        filtered.name === "YouTube Music" &&
        filtered.details &&
        filtered.state
      ) {
        const song = filtered.details || "something"
        return `Listening to ${song} on YouTube Music`
      }
      // YouTube
      else if (
        filtered.name === "YouTube" &&
        filtered.details &&
        filtered.state
      ) {
        const name = filtered.details || "a video"
        return `Watching ${name} on YouTube`
      }
      // Default values
      else
        switch (filtered.name) {
          case "Google Meet":
            return "In a Google Meet meeting"
          case "Twitch":
            return "Watching a stream on Twitch"
          case "Prime Video":
            return "Watching something on Prime Video"
          default:
            return "Online"
        }
    },
    /**
     * Returns Discord status colors.
     * @returns {string} Tailwind color classes
     */
    getDiscordStatus(): string {
      switch (this.lanyard.discord_status) {
        case "online":
          return "bg-green-500"
        case "idle":
          return "bg-yellow-500"
        case "dnd":
          return "bg-red-500"
        default:
          return "bg-gray-500 dark:bg-gray-200"
      }
    },
  },
  beforeDestroy() {
    this.socket?.close()
  },
  async mounted() {
    // Connect to Lanyard Socket API, send heartbeat every 30 seconds and replace the Vue data value with the message using @eggsydev/vue-lanyard module
    this.socket = (await this.$lanyard({
      userId: "162969778699501569",
      socket: true,
    })) as WebSocket

    this.socket?.addEventListener("message", ({ data }) => {
      const { t: type, d: status } = JSON.parse(data) as {
        t: "INIT_STATE" | "PRESENCE_UPDATE"
        d: LanyardData
      }

      if (type === "INIT_STATE" || type === "PRESENCE_UPDATE")
        this.lanyard = status || {}

      this.finished = true
    })
  },
})
</script>

<template>
  <SkeletonLoader
    v-if="
      finished === false ||
      !getStatusDetails ||
      Object.keys(lanyard).length === 0
    "
    class="h-[17.5px] w-6/12"
  />

  <div
    v-else
    class="
      rounded-md
      flex
      space-x-2
      text-gray-700
      items-center
      dark:text-gray-300
    "
  >
    <div :class="`h-3 w-3 rounded-full flex-shrink-0 ${getDiscordStatus}`" />
    <div class="text-sm leading-tight truncate" :title="getStatusDetails">
      {{ getStatusDetails }}
    </div>
  </div>
</template>
