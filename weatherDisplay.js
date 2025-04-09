const cityNameDisplay = document.querySelector("#cityNameDisplay");
const temperatureDisplay = document.querySelector("#tempDisplay");
const conditionDisplay = document.querySelector("#conditionDisplay");
const weatherData = JSON.parse(sessionStorage.getItem("weatherData"));

window.onload = function () {
  console.log("Weather data on display page:", weatherData);

  if (weatherData && weatherData.length > 0) {
    cityNameDisplay.innerHTML = "";
    temperatureDisplay.innerHTML = "";
    conditionDisplay.innerHTML = "";

    weatherData.forEach((weatherObject) => {
      const cityWeatherElement = document.createElement("div");

      cityWeatherElement.innerHTML = `
        <h2 class="weatherIn">Weather in ${weatherObject.cityName}</h2>
        <p class="temperatureIn">Temperature: ${weatherObject.temperature}°C</p>
        <p class="conditionIn">Condition: ${weatherObject.condition}</p>
      `;

      cityNameDisplay.appendChild(cityWeatherElement);

      const latitude = weatherObject.latitude;
      const longitude = weatherObject.longitude;

      console.log(latitude, longitude);

      var map = L.map("map").setView([latitude, longitude], 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
    });
  } else {
    console.error("No weather data found.");
    cityNameDisplay.textContent = "Weather data not available.";
  }
};
