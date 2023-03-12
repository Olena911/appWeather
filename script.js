// JavaScript source code
let now = new Date();
let localDate = document.querySelector("#date");
let date = now.getDate();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[now.getDay()];
let year = now.getFullYear();
localDate.innerHTML = `${date}, ${day} ${year}`;

let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let time = document.querySelector("#current-time");
time.innerHTML = `Local time ${hours}:${minutes}`;
//time.innerHTML = formatDate(response.data.dt * 1000);

function showTemp(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#number").innerHTML = Math.round(response.data.main.temp
    );
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity} %`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let high = document.querySelector("#high");
    high.innerHTML = Math.round(response.data.main.temp_max);
    let low = document.querySelector("#low");
    low.innerHTML = Math.round(response.data.main.temp_min);
    let iconElement = document.querySelector("#big-icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    celsiusTemperature = Math.round(response.data.main.temp);
}

function searchCity(city) {
    let apiKey = "4a7c01390293f156a41b247c2f0f0679";
    let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiEndpoint}`).then(showTemp);
}
function searchLocation(position) {
    let apiKey = "4a7c01390293f156a41b247c2f0f0679";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

function findCity(event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;
    searchCity(city);
}

let form = document.querySelector("#enter-city");
form.addEventListener("submit", findCity);
let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);


function changeToFarenh(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#number");
    let farenhTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(farenhTemperature);
    farenheitLink.classList.add("active");
}
let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", changeToFarenh);


function changeToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#number");
    temperatureElement.innerHTML = celsiusTemperature;
    celsiusLink.classList.add("active");
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);


searchCity("New York");
