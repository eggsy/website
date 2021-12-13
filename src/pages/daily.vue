<script lang="ts">
import Vue from "vue"

/* Import types */
import type { Song, SongMetadata } from "../plugins/Firebase"

export default Vue.extend({
  data() {
    const selected: Song = {
      date: null,
      url: null,
      spotifyUrl: null,
      metadata: {
        title: null,
        artist: null,
        thumbnail: null,
      },
    }

    return {
      iframeLoaded: false,
      today: new Date(),
      selected,
      songs: [] as Song[],
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
      "Looking for someone else's song recommendations? Here it is! I built a system just for you: Fresh, new songs every day!"
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
     */
    getSelectedSong(): { youtube: string; spotify: string | null } {
      const { url, spotifyUrl } = this.selected

      return {
        youtube: url || "ZY3J3Y_OU0w",
        spotify: spotifyUrl || null,
      }
    },
    /**
     * Returns the metadata of the selected song.
     */
    getSelectedSongMetadata(): SongMetadata {
      return this.selected?.metadata
    },
    /**
     * Return boolean if there's no selected song for today.
     */
    isThereNoSongToday(): boolean {
      if (!this.songs?.[0]?.date) return false;

      const today = this.$moment_tz().tz("Europe/Istanbul").format("DD/MM/YYYY")
      const latestSongDate = this.$moment(this.songs[0]?.date)
        .format("DD/MM/YYYY")

      if (today !== latestSongDate) return true
      else return false
    },
    /**
     * Returns the selected song's title.
     */
    getSelectedTitle(): string {
      return this.selected?.metadata?.title || "Unknown"
    },
    /**
     * Returns the selected song's date in locale format.
     */
    getSelectedDateTitle(): string {
      return (
        this.$moment(this.selected?.date).format("DD/MM/YYYY") ||
        "Unknown"
      )
    },
    /**
     * Returns the array of the songs without the currently selected one in it.
     */
    getSongList(): Song[] {
      return this.songs.filter((song: Song) => song.date !== this.selected.date)
    },
  },
})
</script>

<template>
  <div class="space-y-6 py-4">
    <BlogNotification v-if="isThereNoSongToday === true" type="warning">
      <p>
        There's no song for today, check back later or wait for the next day until
        I find some time to add new songs! You can listen to the older ones if you
        wish to!
      </p>
    </BlogNotification>

    <div class="space-y-6 gap-6 grid-cols-2 md:space-y-0 md:grid">
      <div class="space-y-4">
        <SkeletonLoader
          type="iframe"
          :iframe-url="
            $fetchState.pending === false &&
            `https://www.youtube.com/embed/${getSelectedSong.youtube}`
          "
          class="h-[30vh] w-full md:h-full"
        />
      </div>

      <div class="space-y-2 w-full">
        <div class="rounded-md bg-gray-200/40 p-4 truncate dark:bg-neutral-800">
          <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">Title</h3>

          <SkeletonLoader
            v-if="$fetchState.pending || $fetchState.error"
            class="bg-gray-300 h-6 w-2/4 dark:bg-neutral-700"
          />

          <span v-else class="text-gray-700 truncate dark:text-gray-300">{{ getSelectedTitle }}</span>
        </div>

        <div class="rounded-md bg-gray-200/40 p-4 truncate dark:bg-neutral-800">
          <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">Artist</h3>

          <SkeletonLoader
            v-if="$fetchState.pending || $fetchState.error"
            class="bg-gray-300 h-6 w-1/4 dark:bg-neutral-700"
          />

          <span
            v-else
            class="text-gray-700 truncate dark:text-gray-300"
          >{{ getSelectedSongMetadata.artist || "Unknown" }}</span>
        </div>

        <div class="rounded-md bg-gray-200/40 p-4 truncate dark:bg-neutral-800">
          <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">Date</h3>

          <SkeletonLoader
            v-if="$fetchState.pending || $fetchState.error"
            class="bg-gray-300 h-6 w-2/4 dark:bg-neutral-700"
          />

          <span v-else class="text-gray-700 truncate dark:text-gray-300">{{ getSelectedDateTitle }}</span>
        </div>
      </div>
    </div>

    <div>
      <h3 class="font-semibold text-xl text-gray-900 dark:text-gray-100">Older Songs</h3>

      <div class="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        <template v-if="$fetchState.pending === true">
          <SkeletonLoader v-for="item in 9" :key="`skeleton-song-${item}`" type="song" />
        </template>

        <div
          v-else-if="$fetchState.error"
          class="text-gray-900 sm:col-span-2 md:col-span-3 dark:text-gray-100"
        >Something went wrong while fetching songs from Firebase.</div>

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

<style lang="scss" scoped>
.ring {
  @apply ring-2 ring-opacity-75 ring-gray-300 dark:ring-transparent;
}
</style>
