<script setup lang="ts">
interface LastFmUser {
  name: string
  registered: number
  totalPlays: number
  image: string
  url: string
}

interface LastFmSong {
  name: string
  artist: string
  image: string
  url: string
  date: number
  plays?: number
  nowPlaying: boolean
}

interface LastFmArtist {
  name: string
  plays: number
  image: string
  url: string
}

interface LastFmResponse {
  user: LastFmUser
  topTracks: LastFmSong[]
  recentTracks: LastFmSong[]
  topArtists: LastFmArtist[]
}

const { $prepareMeta } = useNuxtApp()

const {
  data: lastFm,
  status,
  error,
} = await useLazyAsyncData<LastFmResponse>(
  "lastfm",
  () =>
    $fetch("/api/lastfm", {
      responseType: "json",
    }),
  {
    server: false,
  },
)

useHead({
  title: "Songs",
  meta: $prepareMeta({
    title: "Songs",
    description:
      "Songs that I recently listened and the songs that I listened most.",
  }),
})
</script>

<template>
  <PageLayout
    title="Songs"
    description="My latest listening activity on Last FM."
    class="space-y-12"
  >
    <LoadersSongs v-if="status === 'pending' || error !== null" />

    <template v-else-if="lastFm">
      <section>
        <PageTitle class="mb-4">Details</PageTitle>

        <div class="grid gap-y-4 gap-x-12 md:grid-cols-2">
          <!-- Profile -->
          <div class="flex space-x-4 items-center justify-between">
            <span>Profile</span>

            <div class="flex space-x-2 items-center">
              <SmartLink
                :href="`https://last.fm/user/${lastFm.user.name}`"
                class="flex-shrink-0"
                blank
                >@{{ lastFm.user.name }}</SmartLink
              >

              <SmartImage
                :src="lastFm.user.image"
                class="rounded-full h-6 w-6"
              />
            </div>
          </div>

          <!-- Play count -->
          <div class="flex space-x-4 items-center justify-between">
            <span class="flex-shrink-0">Total Plays</span>

            <div class="flex space-x-2 items-center">
              <div class="truncate">{{ lastFm.user.totalPlays }}</div>
              <Icon
                name="heroicons:fire"
                class="h-6 text-red-700 w-6 dark:text-current"
              />
            </div>
          </div>

          <!-- Registered -->
          <div class="flex space-x-4 items-center justify-between">
            <span class="flex-shrink-0">Account Age</span>

            <div class="flex space-x-2 items-center">
              <div class="truncate">
                {{
                  new Date().getFullYear() -
                  new Date(lastFm.user.registered * 1000).getFullYear()
                }}

                year(s)
              </div>

              <Icon name="heroicons:calendar" class="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      <section id="top-songs">
        <PageTitle class="mb-4">Top Songs (last 7 days)</PageTitle>

        <div class="grid gap-x-4 gap-y-2 md:grid-cols-2">
          <CardLastFm
            v-for="song of lastFm.topTracks"
            :key="song.name"
            :name="song.name"
            :artist="song.artist"
            :now-playing="song.nowPlaying"
            :plays="song.plays"
            :url="song.url"
          />
        </div>
      </section>

      <section id="top-artists">
        <PageTitle class="mb-4">Top Artists (last 7 days)</PageTitle>

        <div class="grid gap-x-4 gap-y-2 md:grid-cols-2">
          <CardLastFm
            v-for="artist of lastFm.topArtists"
            :key="artist.name"
            :name="artist.name"
            :plays="artist.plays"
            :url="artist.url"
          />
        </div>
      </section>

      <section id="recent">
        <PageTitle class="mb-4">Recent Songs</PageTitle>

        <div class="grid gap-x-4 gap-y-2 md:grid-cols-2">
          <CardLastFm
            v-for="song of lastFm.recentTracks"
            :key="song.name"
            :name="song.name"
            :artist="song.artist"
            :image="song.image"
            :now-playing="song.nowPlaying"
            :url="song.url"
          />
        </div>
      </section>
    </template>
  </PageLayout>
</template>
