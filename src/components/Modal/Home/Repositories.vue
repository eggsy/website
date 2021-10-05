<script lang="ts">
import { PropType } from "vue"

/* Import types */
import type { Repository } from "@/types/Response/GitHub"

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
    repos: {
      type: Array as PropType<Repository[]>,
      required: true,
      default: [],
    },
  },
  computed: {
    getGithubProfile() {
      this.$config.social.github
    },
  },
  methods: {
    closeModal() {
      this.$emit("input", false)
    },
  },
}
</script>

<template>
  <transition name="fade" mode="in-out">
    <div v-show="value === true">
      <div class="bg-black bg-opacity-25 inset-0 fixed overflow-y-auto">
        <div
          class="
            flex
            mx-auto
            max-h-screen
            inset-0
            fixed
            items-center
            justify-center
            overflow-y-auto
            md:w-6/8
          "
        >
          <div
            class="
              rounded-lg
              flex flex-col
              space-y-6
              bg-gray-100
              shadow-lg
              p-10
              dark:bg-gray-900
            "
          >
            <div class="space-y-6">
              <h3 class="text-2xl dark:text-white">All Repositories</h3>

              <div
                class="
                  max-h-[50vh]
                  grid
                  px-1
                  gap-4
                  overflow-y-auto
                  md:grid-cols-3
                "
              >
                <SmartLink
                  v-for="(repo, index) in repos"
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
                  />
                </SmartLink>
              </div>
            </div>

            <div
              class="space-y-2 items-center md:flex md:(space-x-4 space-y-0)"
            >
              <button @click="closeModal()">Close</button>

              <SmartLink
                class="flex space-x-2 button items-center justify-center"
                :href="getGithubProfile"
                title="Click to visit my GitHub profile"
                blank
              >
                <IconBrand brand="github" class="h-6 w-6" />
                <span>See Them on GitHub</span>
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
button,
.button {
  @apply rounded-lg cursor-pointer font-medium bg-gray-200 text-black w-full py-2 px-8 transition-colors select-none md:w-max dark:(bg-gray-800 text-white) hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700;
}
</style>
