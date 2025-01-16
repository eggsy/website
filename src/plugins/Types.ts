/* Import plugin types */
import type { PrepareMetaProps, Meta } from "./Utils/prepareMeta"

/* Declare modules */
declare module "vue/types/vue" {
  interface Vue {
    $getReadableDate(date: Date): string
    $getReadingTime(words: string, wpm?: number): string
    $prepareMeta(
      { title, description, url, image, keywords }: PrepareMetaProps,
      rest?: any[]
    ): Meta[]
    $applyMediumZoom(selector?: string): void
  }
}

declare module "@nuxt/types" {
  interface Context {
    $getReadableDate(date: Date): string
    $getReadingTime(words: string, wpm?: number): string
    $prepareMeta(
      { title, description, url, image, keywords }: PrepareMetaProps,
      rest?: any[]
    ): Meta[]
    $applyMediumZoom(selector: string): void
  }
}
