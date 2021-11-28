/* Import plugin types */
import type { PrepareMetaProps } from "./Utils/prepareMeta"
import type { Meta } from "./Utils/prepareMeta"
import type { Song } from "./Firebase"
import type { MomentTimezone } from "moment-timezone"

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
    $moment_tz: MomentTimezone
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
    $moment_tz: MomentTimezone
  }

  interface Context {
    $getDaily(limit: number): Promise<Song[]>
    $getReadableDate(date: Date): string
    $getReadingTime(words: string, wpm?: number): string
    $prepareMeta(
      { title, description, url, image, keywords }: PrepareMetaProps,
      rest?: any[]
    ): Meta[]
    $moment_tz: MomentTimezone
  }
}
