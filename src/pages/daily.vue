<template>
  <div v-if="$fetchState.pending" class="flex items-center justify-center">
    <div class="flex items-center space-x-2 dark:text-gray-200">
      <icon name="sync" class="h-6 w-6 animate-spin" />
      <h2 class="font-semibold text-lg">Fetchings songs...</h2>
    </div>
  </div>

  <div v-else-if="$fetchState.error" class="flex items-center justify-center">
    <div class="flex items-center space-x-2 dark:text-gray-200">
      <icon name="ban" class="h-6 w-6" />
      <h2 class="font-semibold text-lg">Couldn't load the song list...</h2>
    </div>
  </div>

  <div v-else class="px-4 sm:px-0 py-4 flex flex-col sm:flex-row items-center">
    <div class="flex flex-col sm:flex-row w-full gap-4 sm:gap-6">
      <div class="sm:w-1/3 flex flex-col space-y-4">
        <div class="flex space-x-4">
          <nuxt-link :to="{ name: 'index' }" class="side-button">
            <icon name="home" class="h-6 w-6" />
          </nuxt-link>

          <div
            class="bg-gray-200 dark:bg-gray-800 rounded-md px-4 py-2 ring block w-4/6"
          >
            <h1
              class="text-lg font-semibold text-center text-gray-700 dark:text-gray-100"
            >
              {{ getCardTitle }}
            </h1>
          </div>

          <a
            :href="`https://youtu.be/${getSelectedSong}`"
            rel="noreferrer"
            class="side-button"
          >
            <icon name="external-link" class="h-6 w-6" />
          </a>
        </div>

        <div class="w-full space-y-4">
          <div>
            <iframe
              class="w-full rounded-md"
              height="250"
              :src="`https://www.youtube.com/embed/${getSelectedSong}`"
            />
          </div>

          <div
            class="bg-green-600 dark:bg-gray-800 hidden sm:block rounded-md p-4 text-white"
          >
            <h3 class="text-lg font-semibold block">What is this about?</h3>

            <div class="space-y-2">
              <p>
                I like listening to music a lot and I like sharing my music with
                those who are in search for something new to listen. I created
                this page where you can get fresh new songs each day and listen
                to them! Hope you like my taste!
              </p>

              <p>
                You can see the latest 10 songs including the today's song here
                in this page. Visit this page everyday to find a new song!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="sm:w-2/3">
        <div
          class="bg-gray-200 dark:bg-gray-800 p-4 rounded-md ring grid grid-cols-1 sm:grid-cols-2 gap-2"
        >
          <div
            v-for="(song, index) in getSongList"
            :key="`song-${index}`"
            :class="{
              'px-4 py-2 rounded-md bg-white dark:bg-gray-900 hover:bg-opacity-75 cursor-pointer select-none flex space-x-2 items-center group': true,
              'sm:col-span-2': index % 3 === 0,
            }"
            @click="selected = song"
          >
            <img
              :src="song.metadata.thumbnail || 'http://via.placeholder.com/75'"
              class="thumbnail object-none rounded"
              draggable="false"
            />

            <div class="truncate">
              <div class="flex items-center space-x-1">
                <icon
                  v-if="getSongDateTitle(song.date).startsWith('Today')"
                  name="star"
                  class="h-4 w-4"
                />
                <span class="text-sm text-gray-600 dark:text-gray-300">{{
                  getSongDateTitle(song.date)
                }}</span>
              </div>

              <h3
                class="text-lg leading-tight text-gray-900 dark:text-gray-100 font-semibold truncate"
              >
                {{ song.metadata.title }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: new Date(),
      selected: {},
      songs: [],
    }
  },
  fetchOnServer: false,
  async fetch() {
    const songs = await this.$getDaily(10)

    this.selected = songs[0]
    this.songs = songs || []
  },
  head() {
    const title = "Song Recommendations"
    const description =
      "Here you will find my song recommendations of the last 10 days. You can check this page everyday for a fresh song!"
    const image = "/assets/meta/images/daily.jpg"

    return {
      title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "daily, song, recommendation, eggsy, songs",
        },
        // Open-Graph
        {
          hid: "og:title",
          name: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: description,
        },
        {
          hid: "og:url",
          name: "og:url",
          content: `https://new.eggsy.xyz/daily`,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: image,
        },
        // Twitter
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
        // PreMiD
        {
          name: "premid-details",
          content: "In a page:",
        },
        {
          name: "premid-details",
          content: "Daily Song",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: `https://new.eggsy.xyz/daily`,
        },
      ],
    }
  },
  computed: {
    /**
     * Returns the title according to the selected song.
     * @returns {string} The title.
     */
    getCardTitle() {
      if (
        this.$moment(this.selected?.date).format("DD/MM/YYYY") ===
        this.$moment().format("DD/MM/YYYY")
      )
        return "Today's Song"
      else return this.$moment(this.selected?.date).format("DD/MM/YYYY")
    },
    /**
     * Returns the selected song's ID, if none present, returns a fireplace video ID instead.
     * @returns {string} The video ID.
     */
    getSelectedSong() {
      return this.selected?.url || "ZY3J3Y_OU0w"
    },
    /**
     * Returns the array of the songs without the currently selected one in it.
     * @returns {Object[]} Array of songs without the selected one.
     */
    getSongList() {
      return this.songs.filter((song) => song.date !== this.selected.date)
    },
  },
  methods: {
    /**
     * Compares the dates between the provided date and current date and returns a title which will be used in cards' title.
     * @param {date} targetDate The target date that will be used to compare with today's date.
     * @returns {string} The title "Today's Song" or formatted date.
     */
    getSongDateTitle(targetDate) {
      if (
        this.$moment(targetDate).format("DD/MM/YYYY") ===
        this.$moment().format("DD/MM/YYYY")
      )
        return "Today's Song"
      else return this.$moment(targetDate).format("DD/MM/YYYY")
    },
  },
}
</script>

<style lang="scss" scoped>
.side-button {
  @apply bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-opacity-75 dark:hover:text-gray-300 rounded-md p-2 ring flex items-center justify-center w-1/6;
}

.ring {
  @apply ring-2 ring-opacity-75 ring-gray-300 dark:ring-transparent;
}

.thumbnail {
  height: 75px;
  width: 75px;
}
</style>
