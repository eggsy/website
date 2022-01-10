<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { Repository } from "../types/Response/GitHub"

interface Project {
  title: string
  description: string
  href?: string
  to?: string
  icon?: string
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
          to: "/projects/premid",
          description:
            "Simple, configurable utility that allows you to show what you're doing on the web in your Discord now playing status.",
          icon: "PreMiD",
        },
        {
          title: "This Website",
          to: "/",
          description:
            "My personal website, blog, goals, daily songs and much more!",
          icon: "website",
        },
        {
          title: "Unblock Please",
          to: "/projects/unblock-please",
          description:
            "Unblock Imgur and Pastebin access using secure proxies!",
          icon: "UnblockPlease",
        },
        {
          title: "is-inside.me",
          to: "/projects/is-inside-me",
          description:
            "Free image and file uploading service for uploaders like ShareX!",
          icon: "IsInsideMe",
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
      cards: {
        me: [
          {
            title: "Repositories",
            description:
              "Want to see my code and public repositories? Check out this page!",
            href: "/me/repos",
          },
          {
            title: "Goals",
            description:
              "Want to know what I'm working on now and in the future?",
            href: "/me/goals",
          },
          {
            title: "Songs",
            description:
              "Trust your taste? See my favourite songs and recently played ones!",
            href: "/me/songs",
          },
          {
            title: "Contact",
            description:
              "Need help with anything? Want to get in touch? Send me a message!",
            href: "/me/contact",
          },
        ],
        pages: [
          {
            title: "Blog",
            description:
              "What is better than a Turkish blog? Are you here to read them?",
            href: "/blog",
          },
          {
            title: "Daily Songs",
            description:
              "Trust me. I only put quality songs. Want to check them out?",
            href: "/daily",
          },
          {
            title: "Donate",
            description: "Money. You have? Want to share? Here. Share with me.",
            href: "/donate",
          },
        ],
      },
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
      class="rounded-md flex flex-col-reverse my-16 mx-4 py-10 justify-between md:flex-row md:items-center"
    >
      <div class="md:w-8/12">
        <div class="space-y-2">
          <div
            class="font-semibold text-xl text-neutral-700 md:text-3xl dark:text-neutral-200"
          >
            <h1>Self taught</h1>
            <h1>
              <SmartLink
                href="https://www.w3schools.com/whatis/whatis_fullstack.asp"
                class="cursor-help border-b-2 border-blue-700 text-blue-700 dark:border-neutral-500 dark:text-neutral-500"
                blank
                >Full-stack</SmartLink
              >
              web developer
            </h1>
          </div>

          <p class="text-neutral-500">
            Hi there, my name is Abdulbaki, I am from Turkey and I am a self
            taught web developer. I build complex web apps using tools like
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

      <div class="rounded-full mb-4 md:mb-0">
        <SmartImage
          src="/assets/images/memoji.png"
          class="rounded-full h-30 w-30 md:h-40 md:w-40"
        />
      </div>
    </header>

    <section id="me" class="my-16">
      <Title>Me</Title>

      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <Card
          v-for="(card, index) in cards.me"
          :key="`card-m-${index}`"
          :title="card.title"
          :href="card.href"
        >
          {{ card.description }}
        </Card>
      </div>
    </section>

    <section id="pages" class="my-16">
      <Title>Pages</Title>

      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <Card
          v-for="(card, index) in cards.pages"
          :key="`card-p-${index}`"
          :title="card.title"
          :href="card.href"
        >
          {{ card.description }}
        </Card>
      </div>
    </section>

    <section id="projects">
      <Title>Projects I currently work on</Title>

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

          <template #icon v-if="project.icon">
            <IconDev
              :brand="project.icon"
              class="rounded-full bg-gray-100 h-14 p-2 text-neutral-500 w-14 dark:(bg-neutral-800 text-white) "
            />
          </template>
        </Card>
      </div>
    </section>

    <section
      id="experiences"
      class="mt-4 grid gap-6 sm:mt-6 md:(md:mt-10 gap-8 grid-cols-2) "
    >
      <div>
        <Title>Experience</Title>

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
        <Title>Education</Title>

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
      <Title>Technologies I use</Title>

      <div class="mt-4 grid gap-2 sm:grid-cols-3 md:grid-cols-4">
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
  @apply border-neutral-500 border-b-2 border-opacity-50 hover:border-opacity-75;
}
</style>
