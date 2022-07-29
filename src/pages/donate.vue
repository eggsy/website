<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { Sponsor } from "~/@types/runtimeConfig"

export default Vue.extend({
  data() {
    return {
      accounts: [
        {
          image: "https://i.vgy.me/QJNSYE.png",
          name: "Ziraat Bank",
          iban: "TR 1100 0100 2544 95837917 5001",
          revealed: false,
        },
        {
          image: "https://i.vgy.me/l1CN85.png",
          name: "QNB Finansbank",
          iban: "TR96 0011 1000 0000 0086 7646 98",
          revealed: false,
        },
        {
          image: "https://i.vgy.me/9e6pkz.png",
          name: "Denizbank",
          iban: "TR31 0013 4000 0189 9352 2000 01",
          revealed: false,
        },
        {
          image: "https://i.vgy.me/R0Jwqn.png",
          name: "Papara",
          iban: "8664721806",
          revealed: false,
        },
        {
          image: "https://i.vgy.me/UCiozk.png",
          name: "PayPal",
          iban: "@eggsydev",
          revealed: false,
        },
      ],
    }
  },
  head() {
    const title = "Donate"
    const description =
      "Like my projects? You can donate to me to boost my performance and help me create more, better projects in the future!"

    return {
      title,
      meta: this.$prepareMeta({
        title,
        description,
        keywords: "donate",
        url: "https://eggsy.xyz/donate",
      }),
      link: [
        {
          rel: "canonical",
          href: "https://eggsy.xyz/donate",
        },
      ],
    }
  },
  computed: {
    /**
     * Returns the Sponsor object in runtime config.
     * @returns {Sponsor}
     */
    getSponsorLinks(): Sponsor {
      return this.$config.sponsor as Sponsor
    },
  },
})
</script>

<template>
  <div class="py-4">
    <div class="space-y-12 text-gray-500 sm:w-9/12 dark:text-neutral-600">
      <header class="space-y-2 my-12 px-4">
        <h1 class="text-gray-700 text-4xl dark:text-neutral-300">Donate</h1>

        <p>
          If you like my projects and/or what I do and you want to contribute,
          make me happy, you can donate to me with the information on this page!
          Thank you ♥
        </p>

        <p class="text-xs">
          P.S. Use "<span class="underline">Abdulbaki Dursun</span>" as the name
          of your transactions.
        </p>
      </header>

      <section class="space-y-4">
        <Title>Support Me On</Title>

        <div class="flex flex-wrap gap-4 mx-4">
          <Button
            variant="github"
            class="w-full lg:w-max"
            :href="getSponsorLinks.github"
            blank
          >
            <template #icon>
              <IconBrand
                brand="github"
                class="h-7 text-black dark:text-white w-7"
              />
            </template>

            GitHub Sponsors
          </Button>

          <Button
            variant="patreon"
            class="w-full lg:w-max"
            :href="getSponsorLinks.patreon"
            blank
          >
            <template #icon>
              <SmartImage
                src="https://i.vgy.me/qxpY9T.png"
                class="rounded h-7 w-7"
              />
            </template>

            Become a Patron
          </Button>
        </div>
      </section>

      <section class="space-y-4">
        <SmartLink
          href="https://github.com/sponsors/eggsy"
          class="flex space-x-2 justify-between mx-4 items-center"
          blank
        >
          <Title :padding="false">Sponsors</Title>
          <IconBrand
            brand="github"
            class="h-7 w-7 dark:hover:text-white hover:text-black transition-colors"
          />
        </SmartLink>

        <div class="bg-gray-200/75 dark:bg-neutral-800/50 mx-4 rounded-md p-4">
          <SmartImage
            src="https://cdn.jsdelivr.net/gh/eggsy/.github/sponsors.svg"
            alt="sponsors"
          />
        </div>
      </section>

      <section class="space-y-4">
        <Title>My Accounts</Title>

        <div class="grid px-4 gap-4">
          <div
            v-for="(account, index) in accounts"
            :key="`account-${index}`"
            class="flex h-full items-center"
          >
            <div class="rounded-l bg-gray-200/75 dark:bg-neutral-800/50">
              <SmartImage :src="account.image" class="rounded-l h-24 w-24" />
            </div>

            <div
              class="rounded-tr rounded-br flex h-full bg-gray-200/50 w-full pl-4 items-center dark:bg-neutral-800/75"
            >
              <div>
                <h3
                  class="font-medium text-lg text-gray-900 dark:text-neutral-300"
                >
                  {{ account.name }}
                </h3>

                <span
                  v-if="account.revealed == true"
                  class="text-gray-800 dark:text-neutral-500"
                >
                  {{ account.iban }}
                </span>

                <span
                  v-else
                  class="cursor-pointer text-gray-800 dark:text-neutral-500 hover:underline"
                  @click="account.revealed = true"
                >
                  Click to reveal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
