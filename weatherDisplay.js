const cityNameDisplay = document.querySelector("#cityNameDisplay");
const temperatureDisplay = document.querySelector("#tempDisplay");
const conditionDisplay = document.querySelector("#conditionDisplay");
const weatherData = JSON.parse(sessionStorage.getItem("weatherData"));
const selectedCity = JSON.parse(sessionStorage.getItem("selectedCity"));

// when window loads clear all modified HTML
window.onload = function () {
  cityNameDisplay.innerHTML = "";
  temperatureDisplay.innerHTML = "";
  conditionDisplay.innerHTML = "";
  precipitationDisplay.innerHTML = "";
  uvIndexDisplay.innerHTML = "";
  const referrer = document.referrer;

  // console log route and data for potential issues
  console.log("Came from:", referrer);
  console.log("selectedCity:", selectedCity);
  console.log("weatherData:", weatherData);

  // if previous page is "previouscity.html" and there is selectedCity data run the function displayCityWeather with parameters selectedCity
  if (referrer.includes("previouscity.html") && selectedCity) {
    displayCityWeather(selectedCity);
  } else if (Array.isArray(weatherData) && weatherData.length > 0) {
    // Show latest weatherData (last input)
    const latest = weatherData[weatherData.length - 1];
    displayCityWeather(latest);
  } else {
    cityNameDisplay.textContent = "Weather data not available.";
    console.error("No data found");
  }
};

function displayCityWeather(weatherObject) {
  const cityWeatherElement = document.createElement("div");

  // modify cityWeatherElement div/HTML
  cityWeatherElement.innerHTML = `
    <h2 class="weatherIn">Weather in ${weatherObject.cityName}</h2>
    <p class="temperatureIn">Temperature: ${weatherObject.temperature}°C</p>
    <p class="conditionIn">Condition: ${weatherObject.condition}</p>
    <p class="precipitation">Precipitation: ${weatherObject.precipitation}mm</p>
    <p class="uvIndex">UV Index: ${weatherObject.uvIndex}</p>
  `;

  cityNameDisplay.appendChild(cityWeatherElement);

  const latitude = weatherObject.latitude;
  const longitude = weatherObject.longitude;

  // use lat and long to display map for current city
  if (latitude && longitude) {
    const map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  }
}
