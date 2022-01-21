/* Import plugin types */
import type { MomentTimezone } from "moment-timezone"
import type { PrepareMetaProps, Meta } from "./Utils/prepareMeta"
import type { Song } from "./Firebase"

/* Declare modules */
declare module "vue/types/vue" {
  interface Vue {
    $getDaily(limit: number): Promise<Song[]>
    $getReadableDate(date: Date): string
    $getReadingTime(words: string, wpm?: number): string
    $prepareMeta(
      { title, description, url, image, keywords }: PrepareMetaProps,
      rest?: any[]
    ): Meta[]
    $momentTz: MomentTimezone
    $getTurkeyTime(): Date
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $getDaily(limit: number): Promise<Song[]>
    $getReadableDate(date: Date): string
    $getReadingTime(words: string, wpm?: number): string
    $prepareMeta(
      { title, description, url, image, keywords }: PrepareMetaProps,
      rest?: any[]
    ): Meta[]
    $momentTz: MomentTimezone
    $getTurkeyTime(): Date
  }

  interface Context {
    $getDaily(limit: number): Promise<Song[]>
    $getReadableDate(date: Date): string
    $getReadingTime(words: string, wpm?: number): string
    $prepareMeta(
      { title, description, url, image, keywords }: PrepareMetaProps,
      rest?: any[]
    ): Meta[]
    $momentTz: MomentTimezone
    $getTurkeyTime(): Date
  }
}
