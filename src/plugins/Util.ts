import { Plugin } from "@nuxt/types"

/* Import plugins */
import getReadableDate from "./Utils/getReadableDate"
import getReadingTime from "./Utils/getReadingTime"
import prepareMeta from "./Utils/prepareMeta"

/* Import plugin types */
import { PrepareMetaProps } from "./Utils/prepareMeta"
import { Meta } from "./Utils/prepareMeta"

/* Declare modules */
declare module "vue/types/vue" {
  interface Vue {
    $getReadableDate(date: Date): string
    $getReadingTime(words: string, wpm?: number): string
    $prepareMeta(
      { title, description, url, image, keywords }: PrepareMetaProps,
      rest?: any[]
    ): Meta[]
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $getReadableDate(date: Date): string
    $getReadingTime(words: string, wpm?: number): string
    $prepareMeta(
      { title, description, url, image, keywords }: PrepareMetaProps,
      rest?: any[]
    ): Meta[]
  }

  interface Context {
    $getReadableDate(date: Date): string
    $getReadingTime(words: string, wpm?: number): string
    $prepareMeta(
      { title, description, url, image, keywords }: PrepareMetaProps,
      rest?: any[]
    ): Meta[]
  }
}

/* Export and inject plugin */
const Util: Plugin = ({}, inject) => {
  inject("getReadableDate", getReadableDate)
  inject("getReadingTime", getReadingTime)
  inject("prepareMeta", prepareMeta)
}

export default Util
