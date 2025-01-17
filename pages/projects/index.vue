<script setup lang="ts">
const { $prepareMeta, $applyMediumZoom } = useNuxtApp()

interface Button {
  text: string
  link: string
  icon: string
}

interface Project {
  client?: string
  note?: string
  name: string
  description: string
  image?: string
  buttons?: Button[]
}

const title = "Projects"
const description = "Check out my projects and see what I can build for you!"

useHead({
  title,
  meta: $prepareMeta({
    title,
    description,
  }),
})

const projects = ref<Project[]>([
  {
    client: "Japan",
    name: "SWY35 Message Board",
    description:
      "A private social media platform for SWY35 participants. Built with Next.js, Firebase and Tailwind CSS.",
    image: "https://i.imgur.com/swrQwS1.png",
    buttons: [
      {
        text: "Video",
        link: "https://youtu.be/T8YuEpy3sxw",
        icon: "mdi:play",
      },
    ],
  },
  {
    client: "Muş Alparslan University",
    name: "MAUN Mobile",
    description: "Mobile application for Mus Alparslan University.",
    image: "https://i.imgur.com/4xRqunq.png",
    buttons: [
      {
        text: "App Store",
        link: "https://apps.apple.com/app/id6473739177",
        icon: "mdi:link",
      },
      {
        text: "Play Store",
        link: "https://play.google.com/store/apps/details?id=com.maun.mobile",
        icon: "mdi:link",
      },
    ],
  },
  {
    client: "Ankara Büyükşehir Belediyesi",
    name: "Plant App",
    description:
      "An app to display plant information that will be placed on a local museum of plants.",
    image: "https://i.imgur.com/PmmO69d.png",
  },
  {
    client: "Historia Mall",
    name: "Historia Floor Plan",
    description:
      "A floor plan kiosk app for Historia Shopping and Life Center in Fatih, Istanbul.",
    image: "https://i.imgur.com/gwxvO4o.jpg",
  },
  {
    client: "GDSC Solution Challenge 2023",
    name: "Recyling Platform",
    description:
      "A platform to help people recycle and be responsible consumers for the good of our environment.",
    image: "https://i.imgur.com/K0UmgZw.jpeg",
    buttons: [
      {
        text: "Visit",
        link: "https://recycling.is-important.net/",
        icon: "mdi:link",
      },
    ],
  },
  {
    note: "Acquired!",
    name: "Discord Server Templates",
    description:
      "A website to browse Discord server templates and create your own.",
    image: "https://i.imgur.com/m64yr7b.jpg",
    buttons: [
      {
        text: "Visit",
        link: "https://discords.com/templates",
        icon: "mdi:link",
      },
    ],
  },
  {
    name: "PreMiD",
    description:
      "A free, open-source, and community-driven rich presence system.",
    image: "https://i.imgur.com/1Yc1HB0.png",
    buttons: [
      {
        text: "Visit",
        link: "https://premid.app",
        icon: "mdi:link",
      },
      {
        text: "PreMiD Pages",
        link: "/projects/premid",
        icon: "mdi:link",
      },
      {
        text: "GitHub",
        link: "https://github.com/PreMiD/PreMiD",
        icon: "mdi:github",
      },
    ],
  },
  {
    name: "Discord Steam Verification",
    description:
      "A Discord bot to verify if a user owns a specific item on Steam and give them roles!",
    image: "https://i.imgur.com/D6SDCdC.png",
    buttons: [
      {
        text: "GitHub",
        link: "https://github.com/eggsy/discord-steam-verification",
        icon: "mdi:github",
      },
    ],
  },
  {
    name: "Unblock Please",
    description:
      "Free to use Chrome extension to unblock Imgur and Pastebin restrictions.",
    image: "https://i.imgur.com/w5wLpFS.jpg",
    buttons: [
      {
        text: "Add to Chrome",
        link: "https://chrome.google.com/webstore/detail/unblock-please/lpngbkmgnehdkkobdbieckjpphkohffd",
        icon: "heroicons:inbox-arrow-down",
      },
      {
        text: "GitHub",
        link: "https://github.com/eggsy/unblock-please",
        icon: "mdi:github",
      },
    ],
  },
  {
    name: "Lanyard Visualizer",
    description: "A web app to visualize your Discord status with Lanyard API.",
    image: "https://i.imgur.com/XMfWJlL.jpg",
    buttons: [
      {
        text: "Visit",
        link: "https://visualizer.eggsy.xyz",
        icon: "mdi:link",
      },
      {
        text: "GitHub",
        link: "https://github.com/eggsy/lanyard-visualizer",
        icon: "mdi:github",
      },
    ],
  },
  {
    name: "Lanyard Web",
    description:
      "A website concept for Lanyard API, a real-time Discord status widget.",
    image: "https://i.imgur.com/V8A5H8f.png",
    buttons: [
      {
        text: "Visit",
        link: "https://lanyard.eggsy.xyz",
        icon: "mdi:link",
      },
      {
        text: "GitHub",
        link: "https://github.com/eggsy/lanyard-web",
        icon: "mdi:github",
      },
    ],
  },
  {
    client: "Kuka Sahne",
    name: "Kuka Sahne Website",
    description: "A website for a local theatre company.",
    image: "https://i.imgur.com/uUb3Psk.jpeg",
    buttons: [
      {
        text: "Visit",
        link: "https://kukasahne.com",
        icon: "mdi:link",
      },
    ],
  },
  {
    name: "Family Feud Game",
    description:
      "An interactive browser game with real-time (v2) remote control to play within your community!",
    image: "https://i.imgur.com/1sQQPPH.png",
    buttons: [
      {
        text: "Visit",
        link: "https://associative-words.netlify.app/",
        icon: "mdi:link",
      },
      {
        text: "GitHub (v2)",
        link: "https://github.com/eggsy/find-associative-words/tree/socket",
        icon: "mdi:github",
      },
    ],
  },
  {
    name: "Movie App",
    description:
      "A movie website/app concept built with TMDb API, Next.js and Tailwind CSS.",
    image: "https://i.imgur.com/EQfaqte.jpg",
    buttons: [
      {
        text: "Visit",
        link: "https://movie-app-eggsy.netlify.app/",
        icon: "mdi:link",
      },
      {
        text: "GitHub",
        link: "https://github.com/eggsy/movie-app",
        icon: "mdi:github",
      },
    ],
  },
  {
    name: "Marmaris Palace Website",
    description: "A website concept for a 5-star hotel in Marmaris, Türkiye.",
    image: "https://i.imgur.com/BJ2luOh.jpg",
    buttons: [
      {
        text: "Visit",
        link: "https://marmaris-palace.netlify.app/",
        icon: "mdi:link",
      },
      {
        text: "GitHub",
        link: "https://github.com/eggsy/marmaris-palace-website",
        icon: "mdi:github",
      },
    ],
  },
  {
    note: "You are here!",
    name: "eggsy.xyz",
    description:
      "My personal website, built with Nuxt.js, Windi CSS and Firebase!",
    image: "https://i.imgur.com/J4bqPcs.png",
    buttons: [
      {
        text: "GitHub",
        link: "https://github.com/eggsy/website",
        icon: "mdi:github",
      },
    ],
  },
])

onMounted(() => {
  $applyMediumZoom()
})
</script>

<template>
  <PageLayout
    title="My Projects"
    description="Check out the projects I worked on!"
  >
    <section class="flex items-center flex-wrap gap-2">
      <span class="text-sm">Jump to:</span>
      <Button
        v-for="(project, index) in projects"
        :key="`skipto-button-${index}`"
        :href="`#${project.name.toLowerCase().split(' ').join('-')}`"
      >
        {{ project.name }}
      </Button>
    </section>

    <section
      v-for="(project, index) in projects"
      :key="`project-${index}`"
      :id="project.name.toLowerCase().split(' ').join('-')"
      class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      :class="index === 0 ? 'mt-24 mb-40' : 'my-40'"
    >
      <div class="space-y-4">
        <span
          v-if="project.client"
          class="bg-blue-600/10 block w-max text-sm rounded-lg px-4 text-blue-600 py-1.5 dark:bg-white/5 dark:text-white/30"
        >
          {{ project.client }}
        </span>

        <span
          v-if="project.note"
          class="bg-orange-600/10 block w-max text-sm rounded-lg px-4 text-orange-600 py-1.5 dark:bg-white/5 dark:text-white/30"
        >
          {{ project.note }}
        </span>

        <h2 class="text-4xl text-black/90 font-bold dark:text-white/90">
          {{ project.name }}
        </h2>

        <p>
          {{ project.description }}
        </p>

        <div v-if="project.buttons" class="flex flex-wrap gap-2">
          <Button
            v-for="(button, index) in project.buttons"
            :key="`button-${index}`"
            :href="button.link"
            :blank="!button.link.startsWith('/')"
          >
            <template #icon>
              <Icon v-if="button.icon" :name="button.icon" class="h-5 w-5" />
            </template>

            {{ button.text }}
          </Button>
        </div>
      </div>

      <SmartFigure
        v-if="project.image"
        :src="project.image"
        border
        :class="{ 'md:order-first': index % 2 === 0 }"
      />
    </section>
  </PageLayout>
</template>
