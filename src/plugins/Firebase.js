export default ({ $fire }, inject) => {
  /**
   * Fetch the daily song from Firebase.
   * @param {number} [limit=1] The limit of the values to return. If none present, will return one URL in string format.
   * @returns {string|array} Either array of the songs or the URL of a song if no limit is given.
   */
  async function getDaily(limit = 1) {
    const ref = $fire.firestore.collection("dailySongs")

    const docs = []
    await ref
      .where("date", "<=", new Date())
      .orderBy("date", "desc")
      .limit(limit)
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const { date, url, metadata, spotifyUrl } = snapshot.data()
          docs.push({ date: date.toDate(), url, metadata, spotifyUrl })
        })
      })

    if (docs.length === 1) return docs[0]
    else if (docs.length > 1) return docs
    else return "ZY3J3Y_OU0w"
  }

  /**
   * Function that returns news from Firebase.
   * @returns {object} The news object.
   */
  async function getNews() {
    const document = $fire.firestore.collection("news").doc("latest")
    const data = (await document.get()).data()

    return data
  }

  inject("getDaily", getDaily)
  inject("getNews", getNews)
}
