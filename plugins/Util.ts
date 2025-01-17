import applyMediumZoom from "./Utils/applyMediumZoom"
import getReadableDate from "./Utils/getReadableDate"
import getReadingTime from "./Utils/getReadingTime"
import prepareMeta from "./Utils/prepareMeta"

export default defineNuxtPlugin(() => {
  return {
    provide: {
      applyMediumZoom,
      getReadableDate,
      getReadingTime,
      prepareMeta,
    },
  }
})
