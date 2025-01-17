<script setup lang="ts">
interface Props {
  name: string
  language?: string | null
  stars: string | number
  top?: boolean
  license?: string | null
  description?: string
}

withDefaults(defineProps<Props>(), {
  language: null,
  top: false,
  license: null,
})

const icons = {
  Vue: "devicon:vuejs",
  TypeScript: "devicon:typescript",
  JavaScript: "devicon:javascript",
  HTML: "devicon:html5",
}
</script>

<template>
  <div class="rounded-lg card-base">
    <div class="space-y-2">
      <div :class="top && 'flex justify-between space-x-2'">
        <h3
          class="text-black/90 dark:text-white/90 items-center truncate space-x-1"
        >
          <span class="text-black/50 dark:text-white/30">eggsy/</span
          ><span>{{ name }}</span>
        </h3>

        <Icon
          v-if="top === true"
          class="h-6 text-yellow-600 w-6"
          title="Top repository"
          name="heroicons:star-solid"
        />
      </div>

      <p class="text-black/50 dark:text-white/30 line-clamp-2">
        {{ description }}
      </p>
    </div>

    <div class="mt-4">
      <div
        class="flex items-center justify-between text-black/50 dark:text-white/30"
      >
        <span>Stars:</span>
        <span>{{ stars }}</span>
      </div>

      <div
        v-if="language"
        class="flex items-center justify-between text-black/50 dark:text-white/30"
      >
        <span>Language:</span>
        <Icon :name="icons[language as keyof typeof icons]" class="h-5 w-5" />
      </div>

      <div
        v-if="license"
        class="flex items-center justify-between text-black/50 dark:text-white/30"
      >
        <span>License:</span>
        <span>{{ license }}</span>
      </div>
    </div>
  </div>
</template>
