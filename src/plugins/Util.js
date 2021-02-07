export default ({ $moment }, inject) => {
  /**
   * Returns the date as a readable string.
   * @param {Date} date The target date to compare.
   * @returns {string} Today, yesterday, x day before, x months before or DD/MM/YYYY.
   */
  function getReadableDate(date) {
    const now = $moment()
    const createdAt = $moment(date)
    const diff = now.diff(createdAt, "days")

    if (diff === 0) return "Bugün"
    else if (diff === 1) return "Dün"
    else if (diff <= 30) return `${diff} gün önce`
    else if (diff >= 30 && diff <= 90) return `${Math.floor(diff / 30)} ay önce`
    else return createdAt.format("DD/MM/YYYY")
  }

  /**
   * Calculates the words and returns the potential maximum reading time.
   * @param {Date} words Words to calculate.
   * @param {Number} [wpm=200] Words per minute, defaults to 200.
   * @returns {number|string} Reading time in minutes.
   */
  function getReadingTime(words, wpm = 200) {
    const splitted = words?.split(" ").length || 0
    return Math.ceil(splitted / wpm).toFixed()
  }

  inject("getReadableDate", getReadableDate)
  inject("getReadingTime", getReadingTime)
}
