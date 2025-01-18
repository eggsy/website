<script setup lang="ts">
interface Props {
  error?: boolean
}

withDefaults(defineProps<Props>(), {
  error: false,
})
</script>

<template>
  <!-- Loader -->
  <div v-if="error === false" class="w-full pt-28">
    <section class="space-y-8">
      <div class="space-y-4">
        <!-- Reading time & date  -->
        <div class="flex space-x-2 justify-left">
          <div
            class="bg-black/10 h-4 animate-pulse w-1/4 sm:w-1/6 dark:bg-white/5"
          />
          <div
            class="bg-black/10 h-4 animate-pulse w-1/4 sm:w-1/6 dark:bg-white/5"
          />
          <div
            class="bg-black/10 h-4 animate-pulse w-1/4 sm:w-1/6 dark:bg-white/5"
          />
        </div>

        <!-- Title -->
        <div
          class="bg-black/10 h-10 w-full animate-pulse sm:w-8/12 dark:bg-white/5"
        />

        <!-- Content -->
        <div class="flex flex-col space-y-2">
          <div
            class="bg-black/10 h-4 w-full animate-pulse sm:w-8/12 dark:bg-white/5"
          />
          <div
            class="bg-black/10 h-4 animate-pulse w-1/2 sm:w-4/12 dark:bg-white/5"
          />
        </div>
      </div>
    </section>

    <!-- Content -->
    <div class="space-y-10 mt-20 w-full">
      <div class="space-y-1">
        <div
          v-for="_ in 6"
          :key="_"
          class="bg-black/10 h-5 animate-pulse dark:bg-white/5"
          :class="_ !== 6 ? 'w-full' : 'w-8/12'"
        />
      </div>

      <div class="space-y-1">
        <div
          v-for="_ in 4"
          :key="_"
          class="bg-black/10 h-5 animate-pulse dark:bg-white/5"
          :class="_ !== 4 ? 'w-full' : 'w-1/2'"
        />
      </div>

      <div class="space-y-1">
        <div
          v-for="_ in 24"
          :key="_"
          class="bg-black/10 h-5 animate-pulse dark:bg-white/5"
          :class="_ !== 24 ? 'w-full' : 'w-1/2'"
        />
      </div>
    </div>
  </div>

  <div v-else class="space-y-6 pt-14">
    <h1 class="font-semibold text-2xl text-black/90 dark:text-white/90">
      Gönderi yüklenemedi.
    </h1>

    <p class="text-black/50 dark:text-white/30">
      Aradığınız gönderinin blogumda olduğuna, adreste bir yanlışlık olmadığına
      emin olun. Arama özelliğini kullanarak gönderiyi aratabilir, anasayfaya
      dönerek diğer gönderilerime ulaşabilirsiniz.
    </p>

    <Button icon="heroicons:chevron-left" @click.native="$router.back()"
      >Geri Dön</Button
    >
  </div>
</template>
