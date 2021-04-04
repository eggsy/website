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
          :iframe-url="`https://www.youtube.com/embed/${getSelectedSong.youtube}`"
          class="w-full h-56"
        />

        <div class="space-y-2">
          <div class="grid items-center gap-2 sm:grid-cols-2">
            <a
              :href="`https://youtu.be/${getSelectedSong.youtube}/?utm_source=eggsy.xyz`"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-center px-4 py-2 space-x-2 overflow-hidden text-center text-gray-900 bg-gray-100 rounded cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-700 ring-1 ring-gray-200 dark:ring-gray-800 dark:bg-gray-800 dark:text-gray-100"
            >
              <icon name="youtube" class="flex-shrink-0 w-6 h-6" />
              <span class="truncate">YouTube</span>
            </a>

            <a
              :href="
                getSelectedSong.spotify
                  ? `https://open.spotify.com/track/${getSelectedSong.spotify}/?utm_source=eggsy.xyz`
                  : false
              "
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-center px-4 py-2 space-x-2 overflow-hidden text-gray-900 bg-gray-100 rounded cursor-pointer select-none hover:bg-gray-200 ring-1 ring-gray-200 dark:ring-gray-800 dark:text-gray-100"
              :class="{
                'dark:bg-gray-800 dark:hover:bg-gray-700':
                  getSelectedSong.spotify,
                'cursor-not-allowed bg-gray-200 dark:bg-gray-700':
                  getSelectedSong.spotify === null,
              }"
            >
              <icon name="spotify" class="flex-shrink-0 w-6 h-6" />
              <span class="truncate">Spotify</span>
            </a>
          </div>

          <div class="space-y-2">
            <div
              class="flex items-center px-4 py-2 bg-gray-100 rounded ring-1 ring-gray-200 dark:ring-gray-800 dark:bg-gray-800"
            >
              <span class="flex-shrink-0 w-1/4 text-gray-900 dark:text-gray-100"
                >Title</span
              >
              <span
                class="w-3/4 text-right text-gray-700 truncate dark:text-gray-300"
                >{{ getSelectedTitle }}</span
              >
            </div>

            <div
              class="flex items-center px-4 py-2 bg-gray-100 rounded ring-1 ring-gray-200 dark:ring-gray-800 dark:bg-gray-800"
            >
              <span
                class="flex-shrink-0 w-1/4 text-gray-900 dark:text-gray-100"
              >
                Artist
              </span>

              <span
                class="w-3/4 text-right text-gray-700 truncate dark:text-gray-300"
              >
                {{ getSelectedSongMetadata.artist || "Unknown" }}
              </span>
            </div>

            <div
              class="flex items-center px-4 py-2 bg-gray-100 rounded ring-1 ring-gray-200 dark:ring-gray-800 dark:bg-gray-800"
            >
              <span
                class="flex-shrink-0 w-1/4 text-gray-900 dark:text-gray-100"
              >
                Date
              </span>

              <span
                class="w-3/4 text-right text-gray-700 truncate dark:text-gray-300"
              >
                {{ getSelectedDateTitle }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="relative p-2 bg-gray-100 rounded h-52 ring-1 ring-gray-200 sm:h-auto dark:ring-gray-800 dark:bg-gray-800"
        :class="{
          'hidden sm:flex items-center justify-center': !getLyrics,
        }"
      >
        <div
          v-if="getLyrics"
          class="absolute space-y-2 overflow-y-auto top-4 bottom-4 left-4 right-4 scrollbar"
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

          <p class="text-xs font-medium text-gray-600 dark:text-gray-400">
            Lyrics by
            <a
              href="https://api.ksoft.si/?ref=eggsy.xyz"
              class="hover:underline"
              target="_blank"
              rel="noreferrer"
              >KSoft.Si</a
            >
          </p>
        </div>

        <div v-else>
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
          class="overflow-x-hidden"
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
    const image = "https://eggsy.xyz/assets/meta/images/daily.jpg"

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
          content: `https://eggsy.xyz/daily`,
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
      ].map((i) => {
        i.property = i.property || i.name || null
        return i
      }),
      link: [
        {
          rel: "canonical",
          href: `https://eggsy.xyz/daily`,
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
      return {
        youtube: this.selected?.url || "ZY3J3Y_OU0w",
        spotify: this.selected?.spotifyUrl || null,
      }
    },
    /**
     * Returns the metadata of the selected song.
     * @returns {object} The song metadata.
     */
    getSelectedSongMetadata() {
      return this.selected?.metadata || {}
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
</style>
