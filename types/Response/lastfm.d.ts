export interface Image {
  size: string
  "#text": string
}

export interface Track {
  name: string
  artist: string | { name: string; "#text": string }
  url: string
  image: Image[]
  playcount: string
  "@attr": Record<string, any>
}

export interface Artist {
  name: string
  url: string
  playcount: string
}

export interface TopTrack {
  track: Track[]
}

export interface User {
  name: string
  url: string
  image: Image[]
  playcount: string
  country: string
  gender: string
  registered: { unixtime: string; "#text": number }
}

export type ApiResponse<T, V, B> = Record<T, Record<V, B>>
