<template>
  <div>
    <header class="flex flex-col-reverse py-24 sm:items-center sm:flex-row">
      <div class="sm:w-8/12">
        <div class="space-y-px">
          <div
            class="text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl dark:text-gray-100"
          >
            <h1>Self taught</h1>
            <h1><span class="text-blue-600">Full-stack</span> web developer</h1>
          </div>

          <p class="text-gray-800 dark:text-gray-200">
            Hi there, my name is Abdulbaki, I am from Turkey and I am a self
            taught web developer. I recently started building complex web apps
            using Vue.js, Nuxt.js and TailwindCSS.
          </p>
        </div>

        <Status class="mt-2" />
      </div>

      <div class="flex flex-shrink-0 mb-8 sm:justify-end sm:mb-0 sm:w-4/12">
        <SkeletonLoader
          type="image"
          image-url="/assets/images/irl_image.webp"
          class="w-40 h-40 rounded-full ring-4 ring-gray-200 dark:ring-gray-700"
        />
      </div>
    </header>

    <section id="projects">
      <h2 class="mt-10 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Projects I currently work on
      </h2>

      <div class="grid gap-2 mt-2 sm:gap-4 sm:grid-cols-3">
        <div
          v-for="(project, index) in getProjects.featured"
          :key="`project-featured-${index}`"
        >
          <nuxt-link v-if="project.to" :to="project.to">
            <CardProject
              :title="project.title"
              :description="project.description"
              :image="project.image"
              class="h-full"
            />
          </nuxt-link>

          <a
            v-else-if="project.href"
            :href="`${project.href}?utm_source=eggsy.xyz`"
            rel="noreferrer"
            target="_blank"
            title="Click to visit this project"
          >
            <CardProject
              :title="project.title"
              :description="project.description"
              :image="project.image"
              class="h-full"
            />
          </a>

          <CardProject
            v-else
            :title="project.title"
            :description="project.description"
            :image="project.image"
            class="h-full"
          />
        </div>
      </div>

      <div class="grid gap-2 mt-2 sm:mt-4 sm:gap-4 sm:grid-cols-3">
        <nuxt-link
          v-for="(project, index) in getProjects.rest"
          :key="`project-rest-${index}`"
          :to="project.to"
        >
          <CardProject
            :title="project.title"
            :description="project.description"
            class="h-full"
          />
        </nuxt-link>
      </div>
    </section>

    <section
      id="experiences"
      class="grid gap-6 mt-4 sm:mt-6 md:mt-10 sm:gap-8 sm:grid-cols-2"
    >
      <div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          My experiences
        </h3>

        <div class="grid gap-2 mt-4">
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
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Education
        </h3>

        <div class="grid gap-2 mt-4">
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
        class="mt-4 text-xl font-semibold text-gray-900 sm:mt-10 dark:text-gray-100"
      >
        Technologies I use
      </h3>

      <div class="grid grid-cols-2 gap-2 mt-4 sm:grid-cols-3 md:grid-cols-4">
        <CardSkill
          v-for="(skill, index) in skills"
          :key="`skill-${index}`"
          :title="skill"
        />
      </div>
    </section>

    <section id="repositories" class="mt-6">
      <h2 class="mt-10 text-xl font-semibold text-gray-900 dark:text-gray-100">
        My GitHub repositories
      </h2>

      <div class="mt-4">
        <div
          v-if="$fetchState.pending"
          class="grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
          <SkeletonLoader
            v-for="item in 6"
            :key="`repo-skeleton-${item}`"
            type="repository"
          />
        </div>

        <div v-else-if="$fetchState.error">
          Couldn't load GitHub repositories.
        </div>

        <div
          v-else-if="repos.length > 0"
          class="grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
          <a
            v-for="(repo, index) in repos"
            :key="`repo-${index}`"
            :href="repo.html_url"
            target="_blank"
            rel="noreferrer"
            title="Click here to visit this repository"
          >
            <CardRepository
              :name="repo.name"
              :language="repo.language"
              :stars="repo.stargazers_count"
              :description="repo.description"
              class="h-full"
            />
          </a>
        </div>
      </div>
    </section>

    <section id="socials" class="mt-6">
      <h2 class="mt-10 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Follow me
      </h2>

      <Socials class="mt-2" />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repos: [],
      projects: [
        {
          title: "Discord Templates",
          description:
            "Create your own kingdom with our diverse range of Discord templates!",
          image: "https://i.vgy.me/jbf1UB.jpg",
          href: "https://temp.gg",
        },
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
          description: "Free image and file uploading service for ShareX!",
          to: "/projects/is-inside-me",
        },
        {
          title: "Daily Song",
          description: "Fresh song from my taste each day!",
          to: "/daily",
        },
      ],
      experiences: {
        jobs: [
          {
            title: "IZM Game Studios",
            url: "https://izmgamestudios.com",
            position: "Solution Partner",
            date: "2020-",
          },
          {
            title: "TruckersMP",
            url: "https://truckersmp.com/user/1648033",
            position: "Communitiy Moderator & Translator",
            date: "2020-",
          },
          {
            title: "Batakköylü Düğün Salonu",
            url: "https://batakkoylu.netlify.app",
            position: "Web Developer",
            date: "2020-2020",
          },
          {
            title: "Discord Bot List",
            url: "https://top.gg/user/162969778699501569",
            position: "Website Moderator",
            date: "2017-2018",
          },
          {
            title: "EGGSY's Discord Bot",
            url: "https://top.gg/bot/eggsy",
            position: "Creator, Developer and Maintainer",
            date: "2017-2019",
          },
        ],
        education: [
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
            title: "Adil Karağaaç MTAL",
            url: "https://akatl.meb.k12.tr/",
            position: "Automation Systems",
            date: "2014-2018",
          },
        ],
      },
      skills: [
        "JavaScript",
        "HTML5",
        "Nuxt.js",
        "Vue.js",
        "Tailwind CSS",
        "Node.js",
        "TypeScript",
        "Sass",
        "Figma",
        "Firebase",
        "WordPress",
        "PHP",
      ],
    }
  },
  fetchOnServer: false,
  async fetch() {
    const filter = ["eggsy", "DBM", "eggsywashere.github.io"]
    const { data: repos } = await this.$axios.get(
      "https://api.github.com/users/eggsy/repos"
    )

    this.repos = repos
      ?.filter((repo) => repo.fork === false && !filter.includes(repo.name))
      ?.sort((a, b) => b?.stargazers_count - a?.stargazers_count)
  },
  head: {
    title: "Home",
  },
  computed: {
    /**
     * Slices the first three projects and creates an object with them, and the rest.
     * @returns {{featured: object[], rest: object[]}} The projects array.
     */
    getProjects() {
      return {
        featured: this.projects?.slice(0, 3),
        rest: this.projects.slice(3),
      }
    },
  },
}
</script>
