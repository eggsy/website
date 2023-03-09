const intlFormatter = new Intl.DateTimeFormat("tr-TR", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export default function getReadableDate(date: Date): string {
  const today = new Date()
  const diff = Math.floor((today.getTime() - date.getTime()) / 86400000)

  if (diff === 0) return "Bugün"
  else if (diff === 1) return "Dün"
  else if (diff <= 30) return `${diff} gün önce`
  else if (diff >= 30 && diff <= 90) return `${Math.floor(diff / 30)} ay önce`
  else return intlFormatter.format(date)
}
