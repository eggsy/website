<template>
  <div class="py-10 flex justify-center">
    <div class="w-11/12 mx-auto space-y-10 sm:space-y-16">
      <div class="text-center font-semibold pt-5 pb-4 sm:pt-10 sm:pb-8">
        <div class="w-3/6 sm:w-1/6 mx-auto text-center mb-4">
          <div
            :class="{
              'bg-gray-100 h-48 w-48 rounded-full animate-pulse ring-4 ring-opacity-20 ring-black':
                imageLoaded === false,
            }"
          >
            <img
              :class="{
                'rounded-full ring-4 ring-opacity-20 ring-black': true,
                hidden: imageLoaded === false,
              }"
              alt="irl image"
              src="/assets/images/irl_image.jpg"
              data-not-lazy
              draggable="false"
              @load="imageLoaded = true"
            />
          </div>
        </div>

        <span class="text-xl text-gray-900 dark:text-gray-200"
          >Abdulbaki "EGGSY" Dursun</span
        >
      </div>

      <!-- News -->
      <div
        v-if="news.available"
        v-ripple
        :class="{
          'sm:flex sm:items-center sm:space-x-2 text-center sm:text-left w-full py-4 px-6 rounded-md': true,
          'cursor-pointer': news.url,
          [news.color]: true,
        }"
        @click="news.url ? open(news.url) : false"
      >
        <icon
          v-if="news.icon"
          :name="news.icon"
          class="h-10 w-10 hidden sm:block"
        />
        <span>{{ news.message }}</span>
      </div>

      <div
        class="sm:grid sm:grid-cols-2 gap-4 mt-6 sm:divide-x-2 divide-gray-300 divide-opacity-25"
      >
        <!-- Left Column -->
        <section class="divide-y-2 divide-gray-300 divide-opacity-25">
          <div>
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

          <div class="mt-4 pt-4">
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

          <div class="mt-4 pt-4">
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

        <hr class="bg-gray-900 bg-opacity-25 mt-6 sm:hidden" />

        <!-- Right Column -->
        <section
          class="mt-4 sm:mt-0 sm:pl-4 divide-y-2 divide-gray-300 divide-opacity-25"
        >
          <div class="sm:grid sm:grid-cols-2">
            <div class="flex items-center space-x-2">
              <icon name="academic-hat" class="h-16 w-16 dark:text-gray-200" />

              <div class="leading-none">
                <span
                  class="block text-gray-700 dark:text-gray-300 font-semibold"
                  >Abdulbaki Dursun</span
                >
                <a
                  class="block text-gray-600 dark:text-gray-200 text-sm hover:underline"
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
                  class="block text-gray-700 dark:text-gray-300 font-medium hover:underline"
                  href="mailto:eggsydev@gmail.com"
                  title="Mail me!"
                  rel="nofollow"
                  >eggsydev@gmail.com</a
                >
                <span
                  class="block text-gray-600 text-sm dark:text-gray-200 font-light text-right"
                  >Sakarya, Turkey</span
                >
              </div>

              <icon name="fingerprint" class="h-16 w-16 dark:text-gray-300" />
            </div>
          </div>

          <div class="mt-4 w-full pt-4">
            <CoolTitle class="mb-4" right-down="Introduction" />

            <p class="dark:text-gray-200">
              I am a 19 years old Turkish fullstack web developer and an ELT
              student at Muş Alparslan University since 2020. I do stuff on
              internet I like creating open-source projects. I also love
              learning new languages and playing computer games. This is me, and
              it's my life.
            </p>
          </div>

          <div class="mt-4 w-full pt-4">
            <CoolTitle
              :left="skills.length"
              right-up="Main"
              right-down="Technologies that I use"
              class="mb-4"
            />

            <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <Skill
                v-for="(skill, index) in skills"
                :key="`skill-${index}`"
                :title="skill.title"
                :icon="skill.icon"
                :level="skill.level"
              />
            </div>
          </div>

          <div class="mt-4 w-full pt-4">
            <CoolTitle
              :left="12"
              right-up="Hobbies"
              right-down="And free time activities"
              class="mb-4"
            />

            <div class="grid grid-cols-3 sm:grid-cols-6 gap-4">
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
          class="mb-4 text-center justify-center"
          right-down="GitHub Repositories"
        />

        <div
          v-if="$fetchState.pending"
          class="grid grid-cols-1 sm:grid-cols-3 gap-2"
        >
          <SkeletonLoader
            v-for="item in 6"
            :key="`repo-skeleton-${item}`"
            type="repository"
          />
        </div>

        <div
          v-else-if="$fetchState.error"
          class="flex items-center justify-center p-4 font-semibold text-gray-800 bg-gray-100 rounded-md cursor-not-allowed"
        >
          Couldn't load GitHub Repositories
        </div>

        <div
          v-else-if="
            $fetchState.pending === false &&
            !$fetchState.error &&
            repos.length > 0
          "
          class="grid grid-cols-1 sm:grid-cols-3 gap-2"
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
          class="mb-4 text-center justify-center"
          right-down="Visit other pages!"
        />

        <div
          class="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 space-y-4 sm:space-y-0"
        >
          <nuxt-link
            to="/blog"
            class="bg-gray-100 hover:bg-gray-200 rounded-md flex items-center py-4 px-6 space-x-2 text-xl select-none"
          >
            <icon name="document" class="h-10 w-10" />
            <span>Blog</span>
          </nuxt-link>

          <div
            class="bg-gray-100 hover:bg-gray-200 rounded-md flex items-center py-4 px-6 space-x-2 text-xl cursor-not-allowed select-none"
            rel="nofollow"
          >
            <icon name="clipboard-list" class="h-10 w-10" />
            <span>PreMiD (WIP)</span>
          </div>
        </div>
      </section>

      <section class="w-full sm:w-3/12 mx-auto text-center my-10 space-y-4">
        <div>
          <CoolTitle class="mb-4 justify-center" right-down="Was it all?" />
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
          title: "NuxtJS",
          icon: "nuxtjs",
          level: 90,
        },
        {
          title: "VueJS",
          icon: "vuejs",
          level: 85,
        },
        {
          title: "TypeScript",
          icon: "typescript",
          level: 80,
        },
        {
          title: "NodeJS",
          icon: "nodejs",
          level: 80,
        },
      ],
      hobbies: [
        { name: "Programming", icon: "terminal" },
        { name: "Reading", icon: "book-open" },
        { name: "Photography", icon: "camera" },
        { name: "Chatting", icon: "chat" },
        { name: "Movies", icon: "movie" },
        { name: "Camping", icon: "fire" },
        { name: "Travelling", icon: "map" },
        { name: "Music", icon: "music" },
        { name: "Shopping", icon: "shopping-cart" },
        { name: "Swimming", icon: "help" },
        { name: "Parties", icon: "party" },
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
