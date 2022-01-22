import type { Plugin } from "@nuxt/types"
import type { Timestamp } from "firebase/firestore"

/* Interfaces */
export interface SongMetadata {
  artist?: string | null
  thumbnail?: string | null
  title?: string | null
}

export interface Song {
  date: any
  url: string | null
  spotifyUrl?: string | null
  metadata: SongMetadata
}

/* Declare modules */

/* Plugin */
const Firebase: Plugin = ({ $fire, $getTurkeyTime }, inject) => {
  /**
   * Fetch the daily song from Firebase.
   * @param {number} [limit=1] The limit of the values to return. If none present, will return one URL in string format.
   * @returns {string|any[]} Either array of the songs or the URL of a song if no limit is given.
   */
  async function getDaily(limit: number = 1): Promise<Song | Song[]> {
    const ref = $fire.firestore.collection("dailySongs")

    const docs: Song[] = []

    await ref
      .where("date", "<=", $getTurkeyTime())
      .orderBy("date", "desc")
      .limit(limit)
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const {
            date: sDate,
            url,
            metadata,
            spotifyUrl,
          } = snapshot.data() as Song

          docs.push({
            date: (sDate as Timestamp).toDate(),
            url,
            metadata,
            spotifyUrl,
          })
        })
      })

    if (docs.length === 1) return docs[0]
    else if (docs.length > 1) return docs
    else return []
  }

  inject("getDaily", getDaily)
}

export default Firebase
