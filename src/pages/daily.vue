<template>
  <div class="space-y-6 py-4">
    <div class="grid gap-6 sm:grid-cols-2">
      <div class="space-y-4 overflow-x-hidden">
        <SkeletonLoader
          type="iframe"
          :iframe-url="
            $fetchState.pending === false
              ? `https://www.youtube.com/embed/${getSelectedSong.youtube}`
              : ''
          "
          class="h-56 w-full"
        />

        <div class="space-y-2">
          <div class="grid gap-2 items-center sm:grid-cols-2">
            <SmartLink
              :href="
                $fetchState.pending === false
                  ? `https://youtu.be/${getSelectedSong.youtube}/`
                  : false
              "
              class="rounded cursor-pointer flex space-x-2 bg-gray-100 text-center py-2 px-4 ring-1 ring-gray-200 text-gray-900 items-center justify-center overflow-hidden select-none dark:(bg-gray-800 ring-gray-800 text-gray-100)"
              :class="{
                'hover:bg-gray-200 dark:hover:bg-gray-700':
                  $fetchState.pending === false && $fetchState.error === null,
              }"
              blank
            >
              <SkeletonLoader
                v-if="$fetchState.pending || $fetchState.error"
                class="bg-gray-200 h-6 w-2/3 dark:bg-gray-700"
              />

              <template v-else>
                <icon name="youtube" class="flex-shrink-0 h-6 w-6" />
                <span class="truncate">YouTube</span>
              </template>
            </SmartLink>

            <SmartLink
              :href="
                getSelectedSong.spotify
                  ? `https://open.spotify.com/track/${getSelectedSong.spotify}/`
                  : false
              "
              class="rounded cursor-pointer flex space-x-2 bg-gray-100 py-2 px-4 ring-1 ring-gray-200 text-gray-900 items-center justify-center overflow-hidden select-none dark:(ring-gray-800 text-gray-100)"
              :class="{
                'hover:bg-gray-200 dark:hover:bg-gray-700':
                  $fetchState.pending === false && $fetchState.error === null,
                'dark:bg-gray-800':
                  $fetchState.pending === true || getSelectedSong.spotify,
                'cursor-not-allowed bg-gray-200 dark:bg-gray-700':
                  $fetchState.pending === false &&
                  $fetchState.error === null &&
                  getSelectedSong.spotify === null,
              }"
              blank
            >
              <SkeletonLoader
                v-if="$fetchState.pending || $fetchState.error"
                class="bg-gray-200 h-6 w-2/3 dark:bg-gray-700"
              />

              <template v-else>
                <icon name="spotify" class="flex-shrink-0 h-6 w-6" />
                <span class="truncate">Spotify</span>
              </template>
            </SmartLink>
          </div>

          <div class="space-y-2">
            <div
              class="rounded flex bg-gray-100 w-full py-2 px-4 ring-1 ring-gray-200 items-center justify-between dark:(bg-gray-800 ring-gray-800)"
            >
              <span
                class="flex-shrink-0 text-gray-900 w-1/4 dark:text-gray-100"
              >
                Title
              </span>

              <SkeletonLoader
                v-if="$fetchState.pending || $fetchState.error"
                class="bg-gray-200 h-4 w-1/2 dark:bg-gray-700"
              />

              <span
                v-else
                class="text-gray-700 w-3/4 truncate dark:text-gray-300"
              >
                {{ getSelectedTitle }}
              </span>
            </div>

            <div
              class="rounded flex bg-gray-100 py-2 px-4 ring-1 ring-gray-200 items-center justify-between dark:(bg-gray-800 ring-gray-800)"
            >
              <span
                class="flex-shrink-0 text-gray-900 w-1/4 dark:text-gray-100"
              >
                Artist
              </span>

              <SkeletonLoader
                v-if="$fetchState.pending || $fetchState.error"
                class="bg-gray-200 h-4 w-1/3 dark:bg-gray-700"
              />

              <span
                v-else
                class="text-gray-700 w-3/4 truncate dark:text-gray-300"
              >
                {{ getSelectedSongMetadata.artist || "Unknown" }}
              </span>
            </div>

            <div
              class="rounded flex bg-gray-100 py-2 px-4 ring-1 ring-gray-200 items-center justify-between dark:(bg-gray-800 ring-gray-800)"
            >
              <span
                class="flex-shrink-0 text-gray-900 w-1/4 dark:text-gray-100"
              >
                Date
              </span>

              <SkeletonLoader
                v-if="$fetchState.pending || $fetchState.error"
                class="bg-gray-200 h-4 w-3/5 dark:bg-gray-700"
              />

              <span
                v-else
                class="text-gray-700 w-3/4 truncate dark:text-gray-300"
              >
                {{ getSelectedDateTitle }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="rounded bg-gray-100 h-52 p-2 ring-1 ring-gray-200 relative sm:h-auto dark:(bg-gray-800 ring-gray-800)"
        :class="{
          'hidden sm:flex items-center justify-center': !getLyrics,
        }"
      >
        <div
          v-if="$fetchState.pending === true"
          class="space-y-2 top-4 right-4 bottom-4 left-4 absolute overflow-y-auto scrollbar"
        >
          <div
            v-for="lyric in 20"
            :key="`lyric-skeleton-${lyric}`"
            class="rounded bg-gray-200 h-4 animate-pulse dark:bg-gray-700"
            :class="{
              'w-3/4': lyric % 1 === 0,
              'w-2/4': lyric % 2 === 0,
              'w-3/5': lyric % 3 === 0,
              'w-4/5': lyric % 4 === 0,
            }"
          />
        </div>

        <div
          v-else-if="getLyrics"
          class="space-y-2 top-4 right-4 bottom-4 left-4 absolute overflow-y-auto scrollbar"
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

          <p class="font-medium text-xs text-gray-600 dark:text-gray-400">
            Lyrics by
            <SmartLink
              href="https://api.ksoft.si/"
              class="hover:underline"
              blank
            >
              KSoft.Si
            </SmartLink>
          </p>
        </div>

        <div v-else>
          <h3 class="text-lg text-gray-900 dark:text-gray-100">No lyrics...</h3>
        </div>
      </div>
    </div>

    <div>
      <h3 class="font-semibold text-xl text-gray-900 dark:text-gray-100">
        Older Songs
      </h3>

      <div class="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        <template v-if="$fetchState.pending === true">
          <SkeletonLoader
            v-for="item in 9"
            :key="`skeleton-song-${item}`"
            type="song"
          />
        </template>

        <div
          v-else-if="$fetchState.error"
          class="text-gray-900 sm:col-span-2 md:col-span-3 dark:text-gray-100"
        >
          Something went wrong while fetching songs from Firebase.
        </div>

        <template v-else>
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
        </template>
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
      meta: this.$prepareMeta({
        title,
        description,
        image,
        keywords: "daily, song, recommendation",
        url: "https://eggsy.xyz/daily",
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
</style>
