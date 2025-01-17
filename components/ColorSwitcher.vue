<script setup lang="ts">
const colorMode = useColorMode()

/**
 * Returns the selected color mode value.
 * @returns {string} The color mode as "light" or "dark".
 */
const getSelectedTheme = computed((): string => colorMode.value)

/**
 * Updates the color mode value.
 */
const switchTheme = () => {
  colorMode.preference = getSelectedTheme.value === "dark" ? "light" : "dark"
}
</script>

<template>
  <Button
    rounded
    elevated
    backdrop
    :icon="getSelectedTheme === 'light' ? 'heroicons:sun' : 'heroicons:moon'"
    @click="switchTheme"
  />
</template>
