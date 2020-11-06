import moment from "moment";

function getFormattedDate(pureDate) {
  const date = moment(pureDate),
    now = moment(),
    diffMn = now.diff(date, "minutes"),
    diffHr = now.diff(date, "hours"),
    diffDy = now.diff(date, "days");

  let timeString;

  if (diffHr <= 0 && diffMn == 0) timeString = `Fırından yeni çıktı!`;
  else if (diffMn < 60 && diffMn > 0) timeString = `${diffMn} dakika önce`;
  else if (diffHr < 24 && diffHr > 0) timeString = `${diffHr} saat önce`;
  else if (diffHr <= 48 && diffHr > 24) timeString = "Dün";
  else if (diffDy > 0 && diffDy < 30) timeString = `${diffDy} gün önce`;
  else timeString = `${date.format("DD/MM/YY HH:mm:SS")}`;

  return timeString;
}

export default (context, inject) => {
  inject("presenceAdded", () => false);
  inject("getFormattedDate", getFormattedDate);

  if (process.client) {
    const presenceAdded = () =>
      document.querySelector("#__nuxt").classList.contains("presence");

    inject("presenceAdded", presenceAdded);
  }
};
