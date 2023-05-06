// 👨‍🏫 Your task
// In your project, when a user searches for a city (example: New York),
// it should display the name of the city on the result page and the current temperature of the city.

// Please note: there's no need to include a temperature conversion at the moment.
// This will be taught later on in the course.

// 🙀 Bonus point:
// Add a Current Location button.
// When clicking on it, it uses the Geolocation API to get your GPS coordinates and
// display and the city and current temperature using the OpenWeather API.

updateCurrentDayTime();
let linkCelsius = document.querySelector("#link-celsius");
let linkFahrenheit = document.querySelector("#link-Fahrenheit");
linkCelsius.addEventListener("click", changeTempUnit);
linkFahrenheit.addEventListener("click", changeTempUnit);

// task

let formSearchCity = document.querySelector("#search-city-form");
formSearchCity.addEventListener("submit", searchCityTemperature);

function searchCityTemperature(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  let cityName = inputCity.value;
  let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
  let endpointUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(endpointUrl).then(showCityTemperature).catch(showErrorCity);
  inputCity.value = "";
  updateCurrentDayTime();
}
function showErrorCity(request) {
  alert("Please enter a valid city name");
}
function showCityTemperature(request) {
  console.log(request.data);
  let spanTemperature = document.querySelector(".temperature");
  spanTemperature.innerHTML = Math.round(request.data.main.temp);
  let h1CityName = document.querySelector("#city-header");
  h1CityName.innerHTML = request.data.name;
  let description = request.data.weather[0].description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  let liDescription = document.querySelector("#descrition");
  liDescription.innerHTML = description;
  let icon = request.data.weather[0].icon;
  let divImg = document.querySelector("#weather-icon");
  divImg.innerHTML = `<img
                  src="https://openweathermap.org/img/wn/${icon}.png"
                  alt=${description}
                  class="weather-icon float-left"
                />`;
  let spanHumidity = document.querySelector("#humidity");
  spanHumidity.innerHTML = request.data.main.humidity;
  let spanWindSpeed = document.querySelector("#wind-speed");
  spanWindSpeed.innerHTML = request.data.wind.speed;
  let spanPressure = document.querySelector("#pressure");
  spanPressure.innerHTML = request.data.main.pressure;
}

// Bonus

function currentTemperature() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
function handlePosition(position) {
  let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let endpointUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&&units=metric&appid=${apiKey}`;
  axios.get(endpointUrl).then(showCityTemperature);
}
currentTemperature();
let buttonCurrentTemp = document.querySelector("#btn-current-temp");
buttonCurrentTemp.addEventListener("click", currentTemperature);

//previous homework
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  let minutes = now.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let hours = now.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function updateCurrentDayTime() {
  let liCurrentDayTime = document.querySelector("#current-day-time");
  liCurrentDayTime.innerHTML = formatDate();
}

function changeTempUnit(event) {
  event.preventDefault();
  let spanTemperature = document.querySelector(".temperature");
  let temperature = Number(spanTemperature.innerHTML);
  let linkCelsius = document.querySelector("#link-celsius");
  let linkFahrenheit = document.querySelector("#link-Fahrenheit");
  let idValue = event.target.id;
  if (idValue === "link-Fahrenheit") {
    spanTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
  } else {
    spanTemperature.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  }
  linkCelsius.classList.toggle("chosen-temperature");
  linkFahrenheit.classList.toggle("chosen-temperature");
}
