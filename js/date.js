function getTodayDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayOfWeek = days[today.getDay()];

  return `${month}.${date} ${dayOfWeek}`;
}

const dateSpan = document.querySelector("#date");
dateSpan.textContent = getTodayDate();
