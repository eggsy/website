/**
 * Calculates the words and returns the potential maximum reading time.
 * @param {String} words Words to calculate.
 * @param {Number} [wpm=200] Words per minute, defaults to 200.
 * @returns {string} Reading time in minutes.
 */
export default function getReadingTime(
  words: string,
  wpm: number = 200
): string {
  const splitted = words?.split(" ").length || 0
  return Math.ceil(splitted / wpm).toFixed()
}
