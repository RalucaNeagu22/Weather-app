document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "e20972e0c320968ab02cc123bf6254ea";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  //constante eveniment click/enter
  const searchBox = document.querySelector(".search input");
  const searchButton = document.querySelector(".search button");

  async function fetchWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
    } else {
      data = await response.json();
      updateWeather(data);
    }
  }

  function updateWeather(data) {
    //update text
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".max-temp").innerHTML =
      Math.round(data.main.temp_max) + "°C";
    document.querySelector(".min-temp").innerHTML =
      Math.round(data.main.temp_min) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    //update images
    const weatherIcon = document.querySelector(".weather-icon");
    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
      case "Clear":
        weatherIcon.src = "images/sun.png";
        break;
    }

    errorElement.style.display = "none"; //stergem eroare
  }

  //event click
  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    fetchWeather(searchBox.value);
  });

  //event enter
  searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchWeather(searchBox.value);
    }
  });
});
