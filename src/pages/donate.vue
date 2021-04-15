<template>
  <div class="py-4">
    <div class="space-y-6 sm:w-9/12">
      <header class="space-y-4">
        <div class="space-y-1">
          <h1
            class="text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-gray-100"
          >
            Donate
          </h1>

          <div class="space-y-2 text-gray-800 dark:text-gray-200">
            <p>
              If you like my projects and/or what I do and you want to
              contribute, make me happy, you can donate to me with the
              information on this page! Thank you ♥
            </p>

            <p>
              <small class="text-sm">
                P.S. Use the name "Abdulbaki Dursun" on your transactions.
              </small>
            </p>
          </div>
        </div>
      </header>

      <section class="space-y-4">
        <h2 class="text-lg text-gray-900 dark:text-gray-100">Support Me On</h2>

        <div class="grid gap-4">
          <a
            target="_blank"
            rel="noreferrer"
            :href="getSponsorLinks.patreon"
            class="w-max"
          >
            <div
              class="flex items-center px-4 py-2 space-x-2 rounded cursor-pointer hover:bg-opacity-95 bg-[#FF424D]"
            >
              <SkeletonLoader
                type="image"
                image-url="https://i.vgy.me/qxpY9T.png"
                class="rounded w-7 h-7"
              />
              <span class="text-white">Become a Patron</span>
            </div>
          </a>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg text-gray-900 dark:text-gray-100">My Accounts</h2>

        <div class="grid gap-4">
          <div
            v-for="(account, index) in accounts"
            :key="`account-${index}`"
            class="flex items-center h-full"
          >
            <div class="bg-gray-300 rounded-tl rounded-bl dark:bg-gray-800">
              <SkeletonLoader
                type="image"
                :image-url="account.image"
                class="w-24 h-24"
              />
            </div>

            <div
              class="flex items-center w-full h-full pl-4 bg-gray-200 rounded-tr rounded-br dark:bg-gray-700"
            >
              <div>
                <h3 class="font-medium text-gray-900 dark:text-gray-100">
                  {{ account.name }}
                </h3>

                <span
                  v-if="account.revealed == true"
                  class="text-gray-800 dark:text-gray-200"
                >
                  {{ account.iban }}
                </span>

                <span
                  v-else
                  class="text-gray-800 underline cursor-pointer dark:text-gray-200"
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

<script>
export default {
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
          image: "https://i.vgy.me/R0Jwqn.png",
          name: "Papara",
          iban: "8664721806",
          revealed: false,
        },
      ],
    }
  },
  head() {
    const title = "Donate"
    const description =
      "Like my projects? You can donate me to boost my performance and make me create more, better projects in the future!"

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
     * @returns {object}
     */
    getSponsorLinks() {
      return this.$config.sponsor
    },
  },
}
</script>
