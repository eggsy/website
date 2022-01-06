import { Handler } from "@netlify/functions"
import LastFMTyped from "lastfm-typed"

// Can also be set through Netlify environment variables
const LASTFM_API_KEY = process.env.LASTFM_API_KEY
const username = "eggsywashere"

const handler: Handler = async (event) => {
  if (!LASTFM_API_KEY)
    return {
      statusCode: 401,
    }

  try {
    const lastFm = new LastFMTyped(LASTFM_API_KEY)

    const [info, topTracks, recentTracks] = [
      await lastFm.user.getInfo(username),
      await lastFm.user.getTopTracks(username, { limit: 6 }),
      await lastFm.user.getRecentTracks(username, {
        limit: 15,
      }),
    ]

    // Origin for CORS
    const origin = event.rawUrl.includes("localhost")
      ? "http://localhost:3000"
      : "https://eggsy.xyz"

    // Map track function
    const mapTrack = (track: any) => {
      const artist =
        typeof track.artist === "string" ? track.artist : track.artist.name

      const object: any = {
        artist,
        name: track.name,
        image: track.image.find((image: any) => image.size === "large")?.url,
        url: track.url,
        date: track.date?.uts,
        nowPlaying: track.nowplaying,
      }

      track.playcount ? (object.plays = track.playcount) : null

      return object
    }

    // Formatted user info
    const formattedUserInfo = {
      name: info.name,
      image: info.image.find((image) => image.size === "large")?.url || "",
      url: info.url,
      totalPlays: info.playcount,
      registered: info.registered,
    }

    // Return
    return {
      statusCode: 200,
      error: false,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({
        user: formattedUserInfo,
        recentTracks: recentTracks?.tracks?.map(mapTrack) || [],
        topTracks: topTracks?.tracks?.map(mapTrack) || [],
      }),
    }
  } catch (error: any) {
    console.log(error)

    return {
      error: true,
      statusCode: error.statusCode || 500,
      message: error.message,
    }
  }
}

export { handler }
