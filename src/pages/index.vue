<template>
  <div class="flex justify-center py-10">
    <div class="px-4 mx-auto space-y-10 md:space-y-16">
      <div class="pt-5 pb-4 md:pt-10">
        <div
          class="flex flex-col-reverse items-center justify-center py-4 rounded-md sm:flex-row sm:space-x-10 gray-bg sm:px-8"
        >
          <div class="py-4 sm:space-y-2">
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
              Abdulbaki "EGGSY" Dursun
            </h1>

            <p class="hidden text-gray-700 sm:block dark:text-gray-100">
              I am a young Turkish JavaScript developer who works in his free
              time as a full-stack JavaScript developer. Trying to create
              beautiful apps using Vue.js, Nuxt.js, TailwindCSS, and more
              technologies! Always trying to improve himself by learning new
              technologies and writing blog posts to share everything I learned
              with you!
            </p>
          </div>

          <div class="w-1/3">
            <div
              :class="{
                'rounded-full ring-4 ring-gray-300 dark:ring-gray-900': true,
                'bg-gray-100 dark:bg-gray-700  rounded-full animate-pulse w-full h-full':
                  imageLoaded === false,
              }"
              :style="{
                background:
                  imageLoaded === true
                    ? `url('/assets/images/irl_image.webp') no-repeat center`
                    : '',
                backgroundSize: imageLoaded === true ? 'contain' : '',
              }"
            >
              <img
                src="/assets/images/irl_image.webp"
                class="invisible"
                draggable="false"
                alt="irl image"
                @load="imageLoaded = true"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- News -->
      <div
        v-if="news.available"
        :class="{
          'md:flex md:items-center sm:space-x-2 text-center sm:text-left w-full py-4 px-6 rounded-md': true,
          'cursor-pointer': news.url,
          [news.color]: true,
        }"
        @click="news.url ? open(news.url) : false"
      >
        <icon
          v-if="news.icon"
          :name="news.icon"
          class="hidden w-10 h-10 sm:block"
        />
        <span>{{ news.message }}</span>
      </div>

      <div class="gap-4 mt-6 md:grid md:grid-cols-2">
        <!-- Left Column -->
        <section>
          <div class="p-4 rounded-md gray-bg">
            <CoolTitle
              :left="new Date().getFullYear() - 2017"
              right-up="Years"
              right-down="Of experience"
              class="mb-4"
            />

            <div class="grid grid-cols-1 gap-2">
              <Experience
                v-for="(experience, index) in experiences.job"
                :key="`exp-${index}`"
                :title="experience.title"
                :url="experience.url"
                :position="experience.position"
                :date="experience.date"
              />
            </div>
          </div>

          <div class="p-4 pt-4 mt-4 rounded-md gray-bg">
            <CoolTitle
              :left="2"
              right-up="Years"
              right-down="Of business activity"
              class="mb-4"
            />

            <div class="grid grid-cols-1 gap-2">
              <Experience
                v-for="(experience, index) in experiences.work"
                :key="`exp-${index}`"
                :title="experience.title"
                :url="experience.url"
                :position="experience.position"
                :date="experience.date"
              />
            </div>
          </div>

          <div class="p-4 pt-4 mt-4 rounded-md gray-bg">
            <CoolTitle
              :left="4"
              right-up="Years"
              right-down="Of formal education"
              class="mb-4"
            />

            <div class="grid grid-cols-1 gap-2">
              <Experience
                v-for="(experience, index) in experiences.edu"
                :key="`exp-${index}`"
                :title="experience.title"
                :url="experience.url"
                :position="experience.position"
                :date="experience.date"
              />
            </div>
          </div>
        </section>

        <hr class="mt-6 bg-gray-900 bg-opacity-25 sm:hidden" />

        <!-- Right Column -->
        <section class="mt-4 md:mt-0">
          <div class="p-4 rounded-md md:grid md:grid-cols-2 gray-bg">
            <div class="flex items-center space-x-2">
              <icon name="academic-hat" class="w-16 h-16 dark:text-gray-100" />

              <div class="leading-none">
                <span class="block font-semibold text-gray-700 dark:text-white"
                  >Abdulbaki Dursun</span
                >
                <a
                  class="block text-sm text-gray-600 dark:text-gray-200 hover:underline"
                  href="http://egitim.alparslan.edu.tr/?utm_source=eggsy.xyz"
                  title="I'm gonna be a teacher!"
                  target="_blank"
                  rel="noreferrer"
                  >MŞÜ ELT</a
                >
              </div>
            </div>

            <div class="flex items-center justify-end space-x-2">
              <div class="leading-none">
                <a
                  class="block font-medium text-gray-700 dark:text-white hover:underline"
                  href="mailto:eggsydev@gmail.com"
                  title="Mail me!"
                  rel="nofollow"
                  >eggsydev@gmail.com</a
                >
                <span
                  class="block text-sm font-light text-right text-gray-600 dark:text-gray-200"
                  >Sakarya, Turkey</span
                >
              </div>

              <icon name="fingerprint" class="w-16 h-16 dark:text-gray-100" />
            </div>
          </div>

          <div class="w-full p-4 mt-4 rounded-md gray-bg">
            <CoolTitle right-down="Introduction" class="mb-2" />

            <p class="dark:text-gray-100">
              I am a 19-year-old Turkish full-stack web developer and an ELT
              student at Muş Alparslan University since 2020. I do stuff on the
              internet and like to create open-source projects. I try to improve
              myself and learn new stuff when I am free from school and work to
              improve my skills.
            </p>
          </div>

          <div class="w-full p-4 pt-4 mt-4 rounded-md gray-bg">
            <CoolTitle
              :left="skills.length"
              right-up="Main"
              right-down="Technologies that I use"
              class="mb-4"
            />

            <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Skill
                v-for="(skill, index) in skills"
                :key="`skill-${index}`"
                :title="skill.title"
                :icon="skill.icon"
                :level="skill.level"
                :class="{
                  'sm:col-span-2':
                    index + 1 >= skills.length && skills.length % 3 !== 0,
                }"
              />
            </div>
          </div>

          <div class="w-full p-4 pt-4 mt-4 rounded-md gray-bg">
            <CoolTitle
              :left="12"
              right-up="Hobbies"
              right-down="And free time activities"
              class="mb-4"
            />

            <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Hobby
                v-for="(hobby, index) in hobbies"
                :key="`hobby-${index}`"
                :title="hobby.name"
                :icon="hobby.icon"
              />
            </div>
          </div>
        </section>
      </div>

      <section class="my-10 space-y-4">
        <CoolTitle
          class="justify-center mb-4 text-center"
          right-down="GitHub Repositories"
        />

        <div
          v-if="$fetchState.pending"
          class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
        >
          <SkeletonLoader
            v-for="item in 6"
            :key="`repo-skeleton-${item}`"
            type="repository"
          />
        </div>

        <div
          v-else-if="$fetchState.error"
          class="flex items-center justify-center p-4 font-semibold text-gray-800 bg-gray-100 rounded-md cursor-not-allowed dark:bg-gray-800 dark:text-gray-300"
        >
          Couldn't load GitHub Repositories
        </div>

        <div
          v-else-if="
            $fetchState.pending === false &&
            !$fetchState.error &&
            repos.length > 0
          "
          class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
        >
          <a
            v-for="(repo, index) in repos"
            :key="`repo-${index}`"
            :href="repo.html_url"
            target="_blank"
            rel="noreferrer"
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
      </section>

      <section class="my-10 space-y-4">
        <CoolTitle
          class="justify-center mb-4 text-center"
          right-down="Visit other pages!"
        />

        <div
          class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 sm:gap-4"
        >
          <nuxt-link to="/blog" class="page-box sm:col-span-2">
            <icon name="document" class="w-8 h-8" />
            <span>Blog</span>
          </nuxt-link>

          <div class="cursor-not-allowed page-box" rel="nofollow">
            <icon name="clipboard-list" class="w-8 h-8" />
            <span>PreMiD (WIP)</span>
          </div>

          <nuxt-link to="/projects/is-inside-me" class="page-box">
            <icon name="document" class="w-8 h-8" />
            <span>is-inside.me</span>
          </nuxt-link>

          <nuxt-link to="/daily" class="page-box">
            <icon name="music-note" class="w-8 h-8" />
            <span>Daily Song</span>
          </nuxt-link>

          <nuxt-link to="/projects/unblock-please" class="page-box">
            <icon name="lock-open" class="w-8 h-8" />
            <span>Unblock Please</span>
          </nuxt-link>
        </div>
      </section>

      <section class="w-full mx-auto my-10 space-y-4 text-center sm:w-3/12">
        <div>
          <CoolTitle right-down="Was it all?" class="justify-center mb-4" />
          <span class="text-gray-700 dark:text-gray-300"
            >Nope, don't forget to check out my social media accounts</span
          >
        </div>

        <Socials />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageLoaded: false,
      news: {
        available: false,
      },
      repos: [],
      experiences: {
        job: [
          {
            title: "IZM Game Studios",
            url: "https://izmgamestudios.com",
            position: "Solution Partner (Web Development)",
            date: "2020-",
          },
          {
            title: "TruckersMP",
            url: "https://truckersmp.com/user/1648033",
            position: "Communitiy Moderator and Translator",
            date: "2020-",
          },
          {
            title: "Discord Templates",
            url: "https://discordtemplates.com",
            position: "Web Developer",
            date: "2020-",
          },
          {
            title: "PreMiD",
            url: "https://premid.app",
            position: "Web Developer",
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
        ],
        edu: [
          {
            title: "Adil Karaağaç Mesleki ve Teknik Anadolu Lisesi",
            url: "http://akatl.meb.k12.tr",
            position: "Automation Technologies",
            date: "2014-2018",
          },
        ],
        work: [
          {
            title: "EGGSY's Discord Bot",
            url: "https://top.gg/bot/eggsy",
            position: "Creator, Developer and Maintainer",
            date: "2017-2019",
          },
          {
            title: "Rotosis Robotics",
            url: "https://www.rotosis.com",
            position: "Intern",
            date: "2017-2018",
          },
        ],
      },
      skills: [
        {
          title: "JavaScript",
          icon: "javascript",
          level: 99,
        },
        {
          title: "Nuxt.js",
          icon: "nuxtjs",
          level: 90,
        },
        {
          title: "Vue.js",
          icon: "vuejs",
          level: 85,
        },
        {
          title: "TypeScript",
          icon: "typescript",
          level: 80,
        },
        {
          title: "Node.js",
          icon: "nodejs",
          level: 80,
        },
        {
          title: "TailwindCSS",
          icon: "tailwindcss",
          level: 75,
        },
        {
          title: "Sass",
          icon: "sass",
          level: 70,
        },
        {
          title: "WordPress",
          icon: "wordpress",
          level: 50,
        },
        {
          title: "PHP",
          icon: "php",
          level: 20,
        },
      ],
      hobbies: [
        { name: "Programming", icon: "terminal" },
        { name: "Reading", icon: "book-open" },
        { name: "Photography", icon: "camera" },
        { name: "Chatting", icon: "chat" },
        { name: "Movies", icon: "movie" },
        { name: "Camping", icon: "fire" },
        { name: "Travelling", icon: "location-marker" },
        { name: "Music", icon: "music" },
        { name: "Shopping", icon: "shopping-bag" },
        { name: "Swimming", icon: "support" },
        { name: "Gaming", icon: "controller" },
        { name: "Handwork", icon: "scissors" },
      ],
    }
  },
  fetchOnServer: false,
  async fetch() {
    const news = await this.$getNews()

    if (news && news.active !== undefined && news.active === true) {
      this.news = news
      this.news.available = true
    }

    const { data: repos } = await this.$axios.get(
      "https://api.github.com/users/eggsy/repos"
    )
    const dontDisplayRepositories = ["eggsy", "DBM", "eggsywashere.github.io"]

    this.repos = repos
      ?.filter(
        (repo) =>
          repo.fork === false && !dontDisplayRepositories.includes(repo.name)
      )
      ?.sort((a, b) => b?.stargazers_count - a?.stargazers_count)
  },
  head: {
    title: "Home",
  },
  methods: {
    open(url) {
      if (!url.startsWith("https://")) return this.$router.push(url)
      else return window.open(url, "_self")
    },
  },
}
</script>

<style lang="scss" scoped>
.gray-bg {
  @apply bg-gray-100 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-transparent;
}

.page-box {
  @apply bg-gray-100 hover:bg-gray-200 ring-1 ring-gray-200 dark:ring-gray-900 hover:bg-opacity-80 dark:bg-gray-800 dark:hover:bg-gray-800 dark:hover:bg-opacity-80 dark:text-gray-200 rounded-md flex items-center justify-center py-4 px-6 space-x-2 text-xl select-none;
}
</style>
