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

  <div
    v-else
    class="flex flex-col pt-2 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row"
  >
    <div class="space-y-4 sm:w-5/12">
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

    <div class="space-y-2 sm:w-7/12">
      <CardSong
        v-for="(song, index) in getSongList"
        :key="`song-${index}`"
        :title="song.metadata.title"
        :date="song.date"
        :thumbnail="song.metadata.thumbnail || 'http://via.placeholder.com/75'"
        @click.native="selected = song"
      />

      <div
        class="flex items-center justify-center w-full py-2 space-x-2 text-gray-800 bg-gray-200 rounded-md cursor-pointer dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800"
        @click="page = page === 0 ? 1 : 0"
      >
        <span>{{ page === 0 ? "Next" : "Previous" }}</span>
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
      page: 0,
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
      let slice = { from: 0, to: 5 }
      if (this.page > 0) slice = { from: 5, to: 10 }

      return this.songs
        .filter((song) => song.date !== this.selected.date)
        .slice(slice.from, slice.to)
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
