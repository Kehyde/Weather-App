const cities = JSON.parse(sessionStorage.getItem("cities")) || [];
const weatherData = [];
let weatherObject;
const searchButton = document.querySelector("#searchButton");
const inputBox = document.querySelector("#inputBox");

async function getWeather() {
  const apiKey = `5fdd291703674fb1854222708252003`;
  const cityName = inputBox.value;

  // if no city name is declared console.log an error
  if (!cityName) {
    console.error("City name is required!");
    return;
  }

  const currentWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no&alerts=no`;

  // fetch JSON from URL if response is not okay throw error
  try {
    const response = await fetch(currentWeatherUrl);

    if (!response.ok) {
      throw new Error("Error Fetching Weather Data");
    }

    const data = await response.json();
    console.log(data);

    //  create weatherObject
    const weatherObject = {
      cityName: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      // lat and long used for leaflet map
      latitude: data.location.lat,
      longitude: data.location.lon,
      precipitation: data.current.precip_mm,
      uvIndex: data.current.uv,
    };

    // push weatherObject to weatherData array
    weatherData.push(weatherObject);

    // if a weatherObject cityName is already declared previously console.log "Duplicate"
    if (cities.some((city) => city.cityName === weatherObject.cityName)) {
      console.log("Duplicate");
    } else {
      cities.push(weatherObject);
    }

    // store weatherData as JSON to sessionStorage, catch error if there is an error
    sessionStorage.setItem("weatherData", JSON.stringify(weatherData));
  } catch (error) {
    console.error(
      "There was an error with fetch operation:",
      error.message || error
    );
  }
}

// giving the search button functionality and running the function and redirect to weatherdisplay.html
searchButton.addEventListener("click", async () => {
  const cityName = inputBox.value;
  if (!cities.includes(cityName)) {
    await getWeather();
    sessionStorage.setItem("cities", JSON.stringify(cities));

    window.location.href = "weatherdisplay.html";
  } else {
    await getWeather();
    window.location.href = "weatherdisplay.html";
  }
});

// giving enter key functionality and running the function and redirecting to weatherdisplay.html
document
  .querySelector("#inputBox")
  .addEventListener("keypress", async function (e) {
    if (e.key === "Enter") {
      const cityName = inputBox.value;
      if (!cities.includes(cityName)) {
        await getWeather();
        sessionStorage.setItem("cities", JSON.stringify(cities));

        window.location.href = "weatherdisplay.html";
      } else {
        await getWeather();
        window.location.href = "weatherdisplay.html";
      }
    }
  });

// listening for click on previous city button if so redirect to previous city page
previousCities.addEventListener("click", () => {
  window.location.href = "previouscity.html";
});
