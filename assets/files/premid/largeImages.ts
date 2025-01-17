const general = [
  { name: "Extreme Thinking", url: "https://i.imgur.com/IJbthB1.png" },
  { name: "Angry Stickman", url: "https://i.imgur.com/90lDk9T.png" },
  { name: "Read The Docs", url: "https://i.imgur.com/PvrqhRJ.png" },
  { name: "Please Stop", url: "https://i.imgur.com/qgCcDu7.png" },
  { name: "Brilliance", url: "https://i.imgur.com/skclu5h.png" },
  { name: "Pepe Sweat", url: "https://i.imgur.com/j4ip0Dx.png" },
  { name: "Panda Cry", url: "https://i.imgur.com/NFCmYsM.png" },
  { name: "Thinking", url: "https://i.imgur.com/mzlKBw3.png" },
  { name: "Spongery", url: "https://i.imgur.com/VfhmSfN.png" },
  { name: "Balance", url: "https://i.imgur.com/v0jG4vt.png" },
  { name: "Bravery", url: "https://i.imgur.com/etvIz6E.png" },
  { name: "Playing", url: "https://i.imgur.com/UHgwoyQ.png" },
  { name: "Reading", url: "https://i.imgur.com/tbSYfJV.png" },
  { name: "Popcorn", url: "https://i.imgur.com/dQ4EOWV.png" },
  { name: "Windows", url: "https://i.imgur.com/YkOU4HD.png" },
  { name: "Mobile", url: "https://i.imgur.com/BhBThRQ.png" },
  { name: "Paused", url: "https://i.imgur.com/TYvgF3M.png" },
  { name: "Search", url: "https://i.imgur.com/hnDIQO1.png" },
  { name: "Please", url: "https://i.imgur.com/Zp835mC.png" },
  { name: "Sadcat", url: "https://i.imgur.com/IaSeSJk.png" },
  { name: "Coffee", url: "https://i.imgur.com/W5NIvJF.png" },
  { name: "Doubt", url: "https://i.imgur.com/kYKE2rI.png" },
  { name: "Relax", url: "https://i.imgur.com/BaOQ4I8.png" },
  { name: "Smart", url: "https://i.imgur.com/vKhMs2R.png" },
  { name: "Heart", url: "https://i.imgur.com/jtt9fjf.png" },
  { name: "Shrug", url: "https://i.imgur.com/UnzU96q.png" },
  { name: "Mmlol", url: "https://i.imgur.com/5t2q2eu.png" },
  { name: "Linux", url: "https://i.imgur.com/bN5rmiU.png" },
  { name: "Live", url: "https://i.imgur.com/qphbAuR.png" },
  { name: "Cool", url: "https://i.imgur.com/AdUBBHa.png" },
  { name: "Eyes", url: "https://i.imgur.com/lIa90i4.png" },
  { name: "Ohno", url: "https://i.imgur.com/7EkHsMr.png" },
  { name: "Tada", url: "https://i.imgur.com/nO8fd9v.png" },
  { name: "ESL", url: "https://i.imgur.com/F51eSEx.png" },
]

const brand = [
  { name: "Facebook", url: "https://i.imgur.com/5Aab3v6.png" },
  { name: "Instagram", url: "https://i.imgur.com/1c5yuiD.png" },
  { name: "YouTube", url: "https://i.imgur.com/0Bvl6BU.png" },
  { name: "YouTube Dark", url: "https://i.imgur.com/mQQO1nv.jpg" },
  { name: "Netflix", url: "https://i.imgur.com/DkZQvkC.png" },
  { name: "Twitter", url: "https://i.imgur.com/AtV70mE.png" },
  { name: "Twitch", url: "https://i.imgur.com/bmIsItf.png" },
  { name: "Discord", url: "https://i.imgur.com/P6fs8jR.png" },
  { name: "Discord Templates", url: "https://i.imgur.com/zqdRKw4.png" },
]

/* Exports */
export default [
  {
    name: "General",
    items: general,
  },
  {
    name: "Brand",
    items: brand,
  },
]

export interface Type {
  name: string
  items: {
    name: string
    url: string
  }[]
}
