<template>
  <div class="py-10 flex justify-center">
    <div class="w-11/12 space-y-16">
      <div class="text-center font-semibold pt-10 pb-8">
        <div class="w-1/6 mx-auto text-center mb-4">
          <img
            class="rounded-full shadow-lg"
            alt="irl image"
            src="https://eggsy.xyz/images/irl_image.jpg"
            draggable="false"
          />
        </div>

        <span class="text-xl">Abdulbaki "EGGSY" Dursun</span>
      </div>

      <div
        class="grid grid-cols-2 gap-4 mt-6 divide-x-2 divide-gray-300 divide-opacity-25"
      >
        <!-- Left Column -->
        <section class="divide-y-2 divide-gray-300 divide-opacity-25">
          <div>
            <CoolTitle
              :left="new Date().getFullYear() - 2017"
              right-up="Years"
              right-down="Of experience"
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

        <!-- Right Column -->
        <section class="pl-4 divide-y-2 divide-gray-300 divide-opacity-25">
          <div class="grid grid-cols-2">
            <div class="flex items-center space-x-2">
              <div>
                <svg
                  class="h-16 w-16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path fill="transparent" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    fill="transparent"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>

              <div class="leading-none">
                <span class="block text-gray-700 font-semibold"
                  >Abdulbaki Dursun</span
                >
                <a
                  class="block text-gray-600 text-sm hover:underline"
                  href="http://egitim.alparslan.edu.tr/?utm_source=eggsy.xyz"
                  title="I'm gonna be a teacher!"
                  target="_blank"
                  >MŞÜ ELT</a
                >
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <div>
                <svg
                  class="h-14 w-14"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>

              <div class="leading-none">
                <a
                  class="block text-gray-700 font-medium hover:underline"
                  href="mailto:eggsydev@gmail.com"
                  title="Mail me!"
                  >eggsydev@gmail.com</a
                >
                <span class="block text-gray-700 font-light"
                  >Sakarya, Turkey</span
                >
              </div>
            </div>
          </div>

          <div class="mt-4 w-full pt-4">
            <CoolTitle right-down="Introduction" />

            <p>
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
            />

            <div class="grid grid-cols-5 gap-2">
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
            />

            <div class="grid grid-cols-6 gap-4">
              <Hobby
                v-for="(hobby, index) of hobbies"
                :key="`hobby-${index}`"
                :title="hobby"
                :icon="hobby.toLowerCase()"
              />
            </div>
          </div>
        </section>
      </div>

      <div class="w-10/12 mx-auto my-10 space-y-4">
        <CoolTitle class="text-center" right-down="Latest blog posts" />

        <div
          v-if="$fetchState.pending || $fetchState.error"
          class="grid grid-cols-3 gap-2"
        >
          <CardBlog v-for="key in 3" :key="key" :loading="true" />
        </div>

        <div v-else-if="posts.length > 0" class="grid grid-cols-3 gap-4">
          <CardBlog
            v-for="(post, index) in posts"
            :key="`post-${index}`"
            :post="post"
          />
        </div>
      </div>

      <div class="w-3/12 mx-auto text-center my-10 space-y-4">
        <div>
          <CoolTitle right-down="Was it all?" />
          <span class="text-gray-700"
            >Nope, don't forget to check out my social media accounts</span
          >
        </div>

        <Socials />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
            date: "2018-2019",
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
        "Programming",
        "Reading",
        "Photography",
        "Chatting",
        "Movies",
        "Camping",
        "Travelling",
        "Music",
        "Shopping",
        "Swimming",
        "Parties",
        "Handwork",
      ],
      posts: [],
    }
  },
  async fetch() {
    const latestPosts = await this.$content()
      .limit(3)
      .sortBy("createdAt", "desc")
      .only(["title", "slug", "description", "image", "createdAt", "tags"])
      .fetch()

    this.posts = latestPosts
  },
}
</script>
