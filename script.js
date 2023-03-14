// JavaScript source code
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `Last updated: ${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return days[day];
}
function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 5) {
            forecastHTML = forecastHTML + `<div class="col">
         <div class="weather-forecast-date">${formatDay(forecastDay.dt)} </div>
                                        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" / alt="#" width=55>
                                        <div class="forecast-temp-max">High: ${Math.round(forecastDay.temp.max)}\u00B0 </div>
                                        <div class="forecast-temp-min">Low: ${Math.round(forecastDay.temp.min)}\u00B0</div>
                                    </div> `;
}
    });
    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
   
}

function getForecast(coordinates) {
    let apiKey = "1dbf926d3b4417bf379db7043bec1047";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#number").innerHTML = Math.round(response.data.main.temp
    );
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
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
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
    iconElement.setAttribute("alt", response.data.weather[0].description);
    celsiusTemperature = Math.round(response.data.main.temp);
    getForecast(response.data.coord);
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
