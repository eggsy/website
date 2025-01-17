<script setup lang="ts">
// Types
interface Props {
  toc: { id: string; text: string }[]
}

withDefaults(defineProps<Props>(), {
  toc: () => [],
})

const tocToggled = ref(false)
</script>

<template>
  <div
    v-if="toc && toc.length > 0"
    class="rounded-md flex flex-col space-y-2 mb-6"
  >
    <div
      class="cursor-pointer flex font-medium space-x-1 transition-colors text-gray-500 items-center dark:text-dark-100 hover:text-gray-700 dark:hover:text-white/40 select-none"
      @click="tocToggled = !tocToggled"
    >
      <h1 class="uppercase">Başlıklar</h1>
      <transition name="fade" mode="out-in">
        <Icon
          v-if="!tocToggled"
          name="heroicons:chevron-right"
          key="'tocToggled'"
          class="h-4 w-4"
        />

        <Icon
          v-else
          name="heroicons:chevron-down"
          key="'tocToggledFalse'"
          class="h-4 w-4"
        />
      </transition>
    </div>

    <ul
      v-show="tocToggled === true"
      class="flex flex-wrap gap-x-4 gap-y-2 items-center"
    >
      <li
        v-for="link of toc || []"
        :key="link.id"
        class="border-gray-300 transition-colors text-dark-400 dark:border-dark-200 dark:text-white/30 hover:text-dark-700 dark:hover:text-white/60"
      >
        <a v-if="link.id" :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>
