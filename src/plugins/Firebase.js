export default ({ $fire }, inject) => {
  /* Get daily song from Firebase */
  async function getDaily() {
    const date = {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }

    Object.keys(date).forEach((key) => {
      if (key !== "year" && String(date[key]).length < 2)
        date[key] = `0${date[key]}`
    })

    const document = $fire.firestore
      .collection("dailySongs")
      .doc(`${date.day}.${date.month}.${date.year}`)

    const data = (await document.get()).data()
    return data?.url || "ZY3J3Y_OU0w"
  }

  async function getNews() {
    const document = $fire.firestore.collection("news").doc("latest")
    const data = (await document.get()).data()

    return data
  }

  inject("getDaily", getDaily)
  inject("getNews", getNews)
}
