<script setup lang="ts">
const cards = [
  {
    title: "Blog",
    href: "/blog",
    icon: "line-md:file-document",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: "line-md:cog",
  },
  {
    title: "Donate",
    href: "/donate",
    icon: "line-md:heart-twotone-half-filled",
  },
  {
    title: "Repos",
    href: "/me/repos",
    icon: "line-md:github",
  },
  {
    title: "Songs",
    href: "/me/songs",
    icon: "line-md:volume-high-filled",
  },
  {
    title: "Contact",
    href: "/me/contact",
    icon: "line-md:at",
  },
]

useHead({
  title: "Home",
})
</script>

<template>
  <div
    class="min-h-[calc(100vh-11rem)] flex flex-col my-24 md:my-0 items-center justify-center container mx-auto"
  >
    <div class="flex items-center gap-8">
      <div
        class="hidden dark:block absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-5"
      >
        <SquaresBackground direction="diagonal" :speed="0.3" :sqaure-size="5" />
      </div>

      <div class="hidden md:flex flex-col gap-4 w-2/12 z-10">
        <Card
          v-for="(card, index) in cards.slice(0, 3)"
          :key="`card-ml-${index}`"
          :title="card.title"
          :href="card.href"
          class="w-28 flex items-center justify-center transform hover:scale-105 transition-all dark:!bg-[#1B1B1B] dark:hover:!bg-[#1D1D1D]"
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
              <Icon :name="card.icon" class="h-8 w-8" />
              {{ card.title }}
            </div>
          </template>
        </Card>
      </div>

      <header class="flex-1 z-10">
        <div class="space-y-8 z-10">
          <div class="space-y-4">
            <h1
              class="font-semibold text-center text-lg text-black/50 dark:text-white/50 md:text-xl"
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
              class="font-semibold text-center text-5xl text-black/90 dark:text-white/90 md:text-6xl"
            >
              freelance web developer
            </h1>
          </div>
        </div>

        <div
          class="mt-8 flex items-center justify-center gap-x-3 gap-y-2 flex-wrap"
        >
          <Icon
            v-for="item in [
              { name: 'TypeScript', icon: 'devicon:typescript' },
              { name: 'Vue.js', icon: 'devicon:vuejs' },
              { name: 'React.js', icon: 'devicon:react' },
              { name: 'HTML5', icon: 'devicon:html5' },
              { name: 'Tailwind CSS', icon: 'devicon:tailwindcss' },
              { name: 'Node.js', icon: 'devicon:nodejs' },
            ]"
            v-tippy="{ content: item.name, placement: 'bottom' }"
            :key="item.name"
            :name="item.icon"
            :class="{
              'h-[22px] w-[22px]': item.name === 'Node.js',
              'h-[25px] w-[25px]': ['HTML5', 'TypeScript'].includes(item.name),
              'h-7 w-7': !['TypeScript', 'Node.js', 'HTML5'].includes(
                item.name,
              ),
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
          class="w-28 flex items-center justify-center transform hover:scale-105 transition-all dark:!bg-[#1B1B1B] dark:hover:!bg-[#1D1D1D]"
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
              <Icon :name="card.icon" class="h-8 w-8" />
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
        class="w-full flex items-center justify-center dark:!bg-[#1B1B1B] dark:hover:!bg-[#1D1D1D]"
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
