let date = document.querySelector("#current-date");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let today = days[currentTime.getDay()];
date.innerHTML = `${today} ${hours}:${minutes}`;

function displayTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}ºC`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}

function getTemperature(city) {
  let apiKey = "80e7ba6798488f106421a77495d3b6c4";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80e7ba6798488f106421a77495d3b6c4&&units=metric`;

  axios.get(apiURL).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  getTemperature(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
getTemperature("Paris");

function searchLocation(position) {
  let apiKey = "80e7ba6798488f106421a77495d3b6c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", displayCurrentLocation);
