<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { Repository } from "../types/Response/GitHub"

interface Project {
  title: string
  description: string
  href?: string
  to?: string
  image?: string
}

interface Experience {
  title: string
  url: string
  position: string
  date: string
}

interface ExperienceObject {
  jobs: Experience[]
  education: Experience[]
}

export default Vue.extend({
  data() {
    return {
      showModal: false,
      repos: [] as Repository[],
      projects: [
        {
          title: "PreMiD",
          description:
            "Simple, configurable utility that allows you to show what you're doing on the web in your Discord now playing status.",
          image: "https://i.imgur.com/FjH28LQ.png",
          to: "/projects/premid",
        },
        {
          title: "This Website",
          description:
            "My personal website, blog, goals, daily songs and much more!",
          image: "https://i.imgur.com/OcOBblH.png",
          to: "/",
        },
        {
          title: "Unblock Please",
          description:
            "Unblock Imgur and Pastebin access using secure proxies!",
          image: "https://i.imgur.com/1LI4TKG.png",
          to: "/projects/unblock-please",
        },
        {
          title: "is-inside.me",
          description:
            "Free image and file uploading service for uploaders like ShareX!",
          image: "https://i.imgur.com/1QBTTFx.png",
          to: "/projects/is-inside-me",
        },
      ] as Project[],
      experiences: {
        jobs: [
          {
            title: "Discord Templates",
            url: "https://discords.com/templates",
            position: "Web Developer & Co-Founder",
            date: "2020-2021",
          },
          {
            title: "IZM Game Studios",
            url: "https://izmgamestudios.com",
            position: "Solution Partner",
            date: "2020-2021",
          },
          {
            title: "TruckersMP",
            url: "https://truckersmp.com/user/1648033",
            position: "Community Moderator & Translator",
            date: "2020-2021",
          },
          {
            title: "WA Web+ Extension",
            url: "https://wawplus.com",
            position: "Translator",
            date: "2020-2021",
          },
          {
            title: "Batakköylü Düğün Salonu",
            url: "https://batakkoylu.netlify.app",
            position: "Web Developer",
            date: "2020-2020",
          },
          {
            title: "EGGSY's Discord Bot",
            url: "https://top.gg/bot/eggsy",
            position: "Creator, Developer and Maintainer",
            date: "2017-2019",
          },
          {
            title: "Discord Bot List",
            url: "https://top.gg/user/162969778699501569",
            position: "Website Moderator",
            date: "2017-2018",
          },
        ],
        education: [
          {
            title: "Goce Delchev University",
            url: "https://www.ugd.edu.mk/",
            position: "Erasmus+ Student",
            date: "2021-",
          },
          {
            title: "Muş Alparslan University",
            url: "http://alparslan.edu.tr/",
            position: "English Language Teaching",
            date: "2020-",
          },
          {
            title: "Rotosis Robotics",
            url: "https://www.rotosis.com/",
            position: "Intern",
            date: "2017-2018",
          },
          {
            title: "Adil Karaağaç MTAL",
            url: "https://akatl.meb.k12.tr/",
            position: "Automation Systems",
            date: "2014-2018",
          },
        ],
      } as ExperienceObject,
      cards: [
        {
          title: "Repositories",
          description: "Want to see my code? Check out my GitHub!",
          href: "/me/repos",
        },
        {
          title: "Goals",
          description:
            "Want to know what I'm working on now and in the future?",
          href: "/me/goals",
        },
        {
          title: "Contact",
          description: "Want to get in touch? Send me a message!",
          href: "/me/contact",
        },
        {
          title: "Blog",
          description: "Want to read my Turkish stories?",
          href: "/blog",
        },
        {
          title: "Daily Songs",
          description: "Want to listen to my daily songs?",
          href: "/daily",
        },
        {
          title: "Donate",
          description: "Want to support me and my work?",
          href: "/donate",
        },
      ],
      skills: [
        "JavaScript",
        "HTML5",
        "Nuxt.js",
        "Vue.js",
        "Tailwind CSS",
        "Windi CSS",
        "Node.js",
        "TypeScript",
        "Sass",
        "Figma",
        "Firebase",
        "WordPress",
        "PHP",
        "React.js",
      ],
    }
  },
  head: {
    title: "Home",
  },
})
</script>

<template>
  <div class="space-y-14 mb-10">
    <header
      class="rounded-md flex flex-col-reverse bg-gray-200/30 my-16 py-10 px-8 justify-between md:flex-row md:items-center dark:bg-neutral-800/40"
    >
      <div class="md:w-8/12">
        <div class="space-y-2">
          <div
            class="font-semibold text-xl text-gray-900 md:text-3xl dark:text-neutral-200"
          >
            <h1>Self taught</h1>
            <h1><span class="text-blue-600">Full-stack</span> web developer</h1>
          </div>

          <p class="text-gray-800 dark:text-gray-200">
            Hi there, my name is Abdulbaki, I am from Turkey and I am a self
            taught web developer. I build complex web apps using
            <SmartLink href="https://vuejs.org/" class="description-link" blank
              >Vue.js</SmartLink
            >,
            <SmartLink href="https://nuxtjs.org/" class="description-link" blank
              >Nuxt.js</SmartLink
            >
            {{ "" }} and
            <SmartLink
              href="https://windicss.org/"
              class="description-link"
              blank
              >Windi CSS</SmartLink
            >.
          </p>
        </div>

        <Status class="mt-4" />
      </div>

      <div class="rounded-full h-40 mb-4 w-40 md:mb-0">
        <SmartImage
          src="/assets/images/memoji.png"
          class="rounded-full h-40 w-40"
        />
      </div>
    </header>

    <section id="cards" class="my-16 grid gap-4 md:grid-cols-3">
      <Card
        v-for="(card, index) in cards"
        :key="`card-${index}`"
        :title="card.title"
        :href="card.href"
      >
        {{ card.description }}
      </Card>
    </section>

    <section id="projects">
      <h2
        class="font-bold text-xl text-gray-400 uppercase dark:text-neutral-700"
      >
        Projects I currently work on
      </h2>

      <div class="mt-4 grid gap-2 md:(gap-4 grid-cols-2) ">
        <Card
          v-for="(project, index) in projects"
          :key="`project-${index}`"
          :href="project.to || project.href"
          :title="project.title"
          :description="project.description"
          :blank="!!project.href"
          class="h-full"
        >
          {{ project.description }}

          <template #icon v-if="project.image">
            <SmartImage :src="project.image" class="rounded-full h-16 w-16" />
          </template>
        </Card>
      </div>
    </section>

    <section
      id="experiences"
      class="mt-4 grid gap-6 sm:mt-6 md:(md:mt-10 gap-8 grid-cols-2) "
    >
      <div>
        <h3
          class="font-bold text-xl text-gray-400 uppercase dark:text-neutral-700"
        >
          Experience
        </h3>

        <div class="mt-4 grid gap-2">
          <CardExperience
            v-for="(experience, index) in experiences.jobs"
            :key="`experience-job-${index}`"
            :title="experience.title"
            :url="experience.url"
            :date="experience.date"
            :position="experience.position"
          />
        </div>
      </div>

      <div>
        <h3
          class="font-bold text-xl text-gray-400 uppercase dark:text-neutral-700"
        >
          Education
        </h3>

        <div class="mt-4 grid gap-2">
          <CardExperience
            v-for="(experience, index) in experiences.education"
            :key="`experience-education-${index}`"
            :title="experience.title"
            :url="experience.url"
            :date="experience.date"
            :position="experience.position"
          />
        </div>
      </div>
    </section>

    <section id="technologies" class="mt-6">
      <h3
        class="font-bold text-xl text-gray-400 uppercase dark:text-neutral-700"
      >
        Technologies I use
      </h3>

      <div class="mt-4 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <CardSkill
          v-for="(skill, index) in skills"
          :key="`skill-${index}`"
          :title="skill"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.description-link {
  @apply border-gray-500 border-b-2 border-opacity-50 hover:border-opacity-75;
}
</style>
