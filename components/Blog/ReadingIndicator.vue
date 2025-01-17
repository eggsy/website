<script setup lang="ts">
interface Props {
  selector: string
}

const props = withDefaults(defineProps<Props>(), {
  selector: null,
})

const el = ref<Element | null>(null)
const scrollY = ref(0)
const rect = reactive({
  top: 0,
  bottom: 0,
})
const windowDimensions = reactive({
  height: 0,
  width: 0,
})

/**
 * Calculates the position of the element and returns percentage value.
 */
const getPercentLeftBottom = computed((): number => {
  const { top, bottom } = rect
  const percent = Math.round(
    ((top - windowDimensions.height) / (top - bottom)) * 100,
  )
  return percent > 100 ? 100 : percent
})

/**
 * Checks if the position is higher than a specific number and returns a boolean value.
 */
const isElementVisible = computed((): boolean => {
  return scrollY.value > 175
})

const handleScroll = () => {
  // Set current scroll position
  scrollY.value = window.scrollY

  // Set window dimensions
  const { innerHeight, innerWidth } = window
  windowDimensions.height = innerHeight
  windowDimensions.width = innerWidth

  // Get element's position
  const { top, bottom } = el.value?.getBoundingClientRect() || {}

  // Save element's position to state
  if (!top || !bottom) return
  rect.top = top
  rect.bottom = bottom
}

onMounted(() => {
  // Find element in the document and set if exists
  const element = document.querySelector(props.selector)
  if (element) el.value = element
  else return

  // Set window dimensions
  const { innerHeight, innerWidth } = window
  windowDimensions.height = innerHeight
  windowDimensions.width = innerWidth

  // Add scroll event to update positions
  window.addEventListener("scroll", handleScroll)
})

onBeforeUnmount(() => {
  // Remove scroll event before changing the page
  window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
  <transition name="fade">
    <div
      v-show="isElementVisible"
      v-tippy="{
        content:
          getPercentLeftBottom === 100 ? 'Tüm yazı okundu!' : 'Okuma oranı',
      }"
    >
      <div
        class="rounded-md bg-gray-200 h-40 w-4 hidden relative md:block dark:bg-neutral-800"
      >
        <div
          class="rounded-md inset-x-0 transition bottom-0 absolute"
          :class="{
            'bg-green-500': getPercentLeftBottom === 100,
            'bg-gray-300 dark:bg-neutral-600': getPercentLeftBottom < 100,
          }"
          :style="{ height: `${getPercentLeftBottom}%` }"
        />
      </div>
    </div>
  </transition>
</template>
