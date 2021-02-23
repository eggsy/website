<template>
  <div
    v-if="$fetchState.pending"
    class="flex items-center justify-center h-screen -mt-10"
  >
    <div class="flex items-center space-x-2 dark:text-gray-200">
      <icon name="sync" class="w-6 h-6 animate-spin" />
      <h2 class="text-lg font-semibold">Fetching songs...</h2>
    </div>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex items-center justify-center h-screen -mt-10"
  >
    <div class="flex items-center space-x-2 dark:text-gray-200">
      <icon name="ban" class="w-6 h-6" />
      <h2 class="text-lg font-semibold">Couldn't load the song list...</h2>
    </div>
  </div>

  <div v-else class="py-4 space-y-6">
    <div class="grid gap-6 sm:grid-cols-2">
      <div class="space-y-4">
        <SkeletonLoader
          type="iframe"
          :iframe-url="`https://www.youtube.com/embed/${getSelectedSong}`"
          class="w-full h-56"
        />

        <ul class="space-y-2">
          <li
            class="flex items-center px-4 py-2 bg-gray-100 rounded dark:ring-gray-800 ring-1 ring-gray-200 dark:bg-gray-800"
          >
            <span class="flex-shrink-0 w-1/4 text-gray-900 dark:text-gray-100"
              >Title</span
            >
            <span
              class="w-3/4 text-right text-gray-700 truncate dark:text-gray-300"
              >{{ getSelectedTitle }}</span
            >
          </li>

          <li
            class="flex items-center px-4 py-2 bg-gray-100 rounded dark:ring-gray-800 ring-1 ring-gray-200 dark:bg-gray-800"
          >
            <span class="flex-shrink-0 w-1/4 text-gray-900 dark:text-gray-100"
              >Date</span
            >

            <span
              class="w-3/4 text-right text-gray-700 truncate dark:text-gray-300"
              >{{ getSelectedDateTitle }}</span
            >
          </li>

          <li
            class="flex items-center px-4 py-2 bg-gray-100 rounded dark:ring-gray-800 ring-1 ring-gray-200 dark:bg-gray-800"
          >
            <span class="flex-shrink-0 w-1/4 text-gray-900 dark:text-gray-100"
              >URL</span
            >

            <a
              :href="`https://youtu.be/${getSelectedSong}?utm_source=eggsy.xyz`"
              title="Click here to visit YouTube"
              class="w-3/4 text-right text-gray-700 truncate hover:underline dark:text-gray-300"
              rel="noreferrer"
              target="_blank"
            >
              {{ `https://youtu.be/${getSelectedSong}` }}
            </a>
          </li>
        </ul>
      </div>

      <div
        class="relative flex items-center justify-center p-2 bg-gray-100 rounded h-52 sm:h-auto dark:ring-gray-800 ring-1 ring-gray-200 dark:bg-gray-800"
      >
        <div
          v-if="getLyrics"
          class="absolute top-0 bottom-0 left-0 right-0 p-4 space-y-2 overflow-y-auto scrollbar"
        >
          <p
            v-for="(lyric, index) in getLyrics"
            :key="`lyric-${index}`"
            :class="{
              'text-gray-900 dark:text-gray-100': true,
              'py-2': lyric === '' && index !== 0,
              'font-semibold': index % 2 === 0,
            }"
          >
            {{ lyric }}
          </p>
        </div>

        <div v-else class="flex items-center justify-center">
          <h3 class="text-lg text-gray-900 dark:text-gray-100">No lyrics...</h3>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Older Songs
      </h3>

      <div class="grid gap-2 mt-2 sm:grid-cols-2 md:grid-cols-3">
        <CardSong
          v-for="(song, index) in getSongList"
          :key="`song-${index}`"
          :title="song.metadata.title"
          :date="song.date"
          :thumbnail="
            song.metadata.thumbnail || 'http://via.placeholder.com/75'
          "
          @click.native="selected = song"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iframeLoaded: false,
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
     * Returns the selected song's ID, if none present, returns a fireplace video ID instead.
     * @returns {string} The video ID.
     */
    getSelectedSong() {
      return this.selected?.url || "ZY3J3Y_OU0w"
    },
    /**
     * Returns the selected song's title.
     * @returns {string} Title of the selected song.
     */
    getSelectedTitle() {
      return this.selected?.metadata?.title || "Unknown"
    },
    /**
     * Returns the selected song's date in locale format.
     * @returns {string} The locale date string.
     */
    getSelectedDateTitle() {
      return this.selected?.date?.toLocaleDateString() || "Unknown"
    },
    /**
     * Returns the array of the songs without the currently selected one in it.
     * @returns {Object[]} Array of songs without the selected one.
     */
    getSongList() {
      return this.songs.filter((song) => song.date !== this.selected.date)
    },
    /**
     * Returns lyrics in array format if they were fetched from the API.
     * @returns {string[] | false} Array of lyrics.
     */
    getLyrics() {
      return this.selected?.metadata?.lyrics?.length > 0
        ? this.selected?.metadata?.lyrics
        : null
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

.scrollbar {
  @apply scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-400;

  &::-webkit-scrollbar {
    width: 6px;
  }
}

.dark .scrollbar {
  @apply scrollbar-track-gray-600 scrollbar-thumb-gray-700;

  &::-webkit-scrollbar {
    width: 6px;
  }
}

.thumbnail {
  height: 75px;
  width: 75px;
}
</style>
