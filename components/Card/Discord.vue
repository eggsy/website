<script setup lang="ts">
import moment from "moment"

/* Import image files */
import largeImages from "~/assets/files/premid/largeImages"
import smallImages from "~/assets/files/premid/smallImages"

/* Interfaces */
interface ImageCategory {
  name: string
  url: string
}

interface Props {
  title?: string
  largeImage?: string
  smallImage?: string | null
  smallImageText?: string | null
  details?: string
  buttons?: { label: string; url: string }[]
  state?: string
  customImageUrl?: {
    small: string | null | boolean
    large: string | null | boolean
  }
  timestamp?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  title: "Custom Status",
  largeImage: "PreMiD",
  smallImage: null,
  smallImageText: null,
  details: "",
  buttons: () => [],
  state: "",
  customImageUrl: () => ({ small: "", large: "" }),
  timestamp: () => ({}),
})

const componentReady = ref(false)

const timers = ref({
  elapsed: {
    instance: null as NodeJS.Timeout | null,
    string: "",
  },
  end: {
    instance: null as NodeJS.Timeout | null,
    string: "",
  },
})

/**
 * Returns large and small image by replacing the spaces in their name.
 */
const getImages = computed(() => {
  const { largeImage, smallImage } = props

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
    largeImage: props.customImageUrl.large
      ? largeImage
      : largeAll.find((item) => item.name === largeImage)?.url ||
        "https://i.imgur.com/CuVtvKW.png",
    smallImage: props.customImageUrl.small
      ? smallImage
      : smallAll.find((item) => item.name === smallImage)?.url || null,
  }
})

/**
 * Returns text related parts for the UI.
 */
const getText = computed(() => {
  const { smallImage, smallImageText, details, state } = props

  let small: string | undefined

  if (smallImage && smallImageText) small = smallImageText
  else if (smallImage && !smallImageText) small = "[EMPTY]"

  return {
    details,
    state,
    small,
  }
})

watchEffect(() => {
  if (props.timestamp?.start && props.timestamp?.start.value) {
    startElapsedTimer()
  } else if (props.timestamp?.end.enabled && props.timestamp?.end.value) {
    startLeftTimer()
  } else {
    stopTimers()
  }
})

/**
 * Returns whether timers are enabled
 */
const isTimerEnabled = computed(() => {
  const start = props?.timestamp?.start
  const end = props?.timestamp?.end

  return !!(start?.enabled && start?.value) || !!(end?.enabled && end?.value)
})

/**
 * Returns the string for enabled timer.
 */
const getTime = computed(() => {
  if (isTimerEnabled.value === false) return null
  else if (timers.value.elapsed?.instance) return timers.value.elapsed.string
  else if (timers.value.end?.instance) return timers.value.end.string
  else return null
})

onMounted(() => {
  componentReady.value = true
})

onBeforeUnmount(() => {
  stopTimers()
})

/**
 * Stops both of the timers.value.
 */
function stopTimers() {
  const { elapsed, end } = timers.value

  if (typeof elapsed === "boolean" && typeof end === "boolean") return

  /* Clear elapsed timer */
  clearInterval(elapsed.instance as NodeJS.Timeout)
  elapsed.instance = null
  elapsed.string = ""

  /* Clear end timer */
  clearInterval(end.instance as NodeJS.Timeout)
  end.instance = null
  end.string = ""
}

/**
 * Calculates the time difference between now and selected time and starts the elapsed timer.
 */
function startElapsedTimer() {
  const target = props?.timestamp?.start?.value
  const timer = timers?.value.elapsed

  if (!target || !timer) return
  stopTimers()

  timer.string = "00:00 elapsed"
  timer.instance = setInterval(() => {
    let timeArray = [
      String(moment().diff(target, "hours")),
      String(moment().diff(target, "minutes") % 60),
      String(moment().diff(target, "seconds") % 60),
    ]

    if (timeArray[0] === "0") timeArray = timeArray.slice(1)
    timeArray = timeArray.map((time) => (time.length === 1 ? `0${time}` : time))

    timer.string = `${timeArray.join(":")} elapsed`
  }, 1000)
}

/**
 * Calculates the time difference between now and selected time and starts the elapsed timer.
 */
function startLeftTimer() {
  const target = props?.timestamp?.end?.value
  const timer = timers?.value.end

  if (!target || !timer) return
  stopTimers()

  timer.string = "--:-- left"
  timer.instance = setInterval(() => {
    const toTime = moment(target, "HH:mm").unix()
    const fromTime = moment().unix()
    const duration = moment.duration(toTime - fromTime, "seconds")

    if (duration.asSeconds() < 0) return (timer.string = "00:00 left")

    let timeArray = [
      String(duration.hours()),
      String(duration.minutes()),
      String(duration.seconds()),
    ]

    if (timeArray[0] === "0") timeArray = timeArray.slice(1)
    timeArray = timeArray.map((time) => (time.length === 1 ? `0${time}` : time))

    timer.string = `${timeArray.join(":")} left`
  }, 1000)
}
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
        class="flex flex-col space-y-3 items-center justify-between overflow-x-hidden md:space-y-0 md:space-x-3 md:flex-row"
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
              class="rounded-full bg-[#6c82cf] h-9 -right-2 -bottom-2 ring-4 ring-[#6c82cf] w-9 overflow-y-hidden absolute box-border dark:bg-transparent dark:ring-transparent focus:outline-none"
            />
          </div>

          <div class="text-gray-100 overflow-x-hidden">
            <h1 class="font-medium text-xl text-white block">{{ title }}</h1>

            <div class="leading-tight space-y-1">
              <span class="block truncate">{{ getText.details }}</span>
              <span class="block truncate">{{ getText.state }}</span>

              <span v-if="isTimerEnabled === true" class="block">{{
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
              class="border rounded-sm cursor-pointer border-white/40 text-sm py-2 px-4 transition-colors text-gray-300 truncate select-none md:px-3 md:py-1 hover:text-white hover:border-white focus:bg-opacity-10 focus:bg-white"
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
