import type { ApiResponse, Artist, Track, User } from "~/types/Response/lastfm"
import type { Config, Handler } from "@netlify/functions"

const LASTFM_API_KEY = process.env.LASTFM_API_KEY
const username = "eggsywashere"

const api = <T>(
  method: string,
  searchParams?: Record<string, string | number>,
) =>
  fetch(
    `http://ws.audioscrobbler.com/2.0/?method=${method}&user=${username}&api_key=${LASTFM_API_KEY}&format=json${
      searchParams
        ? `&${new URLSearchParams(JSON.parse(JSON.stringify(searchParams))).toString()}`
        : ""
    }`,
  ).then((res) => res.json() as T)

// Map track function
const mapTrack = (track: Track) => {
  const artist =
    typeof track.artist === "string"
      ? track.artist
      : (track.artist.name ?? track.artist["#text"])

  const object: any = {
    artist,
    name: track.name,
    image: track.image.find((image: any) => image.size === "large")?.["#text"],
    url: track.url,
    nowPlaying: track["@attr"]?.nowplaying === "true",
  }

  if (track.playcount) object.plays = parseInt(track.playcount)

  return object
}

// Map artist function
const mapArtist = (artist: Artist) => {
  const object: any = {
    name: artist.name,
    url: artist.url,
  }

  if (artist.playcount) object.plays = parseInt(artist.playcount)

  return object
}

export const handler: Handler = async () => {
  if (!LASTFM_API_KEY)
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "API key not found" }),
    }

  try {
    const [
      { user },
      { toptracks: topTracks },
      { topartists: topArtists },
      { recenttracks: recentTracks },
    ] = [
      await api<{ user: User }>("user.getinfo"),
      await api<ApiResponse<"toptracks", "track", Track[]>>(
        "user.gettoptracks",
        {
          limit: 6,
          period: "7day",
        },
      ),
      await api<ApiResponse<"topartists", "artist", Artist[]>>(
        "user.gettopartists",
        {
          limit: 4,
          period: "7day",
        },
      ),
      await api<ApiResponse<"recenttracks", "track", Track[]>>(
        "user.getrecenttracks",
        {
          limit: 15,
        },
      ),
    ]

    // Formatted user info
    const formattedUserInfo = {
      name: user.name,
      image: user.image.find((image) => image.size === "large")?.["#text"],
      url: user.url,
      totalPlays: parseInt(user.playcount),
      registered: parseInt(user.registered.unixtime),
    }

    // Return
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: formattedUserInfo,
        recentTracks: recentTracks?.track?.map(mapTrack) || [],
        topTracks: topTracks?.track?.map(mapTrack) || [],
        topArtists: topArtists?.artist?.map(mapArtist) || [],
      }),
    }
  } catch (error: any) {
    console.log(error)

    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: true,
        message: error.message,
      }),
    }
  }
}

export const config: Config = {
  path: "/api/lastfm",
}
