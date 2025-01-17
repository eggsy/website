<script setup lang="ts">
const position = ref(0)

/**
 * Checks if the position is higher than a specific number and returns a boolean value.
 * @returns {boolean} Higher than the given number.
 */
const isActive = computed((): boolean => {
  return position.value > 100
})

/**
 * Updates the Vue data when it's called.
 */
const updatePosition = () => {
  position.value = window.scrollY
}

/**
 * Scrolls window to top.
 */
const goTop = () => {
  window.scrollTo(0, 0)
}

onMounted(() => {
  window.addEventListener("scroll", updatePosition)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updatePosition)
})
</script>

<template>
  <Transition name="fade">
    <div
      v-show="isActive"
      class="right-6 bottom-4 z-50 fixed items-center md:flex md:space-x-2"
    >
      <Button
        backdrop
        rounded
        elevated
        icon="heroicons:chevron-up"
        @click="goTop"
      />
      <ColorSwitcher class="hidden md:flex" />
    </div>
  </Transition>
</template>
