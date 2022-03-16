function updateDateTime() {
  let now = new Date();
  let dateTime = document.querySelector("h2");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[now.getMonth()];

  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  dateTime.innerHTML = `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;
}

updateDateTime();

function setTemperature(temperature, units, city) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(temperature)}`;

  let currentUnits = document.querySelector("span.units");
  currentUnits.innerHTML = `${units}`;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city}`;
}

function handleWeather(response) {
  let temperature = response.data.main.temp;
  let city = response.data.name;
  let units = "°F";

  setTemperature(temperature, units, city);
}

function getWeatherCityInput(city) {
  let apiKey = "71e82cb7acd47b60b16fae0fd4740ffd";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(handleWeather);
}

function handleCityInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  getWeatherCityInput(cityInput.value);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleCityInput);

function getWeatherLatLon(lat, lon) {
  let apiKey = "71e82cb7acd47b60b16fae0fd4740ffd";
  let url = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(handleWeather);
}

function handleLocation(position) {
  let latObtained = position.coords.latitude;
  let longObtained = position.coords.longitude;
  getWeatherLatLon(latObtained, longObtained);
}

function handleUseCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", handleUseCurrentLocation);
