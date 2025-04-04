const cityNameDisplay = document.querySelector("#cityNameDisplay");
const temperatureDisplay = document.querySelector("#tempDisplay");
const conditionDisplay = document.querySelector("#conditionDisplay");

window.onload = function () {
  const weatherData = JSON.parse(sessionStorage.getItem("weatherData"));

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
    });
  } else {
    console.error("No weather data found.");
    cityNameDisplay.textContent = "Weather data not available.";
  }
};
