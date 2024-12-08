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
  isHidden?: boolean
}

interface ExperienceObject {
  jobs: Experience[]
  education: Experience[]
}

export default Vue.extend({
  data() {
    return {
      animateText: false,
      showModal: false,
      showExtra: {
        jobs: false,
        education: false,
      },
      repos: [] as Repository[],
      experiences: {
        jobs: [
          {
            title: "Turkish Airlines",
            url: "https://www.turkishairlines.com",
            position: "Cabin Attendant",
            date: "2024-Present",
          },
          {
            title: "Voco Inc.",
            url: "https://vocoapp.com",
            position: "Web Developer",
            date: "2023-2024",
          },
          {
            title: "Google Developer Student Clubs",
            url: "https://gdsc.community.dev/mus-alparslan-universitesi",
            position: "Core Team Member",
            date: "2022-2024",
            isHidden: true,
          },
          {
            title: "KUKA Theater Association",
            url: "https://kukasahne.com",
            position: "Web Developer & Social Media Manager",
            date: "2022-2023",
            isHidden: true,
          },
          {
            title: "Discord Templates",
            url: "https://discords.com/templates",
            position: "Web Developer & Co-Founder",
            date: "2020-2021",
          },
          {
            title: "IZM Game Studios",
            position: "Solution Partner",
            date: "2020-2021",
            isHidden: true,
          },
          {
            title: "TruckersMP",
            url: "https://truckersmp.com/user/1648033",
            position: "Community Moderator & Translator",
            date: "2020-2021",
            isHidden: true,
          },
          {
            title: "WA Web+ Extension",
            url: "https://wawplus.com",
            position: "Translator",
            date: "2020-2021",
            isHidden: true,
          },
          {
            title: "Batakköylü Düğün Salonu",
            url: "https://batakkoylu.netlify.app",
            position: "Web Developer",
            date: "2020-2020",
            isHidden: true,
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
            title: "Muş Alparslan University",
            url: "http://alparslan.edu.tr/",
            position: "English Language Teaching",
            date: "2020-2024",
          },
          {
            title: "Goce Delchev University",
            url: "https://www.ugd.edu.mk/",
            position: "Erasmus+ Student",
            date: "2021-2022",
          },
          {
            title: "Rotosis Robotics",
            url: "https://www.rotosis.com/",
            position: "Intern",
            date: "2017-2018",
            isHidden: true,
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
              "Want to see and/or contribute to my code and public repositories?",
            href: "/me/repos",
          },
          {
            title: "Songs",
            description:
              "Trust your taste? Compare your favourite songs and artists with mine!",
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
              "My Turkish stories about real-life, programming, development and more!",
            href: "/blog",
          },
          {
            title: "Projects",
            description:
              "My projects and contributions to the open-source community.",
            href: "/projects",
          },
          {
            title: "Daily Songs",
            description:
              "Fresh, cool and great song recommendations from me each day!",
            href: "/daily",
          },
          {
            title: "Donate",
            description:
              "Want to support me and my projects so that I can create better stuff in the future?",
            href: "/donate",
          },
        ],
      },
      skills: [
        {
          title: "Development",
          items: [
            "TypeScript",
            "Vue.js",
            "React.js",
            "HTML5",
            "Tailwind CSS",
            "Node.js",
            "Sass",
          ],
        },
        {
          title: "Apps",
          items: [
            {
              title: "VS Code",
              iconPack: "IconBrand",
            },
            {
              title: "Raycast",
              image: "https://i.imgur.com/NBc0C4j.png",
            },
            {
              title: "Figma",
            },
          ],
        },
        {
          title: "Services",
          items: [
            {
              title: "GitHub",
              iconPack: "IconBrand",
            },
            {
              title: "Firebase",
            },
            {
              title: "Netlify",
              iconPack: "IconBrand",
            },
          ],
        },
      ],
    }
  },
  head: {
    title: "Home",
  },
  methods: {
    async scrollToSection(id: string) {
      if (this.$route.hash === id)
        await this.$router.replace({
          hash: "",
        })

      await this.$router.replace({
        hash: id,
      })
    },
    textAnimationInit() {
      setTimeout(() => {
        this.animateText = true
      }, 300)
    },
  },
})
</script>

<template>
  <div class="space-y-24 mb-10">
    <header class="my-16 py-10 space-y-8">
      <div
        class="flex flex-col-reverse md:(flex-row items-center justify-between) justify-center"
      >
        <div class="md:w-8/12">
          <div class="space-y-8">
            <div class="space-y-4">
              <h1
                class="font-semibold text-center text-lg md:(text-xl text-left) text-black/50 dark:text-white/50"
              >
                Hi, I am
                <span class="text-black/90 dark:text-white/90"
                  >Abdulbaki Dursun</span
                >
              </h1>

              <h1
                class="font-semibold text-center text-4xl md:(text-6xl text-left) text-black/90 dark:text-white/90"
              >
                <RoughNotation
                  is-show
                  type="strike-through"
                  multiline
                  @init="textAnimationInit"
                >
                  <span
                    class="transition-opacity duration-1000"
                    :class="animateText && 'opacity-30'"
                  >
                    Full-stack web developer
                  </span>
                </RoughNotation>
              </h1>

              <h3
                class="font-semibold justify-center text-xl items-center transition-opacity duration-1000 flex gap-2 text-center md:(text-2xl text-left justify-start) text-[#fde047] dark:text-dark-200"
                :class="animateText ? 'opacity-100' : 'opacity-30'"
              >
                <div
                  class="flex flex-col items-end text-[10px] text-black/50 dark:text-white/50"
                >
                  <span>curr</span>
                  <span>ently</span>
                </div>

                <RoughNotation :is-show="animateText" type="highlight">
                  <span class="text-black/90 dark:text-white/90 px-2">
                    Cabin Attendant
                  </span>
                </RoughNotation>
              </h3>
            </div>
          </div>
        </div>

        <div class="rounded-full mx-auto mb-4 md:mb-0">
          <SmartImage
            src="/assets/images/picture.png"
            class="rounded-full h-50 w-50"
          />
        </div>
      </div>

      <div
        class="flex items-center justify-center md:justify-start gap-x-3 gap-y-2 flex-wrap"
      >
        <Button
          v-for="item in ['TypeScript', 'Vue.js', 'React.js']"
          :key="item"
          class="inline-block"
        >
          <IconDev :brand="item" class="h-5 w-5" />
        </Button>

        <Button
          v-tippy="{ content: 'More', placement: 'bottom' }"
          @click.native="scrollToSection('#technologies')"
        >
          <IconEllipsis class="h-5 w-5" />
        </Button>
      </div>
    </header>

    <section id="pages">
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

    <section id="me">
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

    <section id="experiences" class="grid gap-x-8 gap-y-24 md:grid-cols-2">
      <div>
        <div class="flex items-center gap-4 justify-between">
          <Title>Experience</Title>
          <button
            type="button"
            class="text-black/50 text-sm hover:underline dark:text-white/30"
            @click="showExtra.jobs = !showExtra.jobs"
          >
            {{ showExtra.jobs ? "show less" : "show more" }}
          </button>
        </div>

        <div class="mt-4 grid gap-2">
          <CardExperience
            v-for="(experience, index) in experiences.jobs"
            v-show="experience.isHidden ? showExtra.jobs : true"
            :key="`experience-job-${index}`"
            :title="experience.title"
            :url="experience.url"
            :hidden-badge="experience.isHidden"
            :date="experience.date"
            :position="experience.position"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center gap-4 justify-between">
          <Title>Education</Title>
          <button
            type="button"
            class="text-black/50 text-sm hover:underline dark:text-white/30"
            @click="showExtra.education = !showExtra.education"
          >
            {{ showExtra.education ? "show less" : "show more" }}
          </button>
        </div>

        <div class="mt-4 grid gap-2">
          <CardExperience
            v-for="(experience, index) in experiences.education"
            v-show="experience.isHidden ? showExtra.education : true"
            :key="`experience-education-${index}`"
            :title="experience.title"
            :url="experience.url"
            :hidden-badge="experience.isHidden"
            :date="experience.date"
            :position="experience.position"
          />
        </div>
      </div>
    </section>

    <section id="technologies">
      <Title>Technologies I use</Title>

      <div class="flex flex-col space-y-6 mt-8">
        <section v-for="category in skills" :key="category.title">
          <h5
            class="text-sm uppercase text-black/50 pb-2 mb-4 border-b border-black/5 dark:(text-white/30 border-white/5)"
          >
            {{ category.title }}
          </h5>

          <div
            class="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-x-2 gap-y-2"
          >
            <CardSkill
              v-for="(skill, index) in category.items"
              :key="`skill-${index}`"
              v-bind="typeof skill === 'object' ? skill : { title: skill }"
            />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.description-link {
  @apply border-neutral-500 border-b-2 border-opacity-50 hover:border-opacity-75;
}
</style>
