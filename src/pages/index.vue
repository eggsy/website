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
            "PreMiD is a simple, configurable utility that allows you to show what you're doing on the web in your Discord now playing status.",
          image: "https://i.vgy.me/rhHgcJ.jpg",
          to: "/projects/premid",
        },
        {
          title: "This Website",
          description:
            "The website where you can learn more and more about me!",
          image: "https://i.vgy.me/sAQScm.jpg",
          to: "/",
        },
        {
          title: "Unblock Please",
          description:
            "Unblock Imgur and Pastebin access using secure proxies!",
          to: "/projects/unblock-please",
        },
        {
          title: "is-inside.me",
          description:
            "Free image and file uploading service for uploaders like ShareX!",
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
  fetchOnServer: false,
  async fetch() {
    const filter = [
      "eggsy",
      "DBM",
      "eggsywashere.github.io",
      "bu-saatte-cekilir-mi",
    ]

    const repos: Repository[] = (
      await this.$axios.get(
        "https://api.github.com/users/eggsy/repos?per_page=100"
      )
    ).data

    this.repos = repos
      ?.filter((repo) => repo.fork === false && !filter.includes(repo.name))
      ?.sort((a, b) => b?.stargazers_count - a?.stargazers_count)
  },
  head: {
    title: "Home",
  },
})
</script>

<template>
  <div>
    <header
      class="rounded-md flex flex-col-reverse bg-gray-200/30 my-16 py-10 px-8 justify-between md:flex-row md:items-center dark:bg-gray-800"
    >
      <div class="md:w-8/12">
        <div class="space-y-2">
          <div class="font-semibold text-xl text-gray-900 md:text-3xl dark:text-gray-100">
            <h1>Self taught</h1>
            <h1>
              <span class="text-blue-600">Full-stack</span> web developer
            </h1>
          </div>

          <p class="text-gray-800 dark:text-gray-200">
            Hi there, my name is Abdulbaki, I am from Turkey and I am a self
            taught web developer. I build complex web apps using
            <SmartLink href="https://vuejs.org/" class="description-link" blank>Vue.js</SmartLink>,
            <SmartLink href="https://nuxtjs.org/" class="description-link" blank>Nuxt.js</SmartLink>
            {{ "" }} and
            <SmartLink href="https://windicss.org/" class="description-link" blank>Windi CSS</SmartLink>.
          </p>
        </div>

        <Status class="mt-4" />
      </div>

      <div class="rounded-full h-40 mb-4 w-40 md:mb-0">
        <SmartImage src="/assets/images/memoji.png" class="rounded-full h-40 w-40" />
      </div>
    </header>

    <section id="projects">
      <h2
        class="font-semibold mt-10 text-2xl text-gray-900 dark:text-gray-100"
      >Projects I currently work on</h2>

      <div class="mt-2 grid gap-2 md:(gap-4 grid-cols-2) ">
        <div v-for="(project, index) in projects" :key="`project-${index}`">
          <SmartLink
            v-if="project.to || project.href"
            :href="project.to || project.href"
            title="Click to visit this project"
            :blank="!!project.href"
          >
            <CardProject
              :title="project.title"
              :description="project.description"
              :image="project.image"
              class="h-full"
            />
          </SmartLink>

          <CardProject
            v-else
            :title="project.title"
            :description="project.description"
            :image="project.image"
            class="h-full"
          />
        </div>
      </div>
    </section>

    <section id="experiences" class="mt-4 grid gap-6 sm:mt-6 md:(md:mt-10 gap-8 grid-cols-2) ">
      <div>
        <h3 class="font-semibold text-xl text-gray-900 dark:text-gray-100">Experience</h3>

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
        <h3 class="font-semibold text-xl text-gray-900 dark:text-gray-100">Education</h3>

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
        class="font-semibold mt-4 text-xl text-gray-900 md:mt-10 dark:text-gray-100"
      >Technologies I use</h3>

      <div class="mt-4 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <CardSkill v-for="(skill, index) in skills" :key="`skill-${index}`" :title="skill" />
      </div>
    </section>

    <section id="repositories" class="mt-6">
      <h2
        class="font-semibold mt-10 text-xl text-gray-900 dark:text-gray-100"
      >My GitHub repositories</h2>

      <div class="mt-4">
        <div v-if="$fetchState.pending" class="grid gap-2 grid-cols-1 md:grid-cols-2">
          <SkeletonLoader v-for="item in 6" :key="`repo-skeleton-${item}`" type="repository" />
        </div>

        <div
          v-else-if="$fetchState.error"
          class="text-gray-900 dark:text-gray-100"
        >Couldn't load GitHub repositories.</div>

        <div v-else-if="repos.length > 0" class="grid gap-2 grid-cols-1 md:grid-cols-2">
          <SmartLink
            v-for="(repo, index) in repos.slice(0, 6)"
            :key="`repo-${index}`"
            :href="repo.html_url"
            title="Click here to visit this repository"
            blank
          >
            <CardRepository
              :name="repo.name"
              :language="repo.language"
              :stars="repo.stargazers_count"
              :description="repo.description"
              class="h-full"
            />
          </SmartLink>
        </div>

        <button
          v-if="$fetchState.pending === false"
          class="flex space-x-2 mt-2 text-gray-300 items-center dark:text-gray-600 hover:text-gray-600 focus:outline-none dark:hover:text-gray-400"
          @click="showModal = true"
        >Show all {{ repos.length }} repositories</button>
      </div>
    </section>

    <section id="socials" class="mt-6">
      <h2 class="font-semibold mt-10 text-xl text-gray-900 dark:text-gray-100">Follow me</h2>

      <Socials class="mt-2" />
    </section>

    <ModalHomeRepositories v-model="showModal" :repos="repos" />
  </div>
</template>

<style lang="scss" scoped>
.description-link {
  @apply border-gray-500 border-b-2 border-opacity-50 hover:border-opacity-75;
}
</style>
