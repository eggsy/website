<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<template>
  <!-- Loader -->
  <div v-if="error === false" class="w-full pt-14">
    <section class="space-y-4">
      <!-- Title -->
      <div class="w-full h-10 bg-gray-200 dark:bg-gray-700 anime-pulse sm:w-8/12" />

      <!-- Content -->
      <div class="flex flex-col items-center justify-center space-y-2 sm:items-start">
        <div class="w-full h-4 bg-gray-200 dark:bg-gray-700 anime-pulse sm:w-8/12" />
        <div class="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 anime-pulse sm:w-4/12" />
      </div>

      <!-- Reading time & date  -->
      <div class="flex justify-center space-x-2 sm:justify-start">
        <div class="w-1/4 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse sm:w-1/6" />
        <div class="w-1/4 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse sm:w-1/6" />
      </div>
    </section>

    <!-- Content -->
    <div class="w-full mt-10 space-y-10">
      <div class="space-y-1">
        <div
          v-for="_ in 6"
          :key="_"
          class="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"
          :class="_ !== 6 ? 'w-full' : 'w-8/12'"
        />
      </div>

      <div class="space-y-1">
        <div
          v-for="_ in 4"
          :key="_"
          class="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"
          :class="_ !== 4 ? 'w-full' : 'w-1/2'"
        />
      </div>

      <div class="space-y-1">
        <div
          v-for="_ in 24"
          :key="_"
          class="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"
          :class="_ !== 24 ? 'w-full' : 'w-1/2'"
        />
      </div>
    </div>
  </div>

  <div v-else class="space-y-4 pt-14">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Gönderi yüklenemedi.</h1>
    <p class="text-gray-700 dark:text-gray-300">
      Aradığınız gönderinin blogumda olduğuna, adreste bir yanlışlık olmadığına
      emin olun. Arama özelliğini kullanarak gönderiyi aratabilir, anasayfaya
      dönerek diğer gönderilerime ulaşabilirsiniz.
    </p>
  </div>
</template>
