import moment from "moment"

/**
 * Returns the date as a readable string.
 * @param {Date} date The target date to compare.
 * @returns {string} Today, yesterday, x day before, x months before or DD/MM/YYYY.
 */
export default function getReadableDate(date: Date): string {
  const now = moment()
  const createdAt = moment(date)
  const diff = now.diff(createdAt, "days")

  if (diff === 0) return "Bugün"
  else if (diff === 1) return "Dün"
  else if (diff <= 30) return `${diff} gün önce`
  else if (diff >= 30 && diff <= 90) return `${Math.floor(diff / 30)} ay önce`
  else return createdAt.format("DD/MM/YYYY")
}
