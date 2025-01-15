<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      animation: false,
      cards: [
        {
          title: "Blog",
          href: "/blog",
          icon: "IconDocument",
        },
        {
          title: "Projects",
          href: "/projects",
          icon: "IconCog",
        },
        {
          title: "Donate",
          href: "/donate",
          icon: "IconDollar",
        },
        {
          title: "Repos",
          href: "/me/repos",
          brand: "GitHub",
          iconPack: "IconBrand",
        },
        {
          title: "Songs",
          href: "/me/songs",
          icon: "IconMusicNote",
        },
        {
          title: "Contact",
          href: "/me/contact",
          icon: "IconAt",
        },
      ],
    }
  },
  head: {
    title: "Home",
  },
  mounted() {
    this.animation = true
  },
})
</script>

<template>
  <div
    class="min-h-[calc(100vh-11rem)] flex flex-col my-24 md:my-0 items-center justify-center container mx-auto px-4"
  >
    <div class="flex items-center gap-8">
      <div
        class="hidden dark:block absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-3"
      >
        <SquaresBackground direction="diagonal" :speed="0.3" :sqaure-size="5" />
      </div>

      <div class="hidden md:flex flex-col gap-4 w-2/12 z-10">
        <Card
          v-for="(card, index) in cards.slice(0, 3)"
          :key="`card-ml-${index}`"
          :title="card.title"
          :href="card.href"
          class="w-28 flex items-center justify-center transform hover:scale-105 transition-all !dark:bg-[#1B1B1B] !dark:hover:bg-[#1D1D1D]"
          :class="{
            'ml-auto': index % 2 === 0,
            'rotate-2': index === 0,
            '-rotate-3': index === 2,
          }"
          :style="{
            aspectRatio: '1/1',
          }"
        >
          <template #title>
            <div class="flex flex-col gap-2 items-center">
              <component v-if="card.icon" :is="card.icon" class="h-8 w-8" />

              <component
                v-else-if="card.iconPack"
                :is="card.iconPack"
                v-bind="card"
                class="h-8 w-8"
              />

              {{ card.title }}
            </div>
          </template>
        </Card>
      </div>

      <header class="flex-1 z-10">
        <div class="space-y-8 z-10">
          <div class="space-y-4">
            <h1
              class="font-semibold text-center text-lg md:(text-xl) text-black/50 dark:text-white/50"
            >
              Hi, I am
              <span
                class="text-black/60 select-none dark:text-white/60 transition-colors bg-zinc-200 dark:bg-zinc-800 rounded-full align-middle py-2.5 pl-3 pr-4 gap-1 inline-flex items-center w-max font-medium"
              >
                <SmartImage
                  src="/assets/images/memoji.png"
                  class="object-cover h-7 w-7"
                />
                Baki</span
              >
              a
            </h1>

            <h1
              class="font-semibold text-center text-5xl md:(text-6xl) text-black/90 dark:text-white/90"
            >
              freelance web developer
            </h1>
          </div>
        </div>

        <div
          class="mt-8 flex items-center justify-center gap-x-3 gap-y-2 flex-wrap"
        >
          <IconDev
            v-for="item in [
              'TypeScript',
              'Vue.js',
              'React.js',
              'HTML5',
              'Tailwind CSS',
              'Node.js',
            ]"
            v-tippy="{ content: item, placement: 'bottom' }"
            :key="item"
            :brand="item"
            :class="{
              'h-6.5 w-6.5': item === 'TypeScript',
              'h-7 w-7': item === 'HTML5',
              'h-8 w-8': true,
            }"
          />
        </div>
      </header>

      <div class="hidden md:flex flex-col gap-4 w-2/12 z-10">
        <Card
          v-for="(card, index) in cards.slice(3, 6)"
          :key="`card-mr-${index}`"
          :title="card.title"
          :href="card.href"
          class="w-28 flex items-center justify-center transform hover:scale-105 transition-all !dark:bg-[#1B1B1B] !dark:hover:bg-[#1D1D1D]"
          :class="{
            'ml-auto': index % 2 !== 0,
            '-rotate-2': index === 0,
            'rotate-3': index === 2,
          }"
          :style="{
            aspectRatio: '1/1',
          }"
        >
          <template #title>
            <div class="flex flex-col gap-2 items-center">
              <component v-if="card.icon" :is="card.icon" class="h-8 w-8" />

              <component
                v-else-if="card.iconPack"
                :is="card.iconPack"
                v-bind="card"
                class="h-8 w-8"
              />

              {{ card.title }}
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div class="grid md:hidden grid-cols-2 gap-4 w-full mt-24 z-10">
      <Card
        v-for="(card, index) in cards"
        :key="`card-m-${index}`"
        :title="card.title"
        :href="card.href"
        class="w-full flex items-center justify-center !dark:bg-[#1B1B1B] !dark:hover:bg-[#1D1D1D]"
      >
        <template #title>
          <div class="flex flex-col gap-2 items-center">
            <component v-if="card.icon" :is="card.icon" class="h-8 w-8" />

            <component
              v-else-if="card.iconPack"
              :is="card.iconPack"
              v-bind="card"
              class="h-8 w-8"
            />

            {{ card.title }}
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
