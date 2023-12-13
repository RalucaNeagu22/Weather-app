const apiKey = "e20972e0c320968ab02cc123bf6254ea";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=";
const defaultCity = "Iasi";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

setWeatherData(defaultCity);

async function setWeatherData(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  computeWeatherData(data);
}

function computeWeatherData(data) {
  let firstElemIndex = getIndexOfFirstElement(data.list);

  let dayCount = 1;
  for (let i = firstElemIndex; i < data.cnt; i += 8) {
    if (dayCount > 5) return;

    const day = data.list.slice(
      firstElemIndex + 8 * (dayCount - 1),
      firstElemIndex + 8 * dayCount
    );

    const minDay = getMin(day);
    const maxDay = getMax(day);
    console.log(day[0].dt_txt);
    updateWeather(minDay, maxDay, dayCount + 1, new Date(day[0].dt_txt));

    dayCount += 1;
  }
}

function updateWeather(min, max, dayCount, date) {
  //update text

  document.querySelector(".day" + dayCount).innerHTML = getDayName(date);

  document.querySelector(".temp-max" + dayCount).innerHTML =
    "Max: " + Math.round(max) + "°C";
  document.querySelector(".temp-min" + dayCount).innerHTML =
    "Min: " + Math.round(min) + "°C";
}

function getDayName(date) {
  return date.toLocaleDateString(Navigator.language, { weekday: "long" });
}

function getIndexOfFirstElement(data) {
  for (let i = 0; i < data.length; i++) {
    if (dateIsNotToday(data[i].dt_txt)) {
      return i;
    }
  }
}

function dateIsNotToday(date) {
  const currentDate = new Date().toLocaleDateString();
  const dataDate = new Date(date.split(" ")).toLocaleDateString();

  return currentDate != dataDate;
}

function getMin(day) {
  let min = day[0].main.temp;

  for (let i = 0; i < day.length; i++) {
    if (day[i].main.temp < min) {
      min = day[i].main.temp;
    }
  }

  return min;
}

function getMax(day) {
  let max = day[0].main.temp;

  for (let i = 0; i < day.length; i++) {
    if (day[i].main.temp > max) {
      max = day[i].main.temp;
    }
  }

  return max;
}

//event click
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  setWeatherData(searchBox.value);
});

//event enter
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    setWeatherData(searchBox.value);
  }
});
